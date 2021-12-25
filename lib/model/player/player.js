import { buildingList, dataProcessingList, energyList, machineList, scienceList, techList } from "../../config/contents.js";
import { playerBuildings } from "./buildings.js";
import { playerResources } from "./resources.js";
import { playerStorage } from "./storage.js";
import { gameTick } from "../../config/constants.js";
import { playerMachines } from "./machines.js";
import { playerDPUs } from "./dpus.js";
import { availableEnergy, playerEnergy } from "./energy.js";
import { playerInfrastructure } from "./infrastructure.js";


export class Player {
    static purchase = (item) => {
        let itemReference = findItem(item)[1];
        for (let resource in item.price) {
            let currentResource = item.price[resource];
            let playerResource = playerResources[resource];
            if (currentResource.amount > playerResource.amount) return;
        }

        if (itemReference.purchased) return;
        if (itemReference.purchased === false) {
            itemReference.purchased = true;
        }

        for (let resource in item.price) {
            let currentResource = item.price[resource];
            let playerResource = playerResources[resource];
            playerResource.amount -= currentResource.amount
        }

        maybeExecutePurchaseRoutine(item);

        if (typeof itemReference.amount === 'number') {
            if (typeof itemReference.limit === 'number') {
                itemReference.limit++;
            } else {
                itemReference.amount++;
            }
        }

        return true;
    }

    static upgradeBuilding = (item, props) => {
        item.amount = props.amount;
        item.label = props.label;
    }

    static increaseStorage = capacity => {
        Object.entries(capacity).forEach(res => {
            playerResources[res[0]].limit += res[1].amount;
        })
    }

    static calculateResourceTick() {
        Player.calculateRate();
        Object.entries(playerResources).forEach(resource => {
            let resourceName = resource[0]
            resource = resource[1];
            let nextValue = resource.amount + resource.rate
            if (nextValue > resource.limit) {
                resource.amount = resource.limit;
                return;
            }
            if (nextValue < 0) {
                nextValue = Player.smartSwitch(resourceName, nextValue);
            }
            resource.amount = nextValue;
        })
    }

    static calculateRate = () => {
        Object.entries(playerResources).forEach(resource => {
            let rate = 0;
            rate = countResource(resource, buildingList, rate);
            rate = countResource(resource, machineList, rate);
            rate = countResource(resource, dataProcessingList, rate);
            playerResources[resource[0]].rate = rate;
        })
    }

    static calculateEnergy() {
        let totalProduced = 0;

        Object.entries(energyList).forEach(energy => {
            totalProduced += energy[1].value * playerEnergy[energy[0]].amount;
        });

        let totalConsumed = 0;

        Object.entries(machineList).forEach(energy => {
            totalConsumed += energy[1].value * playerMachines[energy[0]].amount;
        });

        Object.entries(dataProcessingList).forEach(energy => {
            totalConsumed += energy[1].value * playerDPUs[energy[0]].amount;
        });

        availableEnergy.amount = totalProduced - totalConsumed + availableEnergy.base;

        while (availableEnergy.amount < 0) {
            let currentMachine = Object.entries(machineList).find(machine => {
                return playerMachines[machine[0]].amount > 0;
            })

            if (!currentMachine) {
                currentMachine = Object.entries(dataProcessingList).find(machine => {
                    return playerDPUs[machine[0]].amount > 0;
                })
            }

            if (currentMachine) {
                currentMachine[1].switchOff();
                availableEnergy.amount += currentMachine[1].value;
            }
        }
    }

    static smartSwitch = (resource, nextValue) => {
        let machine = Object.entries(machineList).find(machine => {
            let machineName = machine[0];
            let machineObj = machine[1];
            if (machineObj.production[resource] > 0) return false;
            return (playerMachines[machineName].amount > 0);
        });
        if (machine == null) return nextValue;

        while (nextValue < 0) {
            machine[1].switchOff();
            nextValue -= machine[1].production[resource].amount
        }

        return nextValue;
    }

    static switchOn = item => {
        let itemReference = findItem(item);
        if (itemReference[1].amount < itemReference[1].limit) {
            let invalidResource = Object.entries(item.production).find(resource => {
                let playerResource = playerResources[resource[0]].amount
                if (resource[1].amount >= 0) return false;
                return (-1 * resource[1].amount > playerResource);
            })
            if (!invalidResource) item.switchOn();
        }
    }

    static switchOff = item => {
        item.switchOff();
    }
}

function findItem(item) {
    let list = [
        playerBuildings,
        scienceList,
        playerStorage,
        techList,
        playerMachines,
        playerDPUs,
        playerEnergy,
        playerInfrastructure
    ]

    let itemFound;

    list.forEach(list => {
        let entity = Object.entries(list).find(entity => entity[1].label == item.label);
        if (entity) {
            itemFound = entity
        }
    })

    return itemFound;
}

function maybeExecutePurchaseRoutine(item) {
    if (item.purchaseRoutine) {
        item.purchaseRoutine()
    }
}

function countResource(resource, list, rate) {
    let playerItems;

    switch (list) {
        case buildingList:
            playerItems = playerBuildings;
            break;
        case machineList:
            playerItems = playerMachines;
            break;
        case dataProcessingList:
            playerItems = playerDPUs;
            break;
        default:
            break;
    }

    Object.entries(list).forEach(building => {
        if (building[1].production[resource[0]].amount) {
            let production = building[1].production[resource[0]].amount;
            let bonus = building[1].bonus[resource[0]].amount;
            let count = playerItems[building[0]].amount;
            rate += production * count * (bonus + 1);
        }
    })

    return rate;
}

setInterval(Player.calculateEnergy, gameTick);
setInterval(Player.calculateResourceTick, gameTick);
import { buildingList, dataProcessingList, energyList, machineList, storageList } from "../config/contents.js";
import { Building } from "./building.js";

export class Infrastructure extends Building {
    constructor(props) {
        super(props);
        this.effect = effectsMap[this.label][this.stage]
    }

    purchaseRoutine = () => {
        super.updateCosts();
        this.applyEffect();
    }

    applyEffect() {
        Object.entries(this.effect).forEach(targetEntity => {
            Object.entries(targetEntity[1]).forEach(resource => {
                findTarget(targetEntity[0]).bonus[resource[0]].amount += this.effect[targetEntity[0]][resource[0]]
            })
        })
    }
}

function findTarget(identifier) {
    let possibleTargets = [buildingList, dataProcessingList, storageList, machineList, energyList];
    let foundItem;

    possibleTargets.forEach(list => {
        let result = maybeFindItem(list, identifier)

        if (result) {
            foundItem = result;
        }
    })

    return foundItem[1];
}

function maybeFindItem(list, identifier) {
    return Object.entries(list).find(building => building[0] == identifier)
}

var effectsMap = {
    "Drone Tower": {
        0: {
            scavengerDrone: {
                scrap: 0.1
            },
            minerDrone: {
                ironOre: 0.1
            }
        }
    }
}
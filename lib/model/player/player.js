import { buildingList, scienceList, techList } from "../../config/contents.js";
import { playerBuildings } from "./buildings.js";
import { playerResources } from "./resources.js";
import { playerStorage } from "./storage.js";
import { gameTick } from "../../config/constants.js";


export class Player {
    static purchase = (item, that) => {
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
            itemReference.amount++;
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
            resource = resource[1];
            let nextValue = resource.amount + resource.rate
            if (nextValue > resource.limit){
                resource.amount = resource.limit;
                return;
            }
            if (nextValue < 0) {
                Player.smartTurnOff(resource);
                Player.calculateResourceTick();
            }
            resource.amount = nextValue;
        })
    }

    static calculateRate = () => {
        Object.entries(playerResources).forEach(resource => {
            let rate = 0;
            Object.entries(buildingList).forEach(building => {
                if (building[1].production[resource[0]].amount) {
                    rate += building[1].production[resource[0]].amount * playerBuildings[building[0]].amount
                }
            })
            playerResources[resource[0]].rate = rate;
        })
    }

    static smartTurnOff = resource => {
        let machine = Object.entries(playerBuildings).find(building => {
            building = building[1];
            return (building.production[resource] < 0 && building.amount != 0);
        });

        machine.turnOff();
    }
}

function findItem(item) {
    let buildingScan = Object.entries(playerBuildings).find(building => building[1].label == item.label);
    if (buildingScan) return buildingScan;

    let scienceScan = Object.entries(scienceList).find(science => science[1].label == item.label);
    if (scienceScan) return scienceScan;

    let storageScan = Object.entries(playerStorage).find(storage => storage[1].label == item.label);
    if (storageScan) return storageScan;

    let techScan = Object.entries(techList).find(tech => tech[1].label == item.label);
    if (techScan) return techScan;
}

function maybeExecutePurchaseRoutine(item) {
    if (item.purchaseRoutine) {
        item.purchaseRoutine()
    }
}

setInterval(Player.calculateResourceTick, gameTick);
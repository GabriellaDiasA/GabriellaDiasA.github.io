import { scienceList, techList } from "../../config/contents.js";
import { playerBuildings } from "./buildings.js";
import { playerResources } from "./resources.js";
import { playerStorage } from "./storage.js";

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

        maybe_execute_purchase_routine(item);

        if (typeof itemReference.amount === 'number') {
            itemReference.amount++;
        }

        return true;
    }

    static upgrade_building = (item, props) => {
        item.amount = props.amount;
        item.label = props.label;
    }

    static increase_storage = (capacity) => {
        Object.entries(capacity).forEach(res => {
            playerResources[res[0]].limit += res[1].amount;
        })
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

function maybe_execute_purchase_routine(item) {
    if (item.purchase_routine) {
        item.purchase_routine()
    }
}
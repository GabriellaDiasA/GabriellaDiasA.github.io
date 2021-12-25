import { buildingList, dataProcessingList, energyList, machineList, resourceList, storageList, techList } from "./contents.js";

export const digging = () => {
    storageList.pit.render = true;
}

export const lighterClutches = () => {
    let drone = buildingList.scavengerDrone;
    if (drone.stage == 0) {
        drone.production.scrap.amount += 0.01;
    }
    drone = buildingList.minerDrone;
    if (drone.stage == 0) {
        drone.production.ironOre.amount += 0.01;
    }
}

export const fasterTransistors = () => {
    let drone = buildingList.scavengerDrone;
    if (drone.stage == 0) {
        drone.production.scrap.amount += 0.01;
    }
    drone = buildingList.minerDrone;
    if (drone.stage == 0) {
        drone.production.ironOre.amount += 0.01;
    }
    dataProcessingList.crudeProcessor.production.bit += 0.01;
}

export const solarPanelRecycling = () => {
    energyList.solarPanel.priceRate -= 0.3;
    energyList.solarPanel.recalculateCosts();
}

export const droneHeatsinks = () => {
    resourceList.ironOre.render = true;

    let drone = buildingList.minerDrone;
    if (drone.stage == 0) {
        drone.production.copperOre.amount += 0.01
    }

    techList.betterDrills.render = true;
}

export const betterDrills = () => {
    let drone = buildingList.scavengerDrone;
    if (drone.stage == 0) { drone.production.scrap.amount += 0.02 }

    drone = buildingList.minerDrone;
    if (drone.stage == 0) {
        drone.production.ironOre.amount += 0.01
        drone.production.copperOre.amout += 0.01
    }
}

export const electrolysis = () => {
    machineList.electrolyzer.render = true;
    resourceList.copper.render = true;
}

export const betterDrones = () => {
    let drone = buildingList.scavengerDrone;
    drone.upgradeStage('scavengerDrone');
    drone = buildingList.minerDrone;
    drone.upgradeStage('minerDrone')
}
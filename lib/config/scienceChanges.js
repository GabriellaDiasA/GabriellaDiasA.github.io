import { buildingList, dataProcessingList, energyList, machineList, menuList, resourceList, scienceList, storageList, techList } from "./contents.js";

export const circuitry = () => {
    menuList.data.render = true;
    resourceList.bit.render = true;
    buildingList.scavengerDrone.render = true;
    scienceList.physics.render = true;
    scienceList.tinkering.render = true;
    dataProcessingList.crudeProcessor.render = true;
}

export const physics = () => {
    menuList.energy.render = true;
    energyList.solarPanel.render = true;
    scienceList.mining.render = true;
}

export const tinkering = () => {
    menuList.tech.render = true;
    techList.lighterClutches.render = true;
    techList.solarPanelRecycling.render = true;
    techList.fasterTransistors.render = true;
}

export const mining = () => {
    resourceList.ironOre.render = true;
    buildingList.minerDrone.render = true;
    techList.digging.render = true;
    techList.betterDrills.render = true;
    techList.droneHeatSinks.render = true;
    scienceList.metallurgy.render = true;
}

export const metallurgy = () => {
    resourceList.iron.render = true;
    machineList.smelter.render = true;
    techList.electrolysis.render = true;
    storageList.warehouse.render = true;
    storageList.silo.render = true;
}

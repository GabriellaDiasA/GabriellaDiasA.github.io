import { buildingList, menuList, resourceList, scienceList, storageList } from "./contents.js";

export const digging = () => {
    scienceList.mining.render = true;
    scienceList.workshop.render = true;
    storageList.pit.render = true;
    resourceList.copperOre.render = true;
    menuList.storage.render = true;
}

export const workshop = () => {
    menuList.tech.render = true;
}

export const betterDrones = () => {
    buildingList.scavengerDrone.upgrade_stage('scavengerDrone');
}

export const mining = () => {
    buildingList.minerDrone.render = true;
}
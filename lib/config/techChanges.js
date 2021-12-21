import { buildingList } from "./contents.js"

export const betterDrills = () => {
    let drone = buildingList.scavengerDrone;
    if (drone.stage == 0) { drone.production.scrap += 0.04 }

    drone = buildingList.minerDrone;
    if (drone.stage == 0) { 
        drone.production.ironOre += 0.01
        drone.production.copperOre += 0.01
    }
}
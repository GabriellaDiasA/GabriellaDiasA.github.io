import { playerResources } from "../model/player/resources.js";

export let scavengeStrength = 1;
export const scavengeWasteland = () => {
    if (playerResources.scrap.amount + scavengeStrength > playerResources.scrap.limit) {
        playerResources.scrap.amount = playerResources.scrap.limit;
    } else {
        playerResources.scrap.amount += scavengeStrength;
    }
}

export let miningStrength = 1;
export const mineIronOre = () => {
    if (playerResources.ironOre.amount + miningStrength > playerResources.ironOre.limit) {
        playerResources.ironOre.amount = playerResources.ironOre.limit;
    } else {
        playerResources.ironOre.amount += miningStrength;
    }
}
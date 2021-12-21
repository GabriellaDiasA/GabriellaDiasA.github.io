import { playerResources } from "../model/player/resources.js";

const actionStrength = 10;

export const scavengeWasteland = () => {
    if (playerResources.scrap.amount + actionStrength > playerResources.scrap.limit) {
        playerResources.scrap.amount = playerResources.scrap.limit;
    } else {
        playerResources.scrap.amount += actionStrength;
    }
}
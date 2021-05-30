import { Craft, BasicResourceList, CraftResourceList, DataResourceList, CompleteResourceList } from '../Classes.js';

let gearBasicResourcesCost = new BasicResourceList(0, 0, 10, 0, 0, 0, 0, 0);
let gearCraftResourcesCost = new CraftResourceList(0);
let gearDataResourcesCost = new DataResourceList(0);
let gearCost = new CompleteResourceList(gearBasicResourcesCost, gearCraftResourcesCost, gearDataResourcesCost);
let gear = new Craft("Gear", gearCost, 0);

export let craftingList = {
    gear: gear,
}
import { Building, Machine, ResourceList, StorageBuilding } from './Classes.js';
import { Player } from './PlayerInv.js';

/**
 * BUILDING COSTS AND PROD RATES
 * Scrap, Iron Ore, Iron, Copper Ore, Titanium Ore
 */

let ScavengerDroneCost = new ResourceList(15, 0, 0, 0, 0);
let MiningDroneMkICost = new ResourceList(70, 0, 0, 0, 0);
let MiningDroneMkIICost = new ResourceList(125, 0, 25, 0, 0);
let SmelterCost = new ResourceList(150, 100, 0, 0, 0);
let ElectrolyzerCost = new ResourceList(0, 0, 50, 0, 0);

let ScavengerDroneCostBase = new ResourceList(15, 0, 0, 0, 0);
let MiningDroneMkICostBase = new ResourceList(0, 10, 0, 0, 0);
let MiningDroneMkIICostBase = new ResourceList(125, 0, 25, 0, 0);
let SmelterCostBase = new ResourceList(150, 100, 0, 0, 0);
let ElectrolyzerCostBase = new ResourceList(0, 0, 50, 0, 0);

let ScavengerDroneProdRate = new ResourceList(0.3, 0, 0, 0, 0);
let MiningDroneMkIProdRate = new ResourceList(0, 0.2, 0, 0, 0);
let MiningDroneMkIIProdRate = new ResourceList(0, 0.3, 0, 0.1, 0);
let SmelterProdRate = new ResourceList(0, -1, 0.1, 0, 0);
let ElectrolyzerProdRate = new ResourceList(-4, 0, 0.05, 0, 0);

/**
 * FLAVOR TEXT~
 */

let ScavengerDroneFlavorText = "These little buggers get their hands dirty for you.";
let MiningDroneMkIFlavorText = "They use meteor impact sites as makeshift quarries.";
let MiningDroneMkIIFlavorText = "Bigger, faster, stronger";
let SmelterFlavorText = "Hot!";
let ElectrolyzerFlavorText = "Shocking!";

/**
 * STORAGE BUILDING COSTS AND EFFECTS
 * Scrap, Iron Ore, Iron, Copper Ore, Titanium Ore
 */

let PitCost = new ResourceList(50, 0, 0, 0, 0);
let WarehouseCost = new ResourceList(250, 0, 50, 0, 0);

let PitCostBase = new ResourceList(50, 0, 0, 0, 0);
let WarehouseCostBase = new ResourceList(250, 0, 50, 0, 0);

let PitEffect = new ResourceList(200, 150, 25, 150, 50);
let WarehouseEffect = new ResourceList(250, 250, 150, 250, 150);

/**
 * STORAGE FLAVOR~
 */

let PitFlavorText = "I guess you could do that...";
let WarehouseFlavorText = "Consider this an improvement."

/**
 * BUILDINGS
 */

export let ScavengerDrone = new Building('Scavenger Drone', 0, ScavengerDroneProdRate, ScavengerDroneCost, ScavengerDroneCostBase,
1.05, false, false, ScavengerDroneFlavorText);
export let MiningDroneMkI = new Building('Mining Drone Mk. I', 0, MiningDroneMkIProdRate, MiningDroneMkICost, MiningDroneMkICostBase,
1.15, false, false, MiningDroneMkIFlavorText);
export let MiningDroneMkII = new Building('Mining Drone Mk. II', 1, MiningDroneMkIIProdRate, MiningDroneMkIICost, MiningDroneMkIICostBase,
1.15, false, false, MiningDroneMkIIFlavorText);
export let Smelter = new Machine('Smelter', 0, 0, SmelterProdRate, SmelterCost, SmelterCostBase,
1.15, false, false, SmelterFlavorText);
export let Electrolyzer = new Machine('Electrolyzer', 0, 0, ElectrolyzerProdRate, ElectrolyzerCost, ElectrolyzerCostBase,
1.17, false, false, ElectrolyzerFlavorText);

// Only PRODUCTION buildings here, please.
export let buildingArray = [ScavengerDrone, MiningDroneMkI, Smelter, Electrolyzer];

/**
 * STORAGE BUILDINGS
 */

export let Pit = new StorageBuilding('Pit', 0, PitEffect, PitCost, PitCostBase,
1.25, false, false, PitFlavorText);
export let Warehouse = new StorageBuilding('Warehouse', 0, WarehouseEffect, WarehouseCost, WarehouseCostBase,
1.3, false, false, WarehouseFlavorText);

export let storageArray = [Pit, Warehouse];

/**
 * SCAVENGE WASTELAND
 */

export let Scavenge = {
    name: 'Scavenge Wasteland',
    flavorText: 'These lands were once green. Brave the harsh conditions and return with precious scrap metal.',

    interact: function(){
        if(Player.scrap.amount < Player.scrap.limit) Player.scrap.amount++;
    }
}
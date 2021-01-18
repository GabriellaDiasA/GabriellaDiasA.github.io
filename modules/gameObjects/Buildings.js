import { BonusBuilding, Building, Machine, ResourceList, StorageBuilding } from '../Classes.js';
import { basicResources } from '../PlayerInv.js';

/**
 * BUILDING COSTS AND PROD RATES
 * Scrap, Iron Ore, Iron, Copper Ore, Copper, Quartz, Silicon
 */

let ScavengerDroneCost = new ResourceList(15, 0, 0, 0, 0, 0, 0, 0);
let ScavengerBayCost = new ResourceList(500, 250, 50, 150, 0, 0, 0, 0);
let MiningDroneMkICost = new ResourceList(70, 0, 0, 0, 0, 0, 0, 0);
let MiningDroneMkIICost = new ResourceList(125, 0, 5, 0, 0, 0, 0, 0);
let MiningCentralCost = new ResourceList(85, 0, 50, 50, 0, 0, 0, 0);
let SmelterCost = new ResourceList(150, 100, 0, 0, 0, 0, 0, 0);
let ElectrolyzerCost = new ResourceList(400, 0, 30, 0, 0, 0, 0, 0);
let CrudeProcessorCost = new ResourceList(150, 0, 100, 0, 85, 350, 0, 0);

let ScavengerDroneCostBase = new ResourceList(15, 0, 0, 0, 0, 0, 0, 0);
let ScavengerBayCostBase = new ResourceList(500, 250, 50, 150, 0, 0, 0, 0);
let MiningDroneMkICostBase = new ResourceList(70, 0, 0, 0, 0, 0, 0, 0);
let MiningDroneMkIICostBase = new ResourceList(125, 0, 5, 0, 0, 0, 0, 0);
let MiningCentralCostBase = new ResourceList(85, 0, 50, 50, 0, 0, 0, 0);
let SmelterCostBase = new ResourceList(150, 100, 0, 0, 0, 0, 0, 0);
let ElectrolyzerCostBase = new ResourceList(400, 0, 30, 0, 0, 0, 0, 0);
let CrudeProcessorCostBase = new ResourceList(150, 0, 100, 0, 85, 350, 0, 0);

let ScavengerDroneProdRate = new ResourceList(0.3, 0, 0, 0, 0, 0, 0, 0);
let ScavengerBayResourceBonus = new ResourceList(0.1, 0, 0, 0, 0, 0, 0, 0);
let MiningDroneMkIProdRate = new ResourceList(0, 0.2, 0, 0, 0, 0, 0, 0);
let MiningDroneMkIIProdRate = new ResourceList(0, 0.8, 0, 0.4, 0, 0, 0, 0);
let MiningCentralTargetList;
let SmelterProdRate = new ResourceList(0, -1.2, 0.4, 0, 0, 0, 0, 0);
let ElectrolyzerProdRate = new ResourceList(-4, 0, 0.2, 0, 0, 0, 0, 0);
let CrudeProcessorProdRate = new ResourceList(0, 0, 0, 0, 0, 0, 0, 0.01);

/**
 * FLAVOR TEXT~
 */

let ScavengerDroneFlavorText = "These little buggers get their hands dirty for you.";
let ScavengerBayFlavorText = "This is sure to attract the right kind of attention.";
let MiningDroneMkIFlavorText = "They use meteor impact sites as makeshift quarries.";
let MiningDroneMkIIFlavorText = "Bigger, faster, stronger";
let MiningCentralFlavorText = undefined;
let SmelterFlavorText = "Hot!";
let ElectrolyzerFlavorText = "Shocking!";
let CrudeProcessorFlavorText = undefined;

/**
 * STORAGE BUILDING COSTS AND EFFECTS
 * Scrap, Iron Ore, Iron, Copper Ore, Copper, Quartz, Silicon
 */

let PitCost = new ResourceList(50, 0, 0, 0, 0, 0, 0, 0);
let WarehouseCost = new ResourceList(250, 0, 50, 0, 0, 0, 0, 0);
let SiloCost = new ResourceList(0, 0, 500, 0, 300, 0, 0, 0);

let PitCostBase = new ResourceList(50, 0, 0, 0, 0, 0, 0, 0);
let WarehouseCostBase = new ResourceList(250, 0, 50, 0, 0, 0, 0, 0);
let SiloCostBase = new ResourceList(0, 0, 500, 0, 300, 0, 0, 0);

let PitEffect = new ResourceList(4000, 150, 15, 150, 15, 200, 0, 0);
let WarehouseEffect = new ResourceList(50, 150, 400, 150, 350, 0, 25, 0);
let SiloEffect = new ResourceList(1500, 1200, 0, 1200, 0, 1400, 0, 0);

/**
 * STORAGE FLAVOR~
 */

let PitFlavorText = "I guess you could do that...";
let WarehouseFlavorText = "Consider this an improvement.";
let SiloFlavorText = "Great for storing crude materials.";

/**
 * BUILDINGS
 */

export let ScavengerDrone = new Building('Scavenger Drone', 0, ScavengerDroneProdRate, ScavengerDroneCost, ScavengerDroneCostBase,
1.06, false, false, ScavengerDroneFlavorText);
export let ScavengerBay = new BonusBuilding('Scavenger Bay', 0, ScavengerBayResourceBonus, null, ScavengerBayCost, ScavengerBayCostBase,
1.15, false, false, ScavengerBayFlavorText);
export let MiningDroneMkI = new Building('Mining Drone Mk. I', 0, MiningDroneMkIProdRate, MiningDroneMkICost, MiningDroneMkICostBase,
1.15, false, false, MiningDroneMkIFlavorText);
export let MiningDroneMkII = new Building('Mining Drone Mk. II', 1, MiningDroneMkIIProdRate, MiningDroneMkIICost, MiningDroneMkIICostBase,
1.15, false, false, MiningDroneMkIIFlavorText);
export let Smelter = new Machine('Smelter', 0, 0, SmelterProdRate, SmelterCost, SmelterCostBase,
1.15, false, false, SmelterFlavorText);
export let Electrolyzer = new Machine('Electrolyzer', 0, 0, ElectrolyzerProdRate, ElectrolyzerCost, ElectrolyzerCostBase,
1.17, false, false, ElectrolyzerFlavorText);
export let CrudeProcessor = new Machine('Crude Processor', 0, 0, CrudeProcessorProdRate, CrudeProcessorCost, CrudeProcessorCostBase,
2.25, false, false, CrudeProcessorFlavorText);

/**
 * BUILDING BONUS BUILDINGS (lol)
 */

MiningCentralTargetList = [
    {targetName: 'Mining Drone Mk. I', bonus: 0.05},
    {targetName: 'Mining Drone Mk. II', bonus: 0.05},
];

export let MiningCentral = new BonusBuilding('Drone Central', 0, null, MiningCentralTargetList, MiningCentralCost, MiningCentralCostBase, 
1.15, false, false, MiningCentralFlavorText);

// Only PRODUCTION / BONUS buildings here, please.
export let buildingList = {
    scavengerDrone: ScavengerDrone,
    scavengerBay: ScavengerBay,
    miningDroneMkI: MiningDroneMkI,
    miningDroneMkII: MiningDroneMkII,
    miningCentral: MiningCentral,
    smelter: Smelter,
    electrolyzer: Electrolyzer,
    crudeProcessor: CrudeProcessor,
};

/**
 * STORAGE BUILDINGS
 */

export let Pit = new StorageBuilding('Pit', 0, PitEffect, PitCost, PitCostBase,
1.5, false, false, PitFlavorText);
export let Warehouse = new StorageBuilding('Warehouse', 0, WarehouseEffect, WarehouseCost, WarehouseCostBase,
1.2, false, false, WarehouseFlavorText);
export let Silo = new StorageBuilding('Silo', 0, SiloEffect, SiloCost, SiloCostBase,
1.4, false, false, SiloFlavorText);

export let storageList = {
    pit: Pit,
    warehouse: Warehouse,
    silo: Silo
};

/**
 * SCAVENGE WASTELAND
 */

export let Scavenge = {
    name: 'Scavenge Wasteland',
    flavorText: 'These lands were once green. Brave the harsh conditions and return with precious scrap metal.',

    interact: function(){
        if(basicResources.scrap.amount < basicResources.scrap.limit) basicResources.scrap.amount += basicResources.scrap.bonusOne;
    }
}

/**
 * LOCAL STORAGE
 */

export function loadBuildingArray(){
    if(!localStorage.getItem(`${buildingList.scavengerDrone.name}`)){
        setInterval(setBuildings, 500);
    }
    else{
        getBuildings();
        setInterval(setBuildings, 500);
    }
}

function setBuildings(){
    for(let building in buildingList){
        let tempObj = {};
        for(let property in buildingList[building]){
            tempObj[property] = buildingList[building][property];
        }
        localStorage.setItem(`${buildingList[building].name}`, JSON.stringify(tempObj));
    }
}

function getBuildings(){
    for(let building in buildingList){
        let tempObj = JSON.parse(localStorage.getItem(`${buildingList[building].name}`));
        for(let property in buildingList[building]){
            buildingList[building][property] = tempObj[property];
        }
    }
}

export function loadStorageArray(){
    if(!localStorage.getItem(`${storageList.pit.name}`)){
        setInterval(setStorage, 500);
    }
    else{
        getStorage();
        setInterval(setStorage, 500);
    }
}

function setStorage(){
    for(let building in storageList){
        let tempObj = {};
        for(let property in storageList[building]){
            tempObj[property] = storageList[building][property];
        }
        localStorage.setItem(`${storageList[building].name}`, JSON.stringify(tempObj));
    }
}

function getStorage(){
    for(let building in storageList){
        let tempObj = JSON.parse(localStorage.getItem(`${storageList[building].name}`));
        for(let property in storageList[building]){
            storageList[building][property] = tempObj[property];
        }
    }
}
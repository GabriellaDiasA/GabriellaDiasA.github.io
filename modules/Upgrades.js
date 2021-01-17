import { Upgrade, ResourceList } from './Classes.js';
import * as Buildings from './Buildings.js';
import { Player } from './PlayerInv.js';

/**
 * COSTS~
 */

let reinforcedDrillsCost = new ResourceList(0, 0, 250, 0, 0, 0, 0);
let intelligentTrackingCost = new ResourceList(0, 0, 300, 0, 0, 0, 0);
let droneRecyclingICost = new ResourceList(2500, 1500, 0, 0, 0, 0, 0);
let betterSmeltingCost = new ResourceList(0, 500, 300, 0, 0, 0, 0);
let copperSmeltingCost = new ResourceList(3000, 1500, 500, 0, 0, 0, 0);
let silosCost = new ResourceList(2000, 1250, 0, 1000, 0, 0, 0);
let advancedDroneCircuitryCost = new ResourceList(2000, 0, 0, 0, 750, 0, 0);
let intelligentPathfindingCost = new ResourceList(3500, 0, 2000, 0, 1500, 0, 0);
let oscillatorsCost = new ResourceList(4000, 0, 2000, 0, 2500, 8000, 0);
let quartzProcessingCost = new ResourceList(6500, 0, 2500, 0, 3500, 0, 0);

/**
 * METHODS~
 */

let reinforcedDrillsMethod = function(){
    this.purchased = true;
    Buildings.MiningDroneMkI.prodRate.ironOre.amount += 0.15;
    Buildings.MiningDroneMkII.prodRate.ironOre.amount += 0.35;
    Buildings.MiningDroneMkII.prodRate.copperOre.amount += 0.05;
}

let intelligentTrackingMethod = function(){
    this.purchased = true;
    Buildings.ScavengerDrone.prodRate.scrap.amount += 0.15;
}

let droneRecyclingIMethod = function(){
    this.purchased = true;
    Buildings.ScavengerDrone.costRate -= 0.015;
    Buildings.ScavengerDrone.recalculateCost();
}

let betterSmeltingMethod = function(){
    this.purchased = true;
    Buildings.Smelter.prodRate.iron.amount += 0.01;
    Buildings.Smelter.prodRate.ironOre.amount += 0.2;
}

let copperSmeltingMethod = function(){
    this.purchased = true;
    Buildings.Smelter.prodRate.copper.amount += 0.05;
    Buildings.Smelter.prodRate.copperOre.amount -= 1;
}

let silosMethod = function(){
    this.purchased = true;
    Buildings.Silo.unlocked = true;
}

let advancedDroneCircuitryMethod = function(){
    this.purchased = true;
    Buildings.ScavengerDrone.prodRate.scrap.amount += 0.25;
    Buildings.MiningDroneMkII.prodRate.copperOre.amount += 0.05;
    Buildings.MiningDroneMkII.prodRate.ironOre.amount += 0.2;
}

let intelligentPathfindingMethod = function(){
    this.purchased = true;
    Buildings.ScavengerDrone.prodRate.scrap.amount += 0.45;
    Buildings.MiningDroneMkII.prodRate.copperOre.amount += 0.2;
    Buildings.MiningDroneMkII.prodRate.ironOre.amount += 0.5;
}

let oscillatorsMethod = function(){
    this.purchased = true;
    Buildings.MiningDroneMkII.bonusProd += 1;
    Buildings.ScavengerDrone.bonusProd += 1;
//    droneNetwork.unlock();
}

let quartzProcessingMethod = function(){
    this.purchased = true;
    Buildings.Electrolyzer.prodRate.silicon.amount = 0.01;
    Buildings.Electrolyzer.prodRate.quartz.amount = -0.13;
}

/**
 * UNLOCKS~
 */

let reinforcedDrillsUnlock = function(){
    this.unlocked = true;
}

let intelligentTrackingUnlock = function(){
    this.unlocked = true;
}

let droneRecyclingIUnlock = function(){
    this.unlocked = true;
}

let betterSmeltingUnlock = function(){
    this.unlocked = true;
}

let copperSmeltingUnlock = function(){
    this.unlocked = true;
}

let silosUnlock = function(){
    this.unlocked = true;
}

let advancedDroneCircuitryUnlock = function(){
    this.unlocked = true;
}

let intelligentPathfindingUnlock = function(){
    this.unlocked = true;
}

let oscillatorsUnlock = function(){
    this.unlocked = true;
}

let quartzProcessingUnlock = function(){
    this.unlocked = true;
}

/**
 * FLAVOR TEXTS~
 */

let reinforcedDrillsFlavorText = "Could use sharpening.";
let intelligentTrackingFlavorText = "Do your scavenger drones keep getting lost? I know mine do!";
let droneRecyclingIFlavorText = "Reduce, reuse, recycle.";
let betterSmeltingFlavorText = "It's just better."
let copperSmeltingFlavorText = "The copper's melting!";
let silosFlavorText = undefined;
let advancedDroneCircuitryFlavorText = "It is impressive what a few extra wires here and there can do for efficiency.";
let intelligentPathfindingFlavorText = "Do your drones STILL get lost? I know mine do!";
let oscillatorsFlavorText = undefined;
let quartzProcessingFlavorText = undefined;

/**
 * EFFECTS TEXTS~
 */

let reinforcedDrillsEffectsText = "Mining Drones gather ore faster.";
let intelligentTrackingEffectsText = "Scavenger Drones gather scrap faster.";
let droneRecyclingIEffectsText = "Your Scavenger Drones are slightly cheaper to produce. Makes a bigger difference the more you have.";
let betterSmeltingEffectsText = "Your Smelters convert less Iron Ore into more Iron."
let copperSmeltingEffectsText = "Your Smelters now also convert Copper Ore into Copper.";
let silosEffectText = "Unlocks a powerful storage option.";
let advancedDroneCircuitryEffectsText = "Your drones do their jobs slightly faster.";
let intelligentPathfindingEffectsText = "Your drones do their jobs much faster.";
let oscillatorsEffectsText = "Your drones are twice as effective.";
let quartzProcessingEffectsText = "Equips Electrolyzers with the ability to make electronic-grade Silicon out of Quartz.";

/**
 * EXPORTS~~~~
 */

export let reinforcedDrills = new Upgrade('Reinforced Drills', reinforcedDrillsCost, false, false,
reinforcedDrillsMethod, reinforcedDrillsUnlock, reinforcedDrillsFlavorText, reinforcedDrillsEffectsText);

export let intelligentTracking = new Upgrade('Intelligent Tracking', intelligentTrackingCost, false, false,
intelligentTrackingMethod, intelligentTrackingUnlock, intelligentTrackingFlavorText, intelligentTrackingEffectsText);

export let droneRecyclingI = new Upgrade('Drone Recycling I', droneRecyclingICost, false, false,
droneRecyclingIMethod, droneRecyclingIUnlock, droneRecyclingIFlavorText, droneRecyclingIEffectsText);

export let betterSmelting = new Upgrade('Better Smelting', betterSmeltingCost, false, false,
betterSmeltingMethod, betterSmeltingUnlock, betterSmeltingFlavorText, betterSmeltingEffectsText);

export let copperSmelting = new Upgrade('Copper Smelting', copperSmeltingCost, false, false,
copperSmeltingMethod, copperSmeltingUnlock, copperSmeltingFlavorText, copperSmeltingEffectsText);

export let silos = new Upgrade('Silos', silosCost, false, false,
silosMethod, silosUnlock, silosFlavorText, silosEffectText);

export let advancedDroneCircuitry = new Upgrade('Advanced Drone Circuitry', advancedDroneCircuitryCost, false, false,
advancedDroneCircuitryMethod, advancedDroneCircuitryUnlock, advancedDroneCircuitryFlavorText, advancedDroneCircuitryEffectsText);

export let intelligentPathfinding = new Upgrade('Intelligent Pathfinding', intelligentPathfindingCost, false, false,
intelligentPathfindingMethod, intelligentPathfindingUnlock, intelligentPathfindingFlavorText, intelligentPathfindingEffectsText);

export let oscillators = new Upgrade('Oscillators', oscillatorsCost, false, false,
oscillatorsMethod, oscillatorsUnlock, oscillatorsFlavorText, oscillatorsEffectsText);

export let quartzProcessing = new Upgrade('Quartz Processing', quartzProcessingCost, false, false,
quartzProcessingMethod, quartzProcessingUnlock, quartzProcessingFlavorText, quartzProcessingEffectsText);

export let upgradeArray = [reinforcedDrills, intelligentTracking, droneRecyclingI, betterSmelting,
    copperSmelting, silos, advancedDroneCircuitry, intelligentPathfinding, oscillators, quartzProcessing];

/**
 * LOCAL STORAGE
 */

export function loadUpgradeArray(){
    if(!localStorage.getItem(`${upgradeArray[0].name}`)){
        setInterval(setUpgrades, 500);
    }
    else{
        getUpgrades();
        setInterval(setUpgrades, 500);
    }
}

function setUpgrades(){
    for(let building in upgradeArray){
        let tempObj = {};
        for(let property in upgradeArray[building]){
            if(typeof tempObj[property] != typeof console.log) tempObj[property] = upgradeArray[building][property];
        }
        localStorage.setItem(`${upgradeArray[building].name}`, JSON.stringify(tempObj));
    }
}

function getUpgrades(){
    for(let building in upgradeArray){
        let tempObj = JSON.parse(localStorage.getItem(`${upgradeArray[building].name}`));
        for(let property in tempObj){
            upgradeArray[building][property] = tempObj[property];
        }
    }
}
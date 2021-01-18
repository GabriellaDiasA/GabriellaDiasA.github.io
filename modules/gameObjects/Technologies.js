import { Technology, ResourceList, Upgrade } from '../Classes.js';
import * as Buildings from './Buildings.js';
import { basicResources } from '../PlayerInv.js';
import * as DOM from '../HTMLObjects.js';
import * as Upgrades from './Upgrades.js';

let ScavengerDroneTechCost = new ResourceList(35, 0, 0, 0, 0, 0, 0, 0);
let DiggingCost = new ResourceList(50, 0, 0, 0, 0, 0, 0, 0);
let MiningDroneMkITechCost = new ResourceList(200, 0, 0, 0, 0, 0, 0, 0);
let SmeltingCost = new ResourceList(0, 200, 0, 0, 0, 0, 0, 0);
let AssemblingMachineCost = new ResourceList(600, 300, 100, 0, 0, 0, 0, 0);
let BasicElectrolysisCost = new ResourceList(0, 0, 75, 0, 0, 0, 0, 0);
let MiningDroneMkIICost = new ResourceList(250, 0, 100, 0, 0, 0, 0, 0);
let CopperRefiningCost = new ResourceList(0, 0, 800, 350, 0, 0, 0, 0);
let CopperWorkingCost = new ResourceList(0, 0, 0, 1000, 150, 0, 0, 0);
let QuartzMiningCost = new ResourceList(0, 0, 2000, 0, 1500, 0, 0, 0);
let OpticsCost = new ResourceList(8000, 0, 4000, 0 , 3500, 10000, 0, 0);
let SiliconTechCost = new ResourceList(8000, 0, 3000, 0, 5000, 0, 0, 0);

/**
 * METHODS~
 */

let ScavengerDroneTechMethod = function(){
    this.purchased = true;
    Buildings.ScavengerDrone.unlocked = true;
    MiningDroneMkITech.unlock();
    this.disableButton();
}

let DiggingMethod = function(){
    this.purchased = true;
    Buildings.Pit.unlocked = true;
    DOM.menuArray.storage.display = true;
    MiningDroneMkITech.unlock();
    this.disableButton();
}

let MiningDroneMkITechMethod = function(){
    this.purchased = true;
    Buildings.MiningDroneMkI.unlocked = true;
    basicResources.ironOre.display = true;
    Smelting.unlock();
    this.disableButton();
}

let SmeltingMethod = function(){
    this.purchased = true;
    Buildings.Smelter.unlocked = true;
    basicResources.iron.display = true;
    AssemblingMachine.unlock();
    BasicElectrolysis.unlock();
    this.disableButton();
}

let AssemblingMachineMethod = function(){
    this.purchased = true;
    DOM.menuArray.upgrades.display = true;
    Buildings.Warehouse.unlocked = true;
    Upgrades.reinforcedDrills.unlock();
    Upgrades.intelligentTracking.unlock();
    Upgrades.scavengerTrade.unlock();
    this.disableButton();
}

let BasicElectrolysisMethod = function(){
    this.purchased = true;
    Buildings.Electrolyzer.unlocked = true;
    MiningDroneMkII.unlock();
    Upgrades.betterSmelting.unlock();
    this.disableButton();
}

let MiningDroneMkIIMethod = function(){
    this.purchased = true;
    Buildings.buildingList.miningDroneMkI.unlocked = false;
    Buildings.buildingList.miningDroneMkI.stk = 0;
    Buildings.buildingList.miningDroneMkI.display = false;  
    basicResources.copperOre.display = true;
    Buildings.MiningDroneMkII.unlocked = true;  
    CopperRefining.unlock();
    Upgrades.miningCentral.unlock();
    this.disableButton();
}

let CopperRefiningMethod = function(){
    this.purchased = true;
    basicResources.copper.display = true;
    Buildings.Electrolyzer.prodRate.copper.amount += 0.8;
    Buildings.Electrolyzer.prodRate.scrap.amount -= 4;
    Upgrades.silos.unlock();
    Upgrades.copperSmelting.unlock();
    QuartzMining.unlock();
    CopperWorking.unlock();
    this.disableButton();
}

let CopperWorkingMethod = function(){
    this.purchased = true;
    Upgrades.advancedDroneCircuitry.unlock();
    Upgrades.intelligentPathfinding.unlock();
//    Upgrades.copperConduits.unlock();
    this.disableButton();
}

let QuartzMiningMethod = function(){
    this.purchased = true;
    basicResources.quartz.display = true;
    Buildings.MiningDroneMkII.prodRate.quartz.amount = 3.0;
    Optics.unlock();
    SiliconTech.unlock();
    Upgrades.oscillators.unlock();
    this.disableButton();
}

let OpticsMethod = function(){
    this.purchased = true;
    Buildings.CrudeProcessor.unlocked = true;
    this.disableButton();
}

let SiliconTechMethod = function(){
    this.purchased = true;
    basicResources.silicon.display = true;
    Upgrades.quartzProcessing.unlock();
    this.disableButton();
}

/**
 * UNLOCKS~
 */

let ScavengerDroneTechUnlock = function(){
    this.unlocked = true;
}

let DiggingUnlock = function(){
    this.unlocked = true;
}

let MiningDroneMkITechUnlock = function(){
    if (Digging.purchased && ScavengerDroneTech.purchased){
        this.unlocked = true;
    }
}

let SmeltingUnlock = function(){
    this.unlocked = true;
}

let AssemblingMachineUnlock = function(){
    this.unlocked = true;
}

let BasicElectrolysisUnlock = function(){
    this.unlocked = true;
}

let MiningDroneMkIIUnlock = function(){
    this.unlocked = true;
}

let CopperRefiningUnlock = function(){
    this.unlocked = true;
}

let CopperWorkingUnlock = function(){
    this.unlocked = true;
}

let QuartzMiningUnlock = function(){
    this.unlocked = true;
}

let OpticsUnlock = function(){
    this.unlocked = true;
}

let SiliconTechUnlock = function(){
    this.unlocked = true;
}

/**
 * FLAVOR TEXT~
 */

let ScavengerDroneTechFlavorText = "Strangely cute."
let DiggingFlavorText = "Nowhere to go but down.";
let MiningDroneMkITechFlavorText = "Slightly bigger than your scavenger drones. Careful around the makeshift drill!";
let SmeltingFlavorText = "It's melting!";
let AssemblingMachineFlavorText = "You should play Factorio."
let BasicElectrolysisFlavorText = undefined;
let MiningDroneMkIIFlavorText = "Mining Drones for the Mining Drone god!";
let CopperRefiningFlavorText = "Orange like the sky.";
let CopperWorkingFlavorText = "You can't catch me, copper!";
let QuartzMiningFlavorText = undefined;
let OpticsFlavorText = "I can see clearly now.";
let SiliconTechFlavorText = "Those are definitely fake.";

/**
 * EFFECTS TEXT~
 */

let ScavengerDroneTechEffectsText = "Unlocks drones to scavenge for you."
let DiggingEffectsText = "Unlocks the first storage building.";
let MiningDroneMkITechEffectsText = "Unlocks Mining Drones and Iron Ore.";
let SmeltingEffectsText = "Unlocks Iron.";
let AssemblingMachineEffectsText = "Unlocks the Upgrades tab, along with the first three drone upgrades and an aditional storage option."
let BasicElectrolysisEffectsText = "Unlocks Electrolyzers, which convert Scrap into Iron.";
let MiningDroneMkIIEffectsText = "Unlocks Mining Drones Mk. II and a new resource. CAUTION: You will lose all of your Mining Drones Mk. I.";
let CopperRefiningEffectsText = "Unlocks Copper.";
let CopperWorkingEffectsText = "Unlocks various Copper-related upgrades.";
let QuartzMiningEffectsText = "Unlocks the ability to mine Quartz and a few quartz-related upgrades.";
let OpticsEffectsText = "The gateway to more advanced science. Unlocks various upgrades.";
let SiliconTechEffectsText = "Unlocks Silicon and methods to obtain it from quartz.";

/**
 * TECHS
 */

let ScavengerDroneTech = new Technology('Scavenger Drones', ScavengerDroneTechCost, true, true,
ScavengerDroneTechMethod, ScavengerDroneTechUnlock, ScavengerDroneTechFlavorText, ScavengerDroneTechEffectsText);

let Digging = new Technology('Digging', DiggingCost, true, true,
DiggingMethod, DiggingUnlock, DiggingFlavorText, DiggingEffectsText);

let MiningDroneMkITech = new Technology('Mining Drones Mk. I', MiningDroneMkITechCost, false, false,
MiningDroneMkITechMethod, MiningDroneMkITechUnlock, MiningDroneMkITechFlavorText, MiningDroneMkITechEffectsText);

let Smelting = new Technology('Smelting', SmeltingCost, false, false,
SmeltingMethod, SmeltingUnlock, SmeltingFlavorText, SmeltingEffectsText);

let AssemblingMachine = new Technology('Assembling Machine', AssemblingMachineCost, false, false,
AssemblingMachineMethod, AssemblingMachineUnlock, AssemblingMachineFlavorText, AssemblingMachineEffectsText);

let BasicElectrolysis = new Technology('Basic Electrolysis', BasicElectrolysisCost, false, false,
BasicElectrolysisMethod, BasicElectrolysisUnlock, BasicElectrolysisFlavorText, BasicElectrolysisEffectsText);

let MiningDroneMkII = new Technology('Mining Drones Mk. II', MiningDroneMkIICost, false, false,
MiningDroneMkIIMethod, MiningDroneMkIIUnlock, MiningDroneMkIIFlavorText, MiningDroneMkIIEffectsText);

let CopperRefining = new Technology('Copper Refining', CopperRefiningCost, false, false,
CopperRefiningMethod, CopperRefiningUnlock, CopperRefiningFlavorText, CopperRefiningEffectsText);

let CopperWorking = new Technology('Copper Working', CopperWorkingCost, false, false,
CopperWorkingMethod, CopperWorkingUnlock, CopperWorkingFlavorText, CopperWorkingEffectsText);

let QuartzMining = new Technology('Quartz Mining', QuartzMiningCost, false, false,
QuartzMiningMethod, QuartzMiningUnlock, QuartzMiningFlavorText, QuartzMiningEffectsText);

let Optics = new Technology('Optics', OpticsCost, false, false,
OpticsMethod, OpticsUnlock, OpticsFlavorText, OpticsEffectsText);

let SiliconTech = new Technology('Silicon', SiliconTechCost, false, false,
SiliconTechMethod, SiliconTechUnlock, SiliconTechFlavorText, SiliconTechEffectsText);
                                
export let technologyArray = [ScavengerDroneTech, Digging, MiningDroneMkITech, Smelting,
    AssemblingMachine, BasicElectrolysis, MiningDroneMkII, CopperRefining, CopperWorking, QuartzMining,
    Optics, SiliconTech];

// let template = new Technology('', templateCost, false, false,
// templateMethod, templateUnlock, templateFlavorText, templateEffectsText);

/**
 * LOCAL STORAGE
 */

export function loadTechArray(){
    if(!localStorage.getItem(`${technologyArray[0].name}`)){
        setInterval(setTechs, 500);
    }
    else{
        getTechs();
        setInterval(setTechs, 500);
    }
}

function setTechs(){
    for(let building in technologyArray){
        let tempObj = {};
        for(let property in technologyArray[building]){
            if(typeof tempObj[property] != typeof console.log) tempObj[property] = technologyArray[building][property];
        }
        localStorage.setItem(`${technologyArray[building].name}`, JSON.stringify(tempObj));
    }
}

function getTechs(){
    for(let building in technologyArray){
        let tempObj = JSON.parse(localStorage.getItem(`${technologyArray[building].name}`));
        for(let property in tempObj){
            technologyArray[building][property] = tempObj[property];
        }
    }
}
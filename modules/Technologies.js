import { Research, ResourceList } from './Classes.js';
import * as Buildings from './Buildings.js';
import { Player } from './PlayerInv.js';
import * as DOM from './HTMLObjects.js';

let ScavengerDroneTechCost = new ResourceList(35, 0, 0, 0, 0);
let DiggingCost = new ResourceList(50, 0, 0, 0, 0);
let MiningDroneMkITechCost = new ResourceList(150, 0, 0, 0, 0);
let SmeltingCost = new ResourceList(0, 50, 0, 0, 0);
let BasicElectrolysisCost = new ResourceList(0, 0, 75, 0, 0);
let MiningDroneMkIICost = new ResourceList(250, 0, 100, 0, 0);


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
    Player.ironOre.display = true;
    Smelting.unlock();
    this.disableButton();
}

let SmeltingMethod = function(){
    this.purchased = true;
    Buildings.Smelter.unlocked = true;
    Player.iron.display = true;
    BasicElectrolysis.unlock();
    this.disableButton();
}

let BasicElectrolysisMethod = function(){
    this.purchased = true;
    Buildings.Electrolyzer.unlocked = true;
    MiningDroneMkII.unlock();
    this.disableButton();
}

let MiningDroneMkIIMethod = function(){
    this.purchased = true;
    Buildings.buildingArray[1] = Buildings.MiningDroneMkII;
    Player.copperOre.display = true;
    Buildings.MiningDroneMkII.unlocked = true;  
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

let BasicElectrolysisUnlock = function(){
    this.unlocked = true;
}

let MiningDroneMkIIUnlock = function(){
    if (Smelting.purchased == true){
        this.unlocked = true;
    };
}

/**
 * FLAVOR TEXT~
 */

let ScavengerDroneTechFlavorText = "Not as efficient as you, but they eventually get the job done."
let DiggingFlavorText = "Nowhere to go but down.";
let MiningDroneMkITechFlavorText = "Slightly bigger than your scavenger drones. Careful around the makeshift drill!";
let SmeltingFlavorText = "Refine your newly acquired Iron Ore.";
let BasicElectrolysisFlavorText = "Turn the scrap metal into something more useful.";

/**
 * TECHS
 */

let ScavengerDroneTech = new Research('Scavenger Drones', ScavengerDroneTechCost, true, true,
ScavengerDroneTechMethod, ScavengerDroneTechUnlock, ScavengerDroneTechFlavorText);

let Digging = new Research('Digging', DiggingCost, true, true,
DiggingMethod, DiggingUnlock, DiggingFlavorText);

let MiningDroneMkITech = new Research('Mining Drones Mk. I', MiningDroneMkITechCost, false, false,
MiningDroneMkITechMethod, MiningDroneMkITechUnlock, MiningDroneMkITechFlavorText);

let Smelting = new Research('Smelting', SmeltingCost, false, false,
SmeltingMethod, SmeltingUnlock, SmeltingFlavorText);

let BasicElectrolysis = new Research('Basic Electrolysis', BasicElectrolysisCost, false, false,
BasicElectrolysisMethod, BasicElectrolysisUnlock, BasicElectrolysisFlavorText);

let MiningDroneMkII = new Research('Mining Drones Mk. II', MiningDroneMkIICost, false, false,
MiningDroneMkIIMethod, MiningDroneMkIIUnlock, undefined);
                                
export let researchArray = [ScavengerDroneTech, Digging, MiningDroneMkITech, Smelting, BasicElectrolysis, MiningDroneMkII];

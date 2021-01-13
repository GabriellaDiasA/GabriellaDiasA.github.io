import { Cost, Research } from './Classes.js';
import * as Buildings from './Buildings.js';

let CopperMiningCost = new Cost(50, 0, 0);
let TitaniumMiningCost = new Cost(300, 200, 0);
let CoreMiningCost = new Cost(1500, 2000, 500);

/**
 * METHODS~
 */

let CopperMiningMethod = function(){
    Buildings.CopperMine.unlocked = true;
    this.purchased = true;
    TitaniumMining.unlocked = true;
    this.disableButton();
}

let TitaniumMiningMethod = function(){
    Buildings.TitaniumMine.unlocked = true;
    this.purchased = true;
    CoreMining.unlocked = true;
    this.disableButton();
}

let CoreMiningMethod = function(){
    Buildings.CoreDrill.unlocked = true;
    this.purchased = true;
    this.disableButton();
}

/**
 * FLAVOR TEXT~
 */

let CopperMiningFlavorText = "This new mineral should open new doors.";
let TitaniumMiningFlavorText = "Precious and shiny, but most importantly: strong.";
let CoreMiningFlavorText = "They dug too greedily and too deep. You know what they awoke in the darkness of Khazad-dûm.";

/**
 * TECHS
 */

let CopperMining = new Research('Copper Mining', CopperMiningCost, true, true, CopperMiningMethod, CopperMiningFlavorText);
let TitaniumMining = new Research('Titanium Mining', TitaniumMiningCost, false, false, TitaniumMiningMethod, TitaniumMiningFlavorText);
let CoreMining = new Research('Core Mining', CoreMiningCost, false, false, CoreMiningMethod, CoreMiningFlavorText);

export let researchArray = [CopperMining, TitaniumMining, CoreMining];

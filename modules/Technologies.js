import { Cost, Research } from './Classes.js';
import * as Buildings from './Buildings.js';

let CopperMiningCost = new Cost(50, 0, 0);
let ImprovedIronMinesCost = new Cost(0, 150, 0);
let CheaperIronMinesCost = new Cost(150, 200, 0);
let TitaniumMiningCost = new Cost(300, 200, 0);
let CoreMiningCost = new Cost(1500, 2000, 500);

/**
 * METHODS~
 */

let CopperMiningMethod = function(){
    this.purchased = true;
    Buildings.CopperMine.unlocked = true;
    ImprovedIronMines.unlock();
    CheaperIronMines.unlock();
    TitaniumMining.unlock();
    this.disableButton();
}

let CopperMiningUnlock = function(){
    this.unlocked = true;
}

let ImprovedIronMinesMethod = function(){
    this.purchased = true;
    Buildings.IronMine.prodRate.ironOre[0] += 0.1;
    CheaperIronMines.unlock();
    this.disableButton();
}

let ImprovedIronMinesUnlock = function(){
    if (CopperMining.purchased == true){
        this.unlocked = true;
    };
}

let CheaperIronMinesMethod = function(){
    this.purchased = true;
    Buildings.IronMine.costRate = (Buildings.IronMine.costRate - 0.01).toFixed(2);
    Buildings.IronMine.recalculateCost();
    this.disableButton();
}

let CheaperIronMinesUnlock = function(){
    if (CopperMining.purchased && TitaniumMining.purchased && ImprovedIronMines.purchased){
        this.unlocked = true;
    }
}

let TitaniumMiningMethod = function(){
    Buildings.TitaniumMine.unlocked = true;
    this.purchased = true;
    CoreMining.unlocked = true;
    CheaperIronMines.unlock();
    CoreMining.unlock();
    this.disableButton();
}

let TitaniumMiningUnlock = function(){
    if (CopperMining.unlocked){
        this.unlocked = true;
    }
}

let CoreMiningMethod = function(){
    Buildings.CoreDrill.unlocked = true;
    this.purchased = true;
    this.disableButton();
}

let CoreMiningUnlock = function(){
    if (TitaniumMining.purchased){
        this.unlocked = true;
    }
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

let CopperMining = new Research('Copper Mining', CopperMiningCost, true, true,
                                CopperMiningMethod, CopperMiningUnlock, CopperMiningFlavorText);

let ImprovedIronMines = new Research('Improved Iron Mines', ImprovedIronMinesCost, false, false,
                                ImprovedIronMinesMethod, ImprovedIronMinesUnlock, undefined);

let CheaperIronMines = new Research('Cheaper Iron Mines', CheaperIronMinesCost, false, false,
                                CheaperIronMinesMethod, CheaperIronMinesUnlock, undefined);

let TitaniumMining = new Research('Titanium Mining', TitaniumMiningCost, false, false,
                                TitaniumMiningMethod, TitaniumMiningUnlock, TitaniumMiningFlavorText);

let CoreMining = new Research('Core Mining', CoreMiningCost, false, false,
                                CoreMiningMethod, CoreMiningUnlock, CoreMiningFlavorText);
                                
export let researchArray = [CopperMining, ImprovedIronMines, TitaniumMining, CheaperIronMines, CoreMining];

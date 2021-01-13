import { Building, Cost, ProdRate } from './Classes.js';

/**
 * BUILDING COSTS AND PROD RATES
 */

let IronMineCost = new Cost(10, 0, 0);
let CopperMineCost = new Cost(100, 0, 0);
let TitaniumMineCost = new Cost(1000, 750, 0);
let CoreDrillCost = new Cost(2500, 1500, 1000);

let IronMineProdRate = new ProdRate(1, 0, 0);
let CopperMineProdRate = new ProdRate(0, 0.6, 0);
let TitaniumMineProdRate = new ProdRate(0.1, 0.1, 0.3);
let CoreDrillProdRate = new ProdRate(10, 8, 5);

/**
 * FLAVOR TEXT~
 */

 let IronMineFlavorText = "Dark and scary, but we all have to start somewhere.";
 let CopperMineFlavorText = "Not as dark but just as scary. Consider it an improvement.";
 let TitaniumMineFlavorText = "This place is just as shiny as you'd think: not at all!";
 let CoreDrillFlavorText = "Dark, scary AND extra dangerous. Consider it an improvement?";

/**
 * BUILDINGS
 */

export let IronMine = new Building('Iron Mine', 0, IronMineProdRate, IronMineCost, 1.15, true, true, IronMineFlavorText);
export let CopperMine = new Building('Copper Mine', 0, CopperMineProdRate, CopperMineCost, 1.15, false, false, CopperMineFlavorText);
export let TitaniumMine = new Building('Titanium Mine', 0, TitaniumMineProdRate, TitaniumMineCost, 1.16, false, false, TitaniumMineFlavorText);
export let CoreDrill = new Building('Core Drill', 0, CoreDrillProdRate, CoreDrillCost, 1.5, false, false, CoreDrillFlavorText);

export let buildingArray = [IronMine, CopperMine, TitaniumMine, CoreDrill];
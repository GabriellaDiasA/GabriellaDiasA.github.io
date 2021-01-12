import { Building, Cost } from './Classes.js';
import { Player } from './Player.js';

export let IronMineCost = new Cost(10, 0, 0);
export let CopperMineCost = new Cost(100, 0, 0);
export let TitaniumMineCost = new Cost(1000, 750, 0);

export let IronMine = new Building('Iron Mine', 0, 1, IronMineCost, 1.15);
export let CopperMine = new Building('Copper Mine', 0, 0.5, CopperMineCost, 1.15);
export let TitaniumMine = new Building('Titanium Mine', 0, 0.2, TitaniumMineCost, 1.16);

export let buildingArray = [IronMine, CopperMine, TitaniumMine];  
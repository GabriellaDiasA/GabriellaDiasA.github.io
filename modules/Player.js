import * as Buildings from './Buildings.js';
import { timeInterval } from './constants.js';
import { Building } from './Classes.js';

export let Player = {
    ironOre: [34, "Iron ore"],
    copperOre: [0, "Copper ore"],
    titaniumOre: [0, "Titanium ore"],

    checkCost: function(object){
        let count = 0;
        for(let i in object.cost){
            if (Player[i][0] >= object.cost[i][0]){
                count++;
            }
        }
        if(count == Object.keys(object.cost).length){
            return true;
        }
        else{
            return false;
        }
    },

    purchaseBuilding: function(){
        if(Player.checkCost(this) == true){
            for(let i in this.cost){
                Player[i][0] -= this.cost[i][0];
            }
            this.interact();
        }
    },

    updateIron: setInterval(() => {
        Player.ironOre[0] += Buildings.IronMine.stk * Buildings.IronMine.prodRate * (timeInterval / 1000);
    }, timeInterval),
    
    updateCopper: setInterval(() => {
        Player.copperOre[0] += Buildings.CopperMine.stk * Buildings.CopperMine.prodRate * (timeInterval / 1000);
    }, timeInterval),
    
    updateTitanium: setInterval(() => {
        Player.titaniumOre[0] += Buildings.TitaniumMine.stk * Buildings.TitaniumMine.prodRate * (timeInterval / 1000);
    }, timeInterval),
}
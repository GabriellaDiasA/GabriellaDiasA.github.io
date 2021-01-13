import * as Buildings from './Buildings.js';
import { timeInterval } from './constants.js';

export let Player = {
    ironOre: [15, "Iron ore"],
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

    purchaseTechnology: function(){
        if(this.purchased == true) return;
        if(Player.checkCost(this) == true){
            for(let i in this.cost){
                Player[i][0] -= this.cost[i][0];
            }
            this.method();
        }
    },

    updateResource: setInterval(() => {
        for(let count = 0; count < Buildings.buildingArray.length; count++){
            let building = Buildings.buildingArray[count];
            for(let i in building.prodRate){
                Player[i][0] += building.prodRate[i][0] * building.stk * (timeInterval / 1000);
            }
        }
    }, timeInterval),
}
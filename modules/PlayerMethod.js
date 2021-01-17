import * as Buildings from './Buildings.js';
import { Player } from './PlayerInv.js';
import { timeInterval } from './constants.js';
import { calculateNetProduction, productionList } from './utils.js';
import { StorageBuilding } from './Classes.js';

export let PlayerMethod = {
    checkCost: function(object){
        let count = 0;
        for(let i in object.cost){
            if (Player[i].amount >= object.cost[i].amount){
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
        if(PlayerMethod.checkCost(this) == true){
            for(let resource in this.cost){
                Player[resource].amount -= this.cost[resource].amount;
                if(this.constructor.name == StorageBuilding.name){
                    Player[resource].limit += this.limitIncrease[resource].amount;
                }
            }
            this.interact();
        }
    },

    purchaseTechnology: function(){
        if(this.purchased == true) return;
        if(PlayerMethod.checkCost(this) == true){
            for(let i in this.cost){
                Player[i].amount -= this.cost[i].amount;
            }
            this.method();
        }
    },

    purchaseUpgrade: function(){
        if(this.purchased == true) return;
        if(PlayerMethod.checkCost(this) == true){
            for(let i in this.cost){
                Player[i].amount -= this.cost[i].amount;
            }
            this.method();
        }
    },

    turnOn: function(building){
        if(building.stk < building.maxStk){
            for(let resource in Player){
                if(building.prodRate[resource].amount < 0 && Player[resource].amount + (building.stk + 1)*building.prodRate[resource].amount * (timeInterval / 1000) > 0 ){
                    building.stk++;
                    building.updateButtonText();
                }
            }
        }
    },

    turnOff: function(building){
        if(building.stk > 0){
            building.stk--;
            building.updateButtonText();
        }
    },

    updateResource: setInterval(() => {
        calculateNetProduction();
        for(let resource in Player){
            if(Player[resource].amount != undefined){
                if(Player[resource].limit > Player[resource].amount + productionList[resource].amount){
                    Player[resource].amount += productionList[resource].amount;
                }
                else{
                    Player[resource].amount = Player[resource].limit;
                }
                if(productionList[resource].amount < 0 && Player[resource].amount + productionList[resource].amount < 0){
                    for(let count = 0; count < Buildings.buildingArray.length; count++){
                        let building = Buildings.buildingArray[count];
                        if(building.prodRate[resource].amount < 0){
                            for(let i = 0; i < building.maxStk; i++){
                                PlayerMethod.turnOff(building);
                            }
                        }
                    }
                }
            }
        }
    }, timeInterval) 
}
import * as Buildings from './gameObjects/Buildings.js';
import { basicResources, basePlayer } from './PlayerInv.js';
import { timeInterval } from './constants.js';
import { calculateNetProduction, productionList } from './utils.js';
import { BonusBuilding, StorageBuilding } from './Classes.js';

export let PlayerMethod = {
    checkCost: function(object){
        let count = 0;
        for(let i in object.cost){
            if (basicResources[i].amount >= object.cost[i].amount){
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

    findTarget: function(name){
        for(let building in Buildings.buildingList){
            if(name == Buildings.buildingList[building].name){
                return Buildings.buildingList[building];
            }
        }
    },

    purchaseBuilding: function(){
        if(PlayerMethod.checkCost(this) == true){
            for(let resource in this.cost){
                basicResources[resource].amount -= this.cost[resource].amount;
                if(this.constructor.name == StorageBuilding.name){
                    basicResources[resource].limit += this.limitIncrease[resource].amount;
                }
                if(this.constructor.name == BonusBuilding.name){
                    if(this.resourceBonus != null){
                        basicResources[resource].bonusOne += this.resourceBonus[resource].amount;
                    }
                }
            }
            console.log(this);
            if(this.buildingBonus != null && this.constructor.name == BonusBuilding.name){
                for(let buildingCounter = 0; buildingCounter < this.buildingBonus.length; buildingCounter++){
                    let currentTargetName = this.buildingBonus[buildingCounter].targetName;
                    let currentTarget = PlayerMethod.findTarget(currentTargetName);
                    currentTarget.buildingBonusProd += this.buildingBonus[buildingCounter].bonus;
                }
            }
            this.interact();
        }
    },

    purchaseTechnology: function(){
        if(this.purchased == true) return;
        if(PlayerMethod.checkCost(this) == true){
            for(let i in this.cost){
                basicResources[i].amount -= this.cost[i].amount;
            }
            this.method();
        }
    },

    purchaseUpgrade: function(){
        if(this.purchased == true) return;
        if(PlayerMethod.checkCost(this) == true){
            for(let i in this.cost){
                basicResources[i].amount -= this.cost[i].amount;
            }
            this.method();
        }
    },

    turnOn: function(building){
        if(building.stk < building.maxStk){
            let resourceCounter = Object.keys(basicResources).length;
            for(let resource in basicResources){
                if(basicResources[resource].amount + (building.stk + 1)*building.prodRate[resource].amount * (timeInterval / 1000) >= 0 ){
                    resourceCounter--;
                }
            }
            if(resourceCounter == 0){
                building.stk++;
                building.updateButtonText();
            }
        }
    },

    turnOff: function(building){
        if(building.stk > 0){
            building.stk--;
            building.updateButtonText();
        }
    },

    recalculateLimit: function(){
        for(let resource in basicResources){
            for(let building in Buildings.storageArray){
                let currentBuilding = Buildings.storageArray[building];
                basicResources[resource].limit = basebasicResources[resource].limit + currentBuilding[resource] * currentBuilding.stk;
            }
        }
    },

    updateResource: setInterval(() => {
        calculateNetProduction();
        for(let resource in basicResources){
            if(basicResources[resource].amount != undefined){
                if(basicResources[resource].limit > basicResources[resource].amount + productionList[resource].amount){
                    basicResources[resource].amount += productionList[resource].amount;
                }
                else{
                    basicResources[resource].amount = basicResources[resource].limit;
                }
                if(productionList[resource].amount < 0 && basicResources[resource].amount + productionList[resource].amount < 0){
                    for(let element in Buildings.buildingList){
                        let building = Buildings.buildingList[element];
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
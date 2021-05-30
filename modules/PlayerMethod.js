import * as Buildings from './gameObjects/Buildings.js';
import { basicResources, basePlayer, globalCraftingBonus, resources, craftingResources } from './PlayerInv.js';
import { timeInterval } from './constants.js';
import { calculateNetBasicProduction, productionList } from './utils.js';
import { BonusBuilding, StorageBuilding } from './Classes.js';
import { craftingList } from './gameObjects/Crafting.js';

export let PlayerMethod = {
    checkCost: function(object){
        let count = 0;
        let reached = 0;
        for(let type in object.cost){
            for(let resource in object.cost[type]){
                reached++;
                if(resources[type][resource].amount >= object.cost[type][resource].amount && resources[type] != null){
                    count++
                }
            }
        }
        if(count == reached) return true;
        else return false;
    },

    findTarget: function(name, list){
        for(let element in list){
            if(name == list[element].name || name == list[element].label){
                return list[element];
            }
        }
    },

    purchaseBuilding: function(){
        if(PlayerMethod.checkCost(this) == true){
            for(let type in this.cost){
                for(let resource in this.cost[type]){
                    resources[type][resource].amount -= this.cost[type][resource].amount;
                    if(this.constructor.name == StorageBuilding.name){
                        resources[type][resource].limit += this.limitIncrease[type][resource].amount;
                    }
                    if(this.constructor.name == BonusBuilding.name){
                        if(this.resourceBonus != null){
                            resources[type][resource].bonusOne += this.resourceBonus[type][resource].amount;
                        }
                    }
                }
            }   
            if(this.buildingBonus != null && this.constructor.name == BonusBuilding.name){
                for(let buildingCounter = 0; buildingCounter < this.buildingBonus.length; buildingCounter++){
                    let currentTargetName = this.buildingBonus[buildingCounter].targetName;
                    let currentTarget = PlayerMethod.findTarget(currentTargetName, Buildings.buildingList);
                    currentTarget.buildingBonusProd += this.buildingBonus[buildingCounter].bonus;
                }
            }
            this.interact();
        }
    },

    purchaseTechnology: function(){
        if(this.purchased == true) return;
        if(PlayerMethod.checkCost(this) == true){
            for(let type in this.cost){
                for(let resource in this.cost[type]){
                    resources[type][resource].amount -= this.cost[type][resource].amount;
                }
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

    craft: function(){
        if(PlayerMethod.checkCost(this)){
            for(let type in this.cost){
                for(let resource in this.cost[type]){
                    resources[type][resource].amount -= this.cost[type][resource].amount;
                }
            }
            let currentCraft = PlayerMethod.findTarget(this.name, craftingResources);
            this.amount += currentCraft.craftingBonus * globalCraftingBonus;
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

    updateBasicResource: setInterval(() => {
        calculateNetBasicProduction();
        for(let resource in basicResources){
            if(basicResources[resource].amount != undefined){
                if(basicResources[resource].limit > basicResources[resource].amount + productionList.basicResources[resource].amount){
                    basicResources[resource].amount += productionList.basicResources[resource].amount;
                }
                else{
                    basicResources[resource].amount = basicResources[resource].limit;
                }
                if(productionList.basicResources[resource].amount < 0 && basicResources[resource].amount + productionList.basicResources[resource].amount < 0){
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
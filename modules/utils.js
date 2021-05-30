import * as Buildings from './gameObjects/Buildings.js';
import { BasicResourceList, CompleteResourceList } from './Classes.js';
import { timeInterval } from './constants.js';
import { resources } from './PlayerInv.js';

let basicProduction = new BasicResourceList(0 ,0, 0, 0, 0, 0, 0, 0);
export let productionList = new CompleteResourceList(basicProduction, null, null);

function resetNetProduction(){
    for(let type in productionList){
        for(let resource in productionList[type]){
            productionList[type][resource].amount = 0;
        }
    }
}

export function calculateNetBasicProduction(){
    resetNetProduction();
    for(let element in Buildings.buildingList){
        let building = Buildings.buildingList[element]
        for(let type in building.prodRate){
            for(let resource in building.prodRate[type]){
                if(building.prodRate != false && building.unlocked == true){
                    if(building.prodRate[type][resource].amount > 0){
                        productionList[type][resource].amount += building.prodRate[type][resource].amount * building.bonusProd * building.stk * (timeInterval / 1000) * resources[type][resource].bonusOne * building.buildingBonusProd;
                    }else{
                        productionList[type][resource].amount += building.prodRate[type][resource].amount * building.bonusProd * building.stk * (timeInterval / 1000);
                    }
                }
            }
        }
    }
}

function convertTime(secondsNum){
    let hours = Math.floor(secondsNum / 3600);
    secondsNum -= hours*3600;
    let minutes = Math.floor(secondsNum/60);
    secondsNum -= minutes*60;
    let seconds = secondsNum;

    return `${hours}h ${minutes}m ${seconds}s`;
}
import * as Buildings from './gameObjects/Buildings.js';
import { ResourceList } from './Classes.js';
import { timeInterval } from './constants.js';
import { basicResources } from './PlayerInv.js';

export let productionList = new ResourceList(0, 0, 0, 0, 0, 0, 0);

function resetNetProduction(){
    for(let resource in productionList){
        productionList[resource].amount = 0;
    }
}

export function calculateNetProduction(){
    resetNetProduction();
    for(let element in Buildings.buildingList){
        let building = Buildings.buildingList[element]
        for(let resource in building.prodRate){
            if(building.prodRate != false){
                if(building.prodRate[resource].amount > 0){
                    productionList[resource].amount += building.prodRate[resource].amount * building.bonusProd * building.stk * (timeInterval / 1000) * basicResources[resource].bonusOne * building.buildingBonusProd;
                }else{
                    productionList[resource].amount += building.prodRate[resource].amount * building.bonusProd * building.stk * (timeInterval / 1000);
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
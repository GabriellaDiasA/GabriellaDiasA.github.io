import * as Buildings from './Buildings.js';
import { ResourceList } from './Classes.js';
import { timeInterval } from './constants.js';

export let productionList = new ResourceList(0, 0, 0, 0, 0, 0, 0);

function resetNetProduction(){
    for(let resource in productionList){
        productionList[resource].amount = 0;
    }
}

export function calculateNetProduction(){
    resetNetProduction();
    for(let count = 0; count < Buildings.buildingArray.length; count++){
        let building = Buildings.buildingArray[count]
        for(let resource in building.prodRate){
            productionList[resource].amount += building.prodRate[resource].amount * building.bonusProd * building.stk * (timeInterval / 1000);
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
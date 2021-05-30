/**
 * BASIC RESOURCES
 */

export let globalCraftingBonus = 1;

export let basicResources = {
    scrap: {amount: 0, label:"Scrap", display: true, limit: 5000, bonusOne: 20},
    ironOre: {amount: 0, label: "Iron Ore", display: false, limit: 400, bonusOne: 20},
    iron: {amount: 0, label: "Iron", display: false, limit: 200, bonusOne: 20},
    copperOre: {amount: 0, label: "Copper Ore", display: false, limit: 400, bonusOne: 20},
    copper: {amount: 0, label: "Copper", display: false, limit: 200, bonusOne: 20},
    quartz: {amount: 0, label: "Quartz", display: false, limit: 500, bonusOne: 20},
    silicon: {amount: 0, label: "Silicon", display: false, limit: 150, bonusOne: 20},
    bits: {amount: 0, label: "Bits", display: false, limit: 1024, bonusOne: 20},
}

export let basePlayer = {
    scrap: {amount: 0, label:"Scrap", display: true, limit: 500, bonusOne: 1},
    ironOre: {amount: 0, label: "Iron Ore", display: false, limit: 400, bonusOne: 1},
    iron: {amount: 0, label: "Iron", display: false, limit: 200, bonusOne: 1},
    copperOre: {amount: 0, label: "Copper Ore", display: false, limit: 400, bonusOne: 1},
    copper: {amount: 0, label: "Copper", display: false, limit: 200, bonusOne: 1},
    quartz: {amount: 0, label: "Quartz", display: false, limit: 500, bonusOne: 1},
    silicon: {amount: 0, label: "Silicon", display: false, limit: 150, bonusOne: 1},
    bits: {amount: 0, label: "Bits", display: false, limit: 1024, bonusOne: 1},
}

/**
 * CRAFTED RESOURCES
 */

export let craftingResources = {
    gear: {amount: 0, label: "Gear", display: false, craftingBonus: 1},
    plate: {amount: 0, label: "Plate", display: false, craftingBonus: 1},
    graphite: {amount: 0, label: "Graphite", display: false, craftingBonus: 1},
}

/**
 * DATA RESOURCES
 */

let dataResources = {
    byte: {amount: 0, label: "Byte", display: false, craftingBonus: 1},
    KB: {amount: 0, label: "KB", display: false, craftingBonus: 1},
    MB: {amount: 0, label: "MB", display: false, craftingBonus: 1},
    GB: {amount: 0, label: "GB", display: false, craftingBonus: 1},
    TB: {amount: 0, label: "TB", display: false, craftingBonus: 1},
    PB: {amount: 0, label: "PB", display: false, craftingBonus: 1},
}

export let resources = {
    basicResources: basicResources,
    craftingResources: craftingResources,
    dataResources: dataResources,
}

let resourcesClean = {
    basicResources: basePlayer,
    craftingResources: craftingResources,
    dataResources: dataResources,
}

export function loadPlayer(){
    if(!localStorage.getItem(`resourcesbasicResources`)){
        setInterval(setResources, 500);
    }
    else{
        getResources();
        setInterval(setResources, 500);
    }
}

function setResources(){
    for(let type in resources){
        let tempObj = {basicResources:{}, craftingResources:{}, dataResources:{}};
        for(let resource in resources[type]){
            tempObj[type][resource] = resources[type][resource];
        }
        localStorage.setItem(`resources${[type]}`, JSON.stringify(tempObj[type]));
    }
}

function getResources(){
    for(let type in resources){
        let tempObj = JSON.parse(localStorage.getItem(`resources${[type]}`));
        for(let resource in resources[type]){
            resources[type][resource] = tempObj[resource];
        }
    }
}   

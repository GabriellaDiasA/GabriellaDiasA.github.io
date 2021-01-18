export let basicResources = {
    scrap: {amount: 0, label:"Scrap", display: true, limit: 5000, bonusOne: 1},
    ironOre: {amount: 0, label: "Iron Ore", display: false, limit: 400, bonusOne: 1},
    iron: {amount: 0, label: "Iron", display: false, limit: 200, bonusOne: 1},
    copperOre: {amount: 0, label: "Copper Ore", display: false, limit: 400, bonusOne: 1},
    copper: {amount: 0, label: "Copper", display: false, limit: 200, bonusOne: 1},
    quartz: {amount: 0, label: "Quartz", display: false, limit: 500, bonusOne: 1},
    silicon: {amount: 0, label: "Silicon", display: false, limit: 150, bonusOne: 1},
    bits: {amount: 0, label: "Bits", display: false, limit: 1024, bonusOne: 1},
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

export function loadPlayer(){
    if(!localStorage.getItem('basicResources')){
        
        setInterval(setPlayer, 500);
    }else{
        getPlayer();
        setInterval(setPlayer, 500);
    }
}

function getPlayer(){
    basicResources = JSON.parse(localStorage.getItem('basicResources'));
}

function setPlayer(){
    localStorage.setItem('basicResources', JSON.stringify(basicResources));
}

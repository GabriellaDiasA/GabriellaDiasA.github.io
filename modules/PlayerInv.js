export let Player = {
    scrap: {amount: 0, label:"Scrap", display: true, limit: 500},
    ironOre: {amount: 0, label: "Iron Ore", display: false, limit: 400},
    iron: {amount: 0, label: "Iron", display: false, limit: 200},
    copperOre: {amount: 0, label: "Copper Ore", display: false, limit: 400},
    copper: {amount: 0, label: "Copper", display: false, limit: 200},
    quartz: {amount: 0, label: "Quartz", display: false, limit: 500},
    silicon: {amount: 0, label: "Silicon", display: false, limit: 150},
}

// export let Player = {
//     scrap: {amount: 500000, label:"Scrap", display: true, limit: 500000},
//     ironOre: {amount: 500000, label: "Iron Ore", display: false, limit: 500000},
//     iron: {amount: 500000, label: "Iron", display: false, limit: 500000},
//     copperOre: {amount: 500000, label: "Copper Ore", display: false, limit: 500000},
//     copper: {amount: 500000, label: "Copper", display: false, limit: 500000},
//     quartz: {amount: 500000, label: "Quartz", display: false, limit: 500000},
//     silicon: {amount: 500000, label: "Silicon", display: false, limit: 500000},
// }

export function loadPlayer(){
    if(!localStorage.getItem('basicResources')){
        setInterval(setPlayer, 500);
    }else{
        getPlayer();
        setInterval(setPlayer, 500);
    }
}

function getPlayer(){
    Player = JSON.parse(localStorage.getItem('basicResources'));
}

function setPlayer(){
    localStorage.setItem('basicResources', JSON.stringify(Player));
}

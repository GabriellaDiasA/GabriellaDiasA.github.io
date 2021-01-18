export const body = document.getElementsByTagName('body')[0];
export const gameContainer = document.getElementById('gameContainer');
export const leftDiv = document.getElementById('leftDiv');
export const midDiv = document.getElementById('midDiv');
export const rightDiv = document.getElementById('rightDiv');
export const gameButtonsDiv = document.getElementById('gameButtonsDiv');
export const gameMenu = document.getElementById('gameMenu');

let outpostMenu = {
    label: "Outpost",
    display: true,
}
let technologyMenu = {
    label: "Technology",
    display: true,
}
let storageMenu = {
    label: "Storage",
    display: false,
}
let upgradesMenu = {
    label: "Upgrades",
    display: false,
}

export let menuArray = {outpost: outpostMenu, technology: technologyMenu, storage: storageMenu, upgrades: upgradesMenu};

/**
 * LOCAL STORAGE
 */

export function loadMenuArray(){
    if(!localStorage.getItem('menuArray')){
        setInterval(setMenuArray, 500);
    }else{
        getMenuArray();
        setInterval(setMenuArray, 500);
    }
}

function getMenuArray(){
    menuArray = JSON.parse(localStorage.getItem('menuArray'));
}

function setMenuArray(){
    localStorage.setItem('menuArray', JSON.stringify(menuArray));
}
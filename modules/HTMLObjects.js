export const body = document.getElementsByTagName('body')[0];
export const gameContainer = document.getElementById('gameContainer');
export const leftDiv = document.getElementById('leftDiv');
export const midDiv = document.getElementById('midDiv');
export const rightDiv = document.getElementById('rightDiv');
export const gameButtonsDiv = document.getElementById('gameButtonsDiv');
export const gameMenu = document.getElementById('gameMenu');

export let outpostMenu = {
    label: "Outpost",
    display: true,
}
export let researchMenu = {
    label: "Research",
    display: true,
}
export let storageMenu = {
    label: "Storage",
    display: false,
}
export let menuArray = {outpost: outpostMenu, research: researchMenu, storage: storageMenu};
import { ActionHTML } from '../component/Action.js';
import { BuildingHTML } from '../component/Building.js';
import { MenuHTML } from '../component/Menu.js';
import { ResourceDisplayHTML } from '../component/ResourceDisplay.js';
import { ScienceHTML } from '../component/Science.js';
import { StorageHTML } from '../component/Storage.js';
import { TechHTML } from '../component/Tech.js';
import * as Content from '../../lib/config/contents.js';
import * as DOM from '../config/constants.js';

let currentMenu = "Outpost";
let newMenu;
let rendered;

export const loadDisplay = () => {
    return setInterval(() => { Object.entries(Content.resourceList).forEach(resource => render(resource[1], ResourceDisplayHTML)) })
}

export const loadMenu = () => {
    setInterval(() => {
        Object.entries(Content.menuList).forEach(menu => {
            let renderedMenuItem = render(menu[1], MenuHTML);
            renderedMenuItem && renderedMenuItem.addEventListener("click", () => { switchTab(menu[1]) })
        });
    }, DOM.screenTick)
}

export const loadCurrentTab = () => {
    if (newMenu == currentMenu) return;
    clearInterval(rendered);
    DOM.gameButtons.innerHTML = null;

    switch (newMenu) {
        case 'Outpost':
            rendered = loadOutpost();
            break;
        case 'Science':
            rendered = loadScience();
            break;
        case 'Storage':
            rendered = loadStorage();
            break;
        case 'Tech':
            rendered = loadTech();
        default:
            break;
    }
}

export const loadPlayerActions = () => { Object.entries(Content.playerActionList).forEach(action => render(action[1], ActionHTML)) }

export const loadBuildings = () => { Object.entries(Content.buildingList).forEach(building => render(building[1], BuildingHTML)) }

export const loadOutpost = () => {
    generatePlayerActionsDiv();
    generateBuildingsDiv();

    return setInterval(() => {
        loadPlayerActions();
        loadBuildings();
    }, DOM.screenTick);
}

export const loadScience = () => {
    return setInterval(() => {
        reorderSciences();
        Object.entries(Content.scienceList).forEach(science => {
            render(science[1], ScienceHTML)
        })
    }, DOM.screenTick);
}

export const loadStorage = () => {
    return setInterval(() => { Object.entries(Content.storageList).forEach(storage => render(storage[1], StorageHTML)) }, DOM.screenTick);
}

export const loadTech = () => {
    return setInterval(() => { Object.entries(Content.techList).forEach(tech => render(tech[1], TechHTML)) }, DOM.screenTick);
}

function render(item, htmlClass) {
    if (item.render && !isRendered(item)) {
        return new htmlClass(item)
    }
}

function isRendered(item) {
    return document.getElementById(item.label)
}

function reorderSciences() {
    let scienceArray = Object.entries(Content.scienceList);
    let elementArray = DOM.gameButtons.children;

    for (let i = 0; i < elementArray.length; i++) {
        if (elementArray[i].id != scienceArray[i][1].label) {
            elementArray[i].remove();
        }
    }
}

function switchTab(menu) {
    newMenu = menu.label;
    loadCurrentTab();
    currentMenu = menu.label;
}

function generatePlayerActionsDiv() {
    let actionsDisplay = document.getElementById("playerActions");

    if (!actionsDisplay) {
        actionsDisplay = document.createElement('div');
        actionsDisplay.setAttribute("class", "flexContainer");
        actionsDisplay.setAttribute("id", "playerActions");
        DOM.gameButtons.append(actionsDisplay);
    }
}

function generateBuildingsDiv() {
    let buildingsDisplay = document.getElementById("playerBuildings");

    if (!buildingsDisplay) {
        buildingsDisplay = document.createElement('div');
        buildingsDisplay.setAttribute("class", "flexContainer");
        buildingsDisplay.setAttribute("id", "playerBuildings");
        DOM.gameButtons.append(buildingsDisplay);
    }
}
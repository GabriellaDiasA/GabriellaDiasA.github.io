import { ActionHTML } from '../component/Action.js';
import { BuildingHTML } from '../component/Building.js';
import { MenuHTML } from '../component/Menu.js';
import { ResourceDisplayHTML } from '../component/ResourceDisplay.js';
import { ScienceHTML } from '../component/Science.js';
import { StorageHTML } from '../component/Storage.js';
import { TechHTML } from '../component/Tech.js';
import { EnergyHTML } from '../component/Energy.js';
import * as Content from '../../lib/config/contents.js';
import * as DOM from '../config/constants.js';
import { MachineHTML } from '../component/Machine.js';
import { DataHTML } from '../component/Data.js';
import { InfrastructureHTML } from '../component/Infrastructure.js';
import { availableEnergy } from '../../lib/model/player/energy.js';

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

export const loadStateDisplay = () => {
    let energyInfo = document.createElement('p');
    energyInfo.setAttribute("id", "energyInfo");
    setInterval(() => {
        energyInfo.textContent = `Energy: ${availableEnergy.amount}MW`;
    })
    DOM.stateDisplay.append(energyInfo)
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
        case 'Energy':
            rendered = loadEnergy();
            break;
        case 'Data':
            rendered = loadData();
            break;
        case 'Storage':
            rendered = loadStorage();
            break;
        case 'Tech':
            rendered = loadTech();
            break;
        default:
            break;
    }
}

export const loadOutpost = () => {
    generateDisplays([
        "playerActions",
        "playerBuildings",
        "playerInfrastructure",
        "playerStorage",
        "playerMachines"
    ])

    return setInterval(() => {
        loadPlayerActions();
        loadBuildings();
        loadInfrastructure();
        loadStorage();
        loadMachines();
    }, DOM.screenTick);
}

export const loadPlayerActions = () => { Object.entries(Content.playerActionList).forEach(action => render(action[1], ActionHTML)) }

export const loadBuildings = () => { Object.entries(Content.buildingList).forEach(building => render(building[1], BuildingHTML)) }

export const loadInfrastructure = () => { Object.entries(Content.infrastructureList).forEach(infra => render(infra[1], InfrastructureHTML)) }

export const loadStorage = () => { Object.entries(Content.storageList).forEach(storage => render(storage[1], StorageHTML)) }

export const loadMachines = () => { Object.entries(Content.machineList).forEach(machine => render(machine[1], MachineHTML)) }

export const loadScience = () => {
    return setInterval(() => {
        reorderSciences();
        Object.entries(Content.scienceList).forEach(science => {
            render(science[1], ScienceHTML)
        })
    }, DOM.screenTick);
}

export const loadEnergy = () => {
    generateDisplays([
        "playerEnergy"
    ]);
    return setInterval(() => { Object.entries(Content.energyList).forEach(energy => render(energy[1], EnergyHTML)) }, DOM.screenTick)
}

export const loadData = () => {
    generateDisplays([
        "playerDPUs"
    ]);
    return setInterval(() => { Object.entries(Content.dataProcessingList).forEach(dpu => render(dpu[1], DataHTML)) }, DOM.screenTick)
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

export function generateDisplays(list) {
    for (let type in list) {
        type = list[type]
        let display = document.getElementById(type);

        if (!display) {
            display = document.createElement('div');
            display.setAttribute("class", "flexContainer");
            display.classList.add("purchaseable");
            display.setAttribute("id", type);
            DOM.gameButtons.append(display);
        }
    }
}
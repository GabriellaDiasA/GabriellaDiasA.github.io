import { BuildingHTML } from '../component/Building.js';
import { MenuHTML } from '../component/Menu.js';
import { ResourceDisplayHTML } from '../component/ResourceDisplay.js';
import { ActionHTML } from '../component/Action.js';
import * as Content from '../../lib/config/contents.js';

export const loadPlayerActions = () => {
    Content.playerActionList.forEach(action => render(action, ActionHTML))
}

export const loadDisplay = () => {
    Content.baseResourceList.forEach(resource => render(resource, ResourceDisplayHTML))
}

export const loadMenu = () => {
    Content.menuList.forEach(menu => render(menu, MenuHTML));
}

export const loadBuildings = () => {
    Content.buildingList.forEach(building => render(building, BuildingHTML));
}

function render(item, htmlClass){
    item.render && new htmlClass(item)
}
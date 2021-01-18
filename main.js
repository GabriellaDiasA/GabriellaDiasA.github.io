import * as DOMAssets from './modules/HTMLAssets.js';
import * as Buildings from './modules/gameObjects/Buildings.js';
import * as Techs from  './modules/gameObjects/Technologies.js';
import * as Upgrades from './modules/gameObjects/Upgrades.js';
import * as DOM from './modules/HTMLObjects.js';
import { loadPlayer } from './modules/PlayerInv.js';

function startGame(){
    loadPlayer();
    Buildings.loadBuildingArray();
    Buildings.loadStorageArray();
    Techs.loadTechArray();
    Upgrades.loadUpgradeArray();
    DOM.loadMenuArray();
    DOMAssets.updateResourceMenu();
    DOMAssets.updateMenus();
}
startGame();
import * as DOMAssets from './modules/HTMLAssets.js';
import * as Buildings from './modules/Buildings.js';
import * as Techs from  './modules/Technologies.js';
import * as Upgrades from './modules/Upgrades.js';
import * as DOM from './modules/HTMLObjects.js';
import { Player, loadPlayer } from './modules/PlayerInv.js';

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
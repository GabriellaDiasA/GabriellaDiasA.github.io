import * as DOM from './modules/HTMLelementsConst.js';
import * as DOMAssets from './modules/HTMLAssets.js';
import { Building } from './modules/Classes.js';
import * as Buildings from './modules/Buildings.js';
import { Player } from './modules/Player.js';

function startGame(){
    DOMAssets.createResourceMenu();
    DOMAssets.updateResourceMenu();
    DOMAssets.createButtonMenu();
    DOMAssets.updateButtonsMenu();
}

startGame();
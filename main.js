import * as DOMAssets from './modules/HTMLAssets.js';

function startGame(){
    DOMAssets.createGameMenu();
    DOMAssets.updateGameMenu();
    DOMAssets.createResourceMenu();
    DOMAssets.updateResourceMenu();
    DOMAssets.createConstructionMenu();
}

startGame();
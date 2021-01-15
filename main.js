import * as DOMAssets from './modules/HTMLAssets.js';

function startGame(){
    DOMAssets.createGameMenu();
    DOMAssets.updateGameMenu();
    DOMAssets.updateResourceMenu();
    DOMAssets.createOutpostMenu();
}
startGame();
import * as Init from './utils/init.js'

const startGame = () => {
    Init.loadPlayerActions();
    Init.loadDisplay();
    Init.loadMenu();
    Init.loadBuildings();
}

startGame();
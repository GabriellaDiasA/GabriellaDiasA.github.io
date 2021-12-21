import * as Init from './utils/init.js'

const startGame = () => {
    Init.loadDisplay();
    Init.loadMenu();
    Init.loadPlayerActions();
    Init.loadBuildings();
}

startGame();
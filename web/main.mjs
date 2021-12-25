import * as Init from './utils/init.js'

const startGame = () => {
    Init.loadDisplay();
    Init.loadMenu();
    Init.loadStateDisplay();
    Init.generateDisplays([
        "playerActions",
        "playerBuildings",
        "playerMachines",
        "playerStorage",
        "playerInfrastructure"
    ])
    Init.loadPlayerActions();
    Init.loadBuildings();
    Init.loadStorage();
    Init.loadInfrastructure();
    Init.loadMachines();
}

startGame();
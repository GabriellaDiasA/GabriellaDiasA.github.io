import * as DOM from './HTMLObjects.js';
import { Building, Machine, Technology, StorageBuilding, Upgrade, BonusBuilding } from './Classes.js';
import * as Buildings from './gameObjects/Buildings.js';
import * as Techs from './gameObjects/Technologies.js';
import { basicResources } from './PlayerInv.js';
import { PlayerMethod } from './PlayerMethod.js';
import { timeInterval, yOffset } from './constants.js'
import { productionList } from './utils.js';
import * as Upgrades from './gameObjects/Upgrades.js';

DOM.menuArray.outpost.method = createOutpostMenu;
DOM.menuArray.technology.method = createTechnologyMenu;
DOM.menuArray.storage.method = createStorageMenu;
DOM.menuArray.upgrades.method = createUpgradesMenu;

export let currentMenu = "Outpost";

function infoDivIn(object, parent){

    let y = window.innerHeight - event.y;
    let x = parent.offsetLeft + parent.offsetWidth + 10;
    let infoDiv = document.createElement('div');

    infoDiv.setAttribute("id", "infoDiv");
    infoDiv.style.bottom = y.toString() + "px";
    infoDiv.style.left = x.toString() + "px";

    if(object.name != 'Scavenge Wasteland'){
        let costTitle = document.createElement('h3');
        costTitle.textContent = "Costs :";
        infoDiv.append(costTitle);
        infoDiv.append(document.createElement('hr'));

        for(let i in object.cost){
            let p = document.createElement('p');
            p.setAttribute("id", "infoText");
            p.textContent = `${object.cost[i].label}: ${object.cost[i].amount.toFixed(2)}`;
            if(object.cost[i].amount != 0) infoDiv.append(p);
        }
    }

    if(object.constructor.name == Building.name || object.constructor.name == Machine.name){
        infoDiv.append(document.createElement('br'));
        let prodTitle = document.createElement('h3');
        prodTitle.textContent = "Produces :";
        infoDiv.append(prodTitle);
        infoDiv.append(document.createElement('hr'));
    
        for(let i in object.prodRate){
            let p = document.createElement('p');
            p.setAttribute("id", "infoText");
            let label = object.prodRate[i].label;
            let amount = 0;
            if(object.prodRate[i].amount < 0){
                amount = (object.prodRate[i].amount * object.bonusProd).toFixed(2);
            }else{
                amount = (object.prodRate[i].amount * object.bonusProd * object.buildingBonusProd * basicResources[i].bonusOne).toFixed(2)
            }
            p.textContent = `${label}: ${amount}/s`;
            if(object.prodRate[i].amount != 0) infoDiv.append(p);
        }
    }

    if(object.constructor.name == StorageBuilding.name){    
        infoDiv.append(document.createElement('br'));
        let prodTitle = document.createElement('h3');
        prodTitle.textContent = "Expands :";
        infoDiv.append(prodTitle);
        infoDiv.append(document.createElement('hr'));
    
        for(let resource in object.limitIncrease){
            let p = document.createElement('p');
            p.setAttribute("id", "infoText");
            p.textContent = `${object.limitIncrease[resource].label}: ${object.limitIncrease[resource].amount.toFixed(2)}`;
            if(object.limitIncrease[resource].amount != 0 && basicResources[resource].display) infoDiv.append(p);
        }
    }

    if(object.constructor.name == Technology.name || object.constructor.name == Upgrade.name){
        infoDiv.append(document.createElement('br'));
        let prodTitle = document.createElement('h3');
        prodTitle.textContent = "Effects :";
        infoDiv.append(prodTitle);
        infoDiv.append(document.createElement('hr'));
    
        let p = document.createElement('p');
        p.setAttribute("id", "infoText");
        if (object.effectsText != undefined){
            p.textContent = `${object.effectsText}`;
            infoDiv.append(p);
        }
    }

    if(object.constructor.name == BonusBuilding.name){
        infoDiv.append(document.createElement('br'));
        let prodTitle = document.createElement('h3');
        prodTitle.textContent = "Bonus :";
        infoDiv.append(prodTitle);
        infoDiv.append(document.createElement('hr'));

        if(object.resourceBonus != null){
            for(let resource in object.resourceBonus){
                let p = document.createElement('p');
                p.setAttribute("id", "infoText");
                p.textContent = `${object.resourceBonus[resource].label}: ${100 * object.resourceBonus[resource].amount.toFixed(2)}%`;
                if(object.resourceBonus[resource].amount != 0 && basicResources[resource].display) infoDiv.append(p);
            }
        }
        else{
            let lastElementName = "";
            for(let element in object.buildingBonus){
                let p = document.createElement('p');
                p.setAttribute("id", `${object.buildingBonus[element].targetName}InfoText`);
                p.textContent = `${object.buildingBonus[element].targetName}: +${100 * object.buildingBonus[element].bonus}%`;
                if(object.buildingBonus[element].targetName != lastElementName) infoDiv.append(p);
                lastElementName = object.buildingBonus[element].targetName;
            }
        }
    }

    if(object.flavorText != undefined){
        let p = document.createElement('p');
        if (infoDiv.childElementCount != 0) infoDiv.append(document.createElement('br'));
        p.textContent = object.flavorText;
        p.setAttribute("class", "flavorText");
        infoDiv.append(p);
    }
    let infoDivBackup = infoDiv;
    parent.append(infoDiv);
    if(window.innerHeight - parseInt(infoDiv.style.bottom) - infoDiv.offsetHeight < 0){
        let heightDifference = window.innerHeight - parseInt(infoDiv.style.bottom) - infoDiv.offsetHeight;
        infoDiv.remove();
        infoDivBackup.style.bottom = (parseInt(infoDivBackup.style.bottom) + heightDifference) + "px";
        parent.append(infoDivBackup);
    }
}

function infoDivOut(){
    let infoDiv = document.getElementById('infoDiv');
    if(infoDiv != null) infoDiv.remove();
}

function itemButton(object){
    let buttonContainer = document.createElement('div');
    let button = document.createElement('div');
    let p = document.createElement('p');

    buttonContainer.setAttribute("class", "itemSpace");
    button.setAttribute("class", "item");
    p.setAttribute("id", `${object.name}`);
    p.setAttribute("class", object.constructor.name);
    if (object.constructor.name == Building.name || object.constructor.name == StorageBuilding.name || object.constructor.name == BonusBuilding.name){
        p.textContent = `${object.name}: ${object.stk}`;
    }
    else if (object.constructor.name == Technology.name){
        p.textContent = `${object.name}`;
        if(object.purchased == true) button.style.backgroundColor = "rgb(60,5,5)";
    }
    else if (object.constructor.name == Machine.name){
        p.textContent = `${object.name}: ${object.stk}/${object.maxStk}`;
    }
    else{
        p.textContent = `${object.name}`;
    }

    button.append(p);
    buttonContainer.append(button);
    
    if(object.constructor.name == Machine.name){
        let switchDiv = document.createElement('div');
        switchDiv.setAttribute("class", "switchDiv");

        let switchOn = document.createElement('div');
        switchOn.setAttribute("class", "switchOn");
        switchOn.setAttribute("id", `switchOn${object.name}`)
        let switchTextPlus = document.createElement('p');
        switchTextPlus.textContent = "+ ";
        switchOn.addEventListener('click', switchOn.ev = PlayerMethod.turnOn.bind(this, object)); // Storing the event listener locally so I can REMOVE IT LATER
        object.eventListenerCheck = true;

        let switchOff = document.createElement('div');
        switchOff.setAttribute("class", "switchOff");
        let switchTextMinus = document.createElement('p');
        switchTextMinus.textContent = " -";
        switchOff.addEventListener('click', PlayerMethod.turnOff.bind(this, object));

        switchOn.append(switchTextPlus);
        switchOff.append(switchTextMinus);
        switchDiv.append(switchOn);
        switchDiv.append(switchOff);
        buttonContainer.append(switchDiv);
    }

    return buttonContainer;
}

function insertButton(object, method){
    let newButton = itemButton(object);
    newButton.childNodes[0].addEventListener('click', method);
    newButton.childNodes[0].addEventListener('mouseenter', (event) => infoDivIn(object, newButton));
    newButton.childNodes[0].addEventListener('mouseleave', (event) => infoDivOut());
    newButton.childNodes[0].addEventListener('click', (event) => {
        infoDivOut();
        infoDivIn(object, newButton);
    });
    DOM.gameButtonsDiv.append(newButton);
}

/**
 * OUTPOST MENU
 */

export function createOutpostMenu(){
    if (currentMenu != "Outpost") return;
    updateBuildingConditions();
    DOM.gameButtonsDiv.style.flexFlow = "row wrap";
    if(document.getElementById("Scavenge Wasteland") == null) insertButton(Buildings.Scavenge, Buildings.Scavenge.interact.bind(Buildings.Scavenge));
    for(let element in Buildings.buildingList){
        let building = Buildings.buildingList[element];
        if(building.display == true && building.unlocked == true && document.getElementById(`${building.name}`) == null){
            insertButton(building, PlayerMethod.purchaseBuilding.bind(building));
        }
    }
    disableOrEnableButtons(Buildings.buildingList);
}

function disableOrEnableButtons(list){
    for(let i in list){
        let building = list[i];
        let costCounter = 0;
        for(let j in building.cost){
            if (basicResources[j].amount >= building.cost[j].amount){
                costCounter++;
            }
        }
        if(costCounter == Object.keys(building.cost).length){
            let p = document.getElementById(building.name);
            if (p != null){
                let parent = p.parentNode;
                p.style.color = "white";
                parent.style.backgroundColor = "rgb(90,0,0)";
            }
        }
        else{
            let p = document.getElementById(building.name);
            if (p != null){
                let parent = p.parentNode;
                p.style.color = "lightgrey";
                parent.style.backgroundColor = "rgb(60,5,5)";
            }
        }
    }
}

function updateBuildingConditions(){
    for(let element in Buildings.buildingList){
        let building = Buildings.buildingList[element];
        if(building.unlocked == true){
            building.display = true;
        }
    }
}

/**
 * RESOURCE MENU
 */

export function createResourceMenu(){
    for(let resource in basicResources){
        if(typeof basicResources[resource] == typeof basicResources){
            let div = document.createElement('div');
            let p = document.createElement('p');
            p.setAttribute("id", `${basicResources[resource].label}Resource`);
            p.setAttribute("class", "Resource");
            if(basicResources[resource].display == true && !document.getElementById(`${basicResources[resource].label}Resource`)){
                div.addEventListener('mouseenter', () => resourceInfoDiv(resource, div));
                div.addEventListener('mouseleave', infoDivOut);
                div.append(p);
                DOM.leftDiv.append(div);
            }
        }
    }
}

function resourceInfoDiv(resource, parent){
    let y = parent.offsetTop;
    let x = parent.offsetLeft + parent.offsetWidth + 10;
    let infoDiv = document.createElement('div');

    let buildingsTitle = document.createElement('h3');
    buildingsTitle.textContent = "Buildings:";
    infoDiv.append(buildingsTitle);
    infoDiv.append(document.createElement('hr'));
    for(let element in Buildings.buildingList){
        let building = Buildings.buildingList[element];
        if(building.constructor.name == Building.name || building.constructor.name == Machine.name){
            let p = document.createElement('p');
            let sign = "";
            if(building.prodRate[resource].amount >= 0) sign = "+";
    
            let buildingProd = (building.prodRate[resource].amount * building.stk * building.buildingBonusProd * basicResources[resource].bonusOne);
            buildingProd = convertNotation(buildingProd);
            p.textContent = `${building.name}: ${sign}${buildingProd}/s`;
            if(building.stk > 0 && buildingProd != 0) infoDiv.append(p);
        }
    }

    // let bonusesTitle = document.createElement('h3');
    // bonusesTitle.textContent = "Bonuses:";
    // infoDiv.append(bonusesTitle);
    // infoDiv.append(document.createElement('hr'));

    infoDiv.setAttribute("id", "infoDiv");
    infoDiv.style.top = y.toString() + "px";
    infoDiv.style.left = x.toString() + "px";
    if(infoDiv.childElementCount <= 2) return;
    parent.append(infoDiv);
}

function convertNotation(number){
    if (number >= 100000) return number.toExponential(3);
    else return number.toFixed(2);
}

function updateResources(){
    for(let i in basicResources){
        let p = document.getElementById(`${basicResources[i].label}Resource`);
        if (p != null){
            let displayAmount = basicResources[i].amount;
            let displayLimit = basicResources[i].limit;
            let displayRate = productionList[i].amount * (1000 / timeInterval);
    
            displayAmount = convertNotation(displayAmount);
            displayLimit = convertNotation(displayLimit);
            displayRate = convertNotation(displayRate);

            let sign = "";
            if (displayRate >= 0) sign = "+";

            p.style.color = warnColorText(displayAmount, displayLimit);
            p.innerText = `${basicResources[i].label}: ${displayAmount} / ${displayLimit} (${sign}${displayRate}/s)`;
            }
    }
    createResourceMenu();
}

function warnColorText(amount, limit){
    if(amount == limit) return "rgb(255,75,75)";
    else if(amount >= 0.75 * limit) return "orange";
    else if (amount >= 0.5 * limit) return "yellow";
    else return "white";
}

export function updateResourceMenu(){
    setInterval(updateResources, timeInterval);
}

/**
 * GAME MENU
 */

function clearMenu(text){
    if (currentMenu == text) return;
    let count = DOM.gameButtonsDiv.childElementCount;
    for(let i = 0; i < count; i++){  
        DOM.gameButtonsDiv.childNodes[0].remove();
    }
}

function insertMenuItem(text, method){
    let menuItem = document.createElement('div');
    menuItem.setAttribute("class", "gameMenuItem");
    let p = document.createElement('p');
    p.setAttribute("id", `${text}`);
    p.textContent = text;

    menuItem.addEventListener('click', clearMenu.bind(this, text));
    menuItem.addEventListener('click', () => {currentMenu = p.textContent});
    menuItem.addEventListener('click', method);

    menuItem.append(p);
    DOM.gameMenu.append(menuItem);
}

export function createGameMenu(){
    for(let count in DOM.menuArray){
        let p = document.getElementById(`${DOM.menuArray[count].label}`);
        if (DOM.menuArray[count].display == true && p == null){
            insertMenuItem(DOM.menuArray[count].label, DOM.menuArray[count].method);
        }
    }
}

/**
 * RESEARCH MENU
 */

function createTechnologyMenu(){
    if (currentMenu != "Technology") return;
    updateTechnologyConditions();
    DOM.gameButtonsDiv.style.flexFlow = "column";
    for(let count = 0; count < Techs.technologyArray.length; count++){
        let technology = Techs.technologyArray[count];
        let p = document.getElementById(technology.name);
        if(technology.display == true && technology.unlocked == true && p == null){
            insertButton(technology, PlayerMethod.purchaseTechnology.bind(technology));
        }
    }
}

function updateTechnologyConditions(){
    for(let count = 0; count < Techs.technologyArray.length; count++){
        let technology = Techs.technologyArray[count];
        let p = document.getElementById(technology.name);
        if(technology.unlocked == true && p == null){
            technology.display = true;
        }
    }
}


/**
 * STORAGE MENU
 */

function createStorageMenu(){
    if (currentMenu != "Storage") return;
    updateStorageConditions();
    DOM.gameButtonsDiv.style.flexFlow = "row wrap";
    for(let element in Buildings.storageList){
        let building = Buildings.storageList[element];
        if(building.display == true && building.unlocked == true && document.getElementById(`${building.name}`) == null){
            insertButton(building, PlayerMethod.purchaseBuilding.bind(building));
        }
    }
    disableOrEnableButtons(Buildings.storageList);
}

function updateStorageConditions(){
    for(let element in Buildings.storageList){
        let building = Buildings.storageList[element];
        if(building.unlocked == true){
            building.display = true;
        }
    }
}

/**
 * UGRADES MENU
 */

function createUpgradesMenu(){
    if (currentMenu != "Upgrades") return;
    updateUpgradesConditions();
    DOM.gameButtonsDiv.style.flexFlow = "row wrap";
    for(let count = 0; count < Upgrades.upgradeArray.length; count++){
        let upgrade = Upgrades.upgradeArray[count];
        if(upgrade.display && upgrade.unlocked && !upgrade.purchased && document.getElementById(`${upgrade.name}`) == null){
            insertButton(upgrade, PlayerMethod.purchaseUpgrade.bind(upgrade));
        }
    }
}

function updateUpgradesConditions(){
    for(let count = 0; count < Upgrades.upgradeArray.length; count++){
        let upgrade = Upgrades.upgradeArray[count];
        let p = document.getElementById(`${upgrade.name}`);
        if(upgrade.purchased == true && p != null){
            p.parentNode.parentNode.remove();
        }
        if(upgrade.unlocked == true){
            upgrade.display = true;
        }
    }
}

export function updateMenus(){
    setInterval(createGameMenu, timeInterval);
    setInterval(createOutpostMenu, timeInterval);
    setInterval(createTechnologyMenu, timeInterval);
    setInterval(createStorageMenu, timeInterval);
    setInterval(createUpgradesMenu, timeInterval);
}
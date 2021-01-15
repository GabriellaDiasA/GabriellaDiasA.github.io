import * as DOM from './HTMLObjects.js';
import { Building, Machine, Research, StorageBuilding } from './Classes.js';
import * as Buildings from './Buildings.js';
import * as Techs from './Technologies.js';
import { Player } from './PlayerInv.js';
import { PlayerMethod } from './PlayerMethod.js';
import { timeInterval, yOffset } from './constants.js'
import { productionList } from './utils.js';

DOM.menuArray.outpost.method = createOutpostMenu;
DOM.menuArray.research.method = createResearchMenu;
DOM.menuArray.storage.method = createStorageMenu;

export let currentMenu = "Outpost";
let outpostCheck = false;
let researchCheck = false;
let storageCheck = false;

function updateCheck(){
    outpostCheck = false;
    researchCheck = false;
    storageCheck = false;
}

function infoDivIn(object, parent){

    let y = parent.offsetTop;
    let x = parent.offsetLeft + parent.offsetWidth + 10;
    let infoDiv = document.createElement('div');

    infoDiv.setAttribute("id", "infoDiv");
    infoDiv.style.top = y.toString() + "px";
    infoDiv.style.left = x.toString() + "px";

    if(object.name != 'Scavenge Wasteland'){
        let costTitle = document.createElement('h3');
        costTitle.textContent = "Costs :";
        infoDiv.append(costTitle);

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
    
        for(let i in object.prodRate){
            let p = document.createElement('p');
            p.setAttribute("id", "infoText");
            p.textContent = `${object.prodRate[i].label}: ${object.prodRate[i].amount}/s`;
            if(object.prodRate[i].amount != 0) infoDiv.append(p);
        }
    }

    if(object.constructor.name == StorageBuilding.name){    
        infoDiv.append(document.createElement('br'));
        let prodTitle = document.createElement('h3');
        prodTitle.textContent = "Expands :";
        infoDiv.append(prodTitle);
    
        for(let resource in object.limitIncrease){
            let p = document.createElement('p');
            p.setAttribute("id", "infoText");
            p.textContent = `${object.limitIncrease[resource].label}: ${object.limitIncrease[resource].amount}`;
            if(object.limitIncrease[resource].amount != 0 && Player[resource].display) infoDiv.append(p);
        }
    }

    if(object.flavorText != undefined){
        let p = document.createElement('p');
        let flavorText = document.createElement('em');
        if (infoDiv.childElementCount != 0) infoDiv.append(document.createElement('br'));
        flavorText.textContent = object.flavorText;
        p.append(flavorText);
        infoDiv.append(p);
    }

    parent.append(infoDiv);
}

function infoDivOut(){
    let infoDiv = document.getElementById('infoDiv');
    infoDiv.remove();
}

function itemButton(object){
    let buttonContainer = document.createElement('div');
    let button = document.createElement('div');
    let p = document.createElement('p');

    buttonContainer.setAttribute("class", "itemSpace");
    button.setAttribute("class", "item");
    p.setAttribute("id", `${object.name}`);
    p.setAttribute("class", object.constructor.name);
    if (object.constructor.name == Building.name || object.constructor.name == StorageBuilding.name){
        p.textContent = `${object.name}: ${object.stk}`;
    }
    else if (object.constructor.name == Research.name){
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
    for(let count = 0; count < Buildings.buildingArray.length; count++){
        let building = Buildings.buildingArray[count];
        if(building.display == true && building.unlocked == true && document.getElementById(`${building.name}`) == null){
            insertButton(building, PlayerMethod.purchaseBuilding.bind(building));
        }
    }
    updateOutpostMenu();
}

function disableOrEnableButtons(){
    for(let i = 0; i < Buildings.buildingArray.length; i++){
        let building = Buildings.buildingArray[i];
        let costCounter = 0;
        for(let j in building.cost){
            if (Player[j].amount >= building.cost[j].amount){
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

    disableOrEnableButtons();

    for(let count = 0; count < Buildings.buildingArray.length; count++){
        let building = Buildings.buildingArray[count];
        if(building.unlocked == true){
            building.display = true;
        }
    }
}

function updateOutpostMenu(){
    if (currentMenu == "Outpost" && outpostCheck == false){
        updateCheck();
        outpostCheck = true;
        setInterval(createOutpostMenu, timeInterval);
    }
}

/**
 * RESOURCE MENU
 */

export function createResourceMenu(){
    for(let i in Player){
        if(typeof Player[i] == typeof Player){
            let p = document.createElement('p');
            p.setAttribute("id", Player[i].label);
            p.setAttribute("class", "Resource");

            let displayAmount = Player[i].amount;
            let displayLimit = Player[i].limit;

            displayAmount = convertNotation(displayAmount);
            displayLimit = convertNotation(displayLimit);

            p.innerText = `${Player[i].label}: ${displayAmount} / ${displayLimit}`;

            if(Player[i].display == true && !document.getElementById(`${Player[i].label}`)) DOM.leftDiv.append(p);
        }
    }
}

function convertNotation(number){
    if (number >= 100000) return number.toExponential(3);
    else return number.toFixed(2);
}

function updateResources(){
    for(let i in Player){
        if(typeof Player[i] == typeof Player && Player[i].display){
            let p = document.getElementById(`${Player[i].label}`);
            if (p != null){
                let displayAmount = Player[i].amount;
                let displayLimit = Player[i].limit;
    
                displayAmount = convertNotation(displayAmount);
                displayLimit = convertNotation(displayLimit);
    
                p.innerText = `${Player[i].label}: ${displayAmount} / ${displayLimit}`;
            }
        }
    }
    createResourceMenu();
}

export function updateResourceMenu(){
    setInterval(updateResources, timeInterval);
}

/**
 * GAME MENU
 */

function clearMenu(){
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

    menuItem.addEventListener('click', () => {currentMenu = p.textContent});
    menuItem.addEventListener('click', clearMenu);
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

export function updateGameMenu(){
    setInterval(createGameMenu, timeInterval);
}

/**
 * RESEARCH MENU
 */

function createResearchMenu(){
    if (currentMenu != "Research") return;
    DOM.gameButtonsDiv.style.flexFlow = "column";
    for(let count = 0; count < Techs.researchArray.length; count++){
        let research = Techs.researchArray[count];
        let p = document.getElementById(research.name);
        if(research.display == true && research.unlocked == true && p == null){
            insertButton(research, PlayerMethod.purchaseTechnology.bind(research));
        }
    }
    updateResearchMenu();
}

function updateResearchConditions(){
    for(let count = 0; count < Techs.researchArray.length; count++){
        let research = Techs.researchArray[count];
        let p = document.getElementById(research.name);
        if(research.unlocked == true && p == null){
            research.display = true;
            createResearchMenu();
        }
    }
}

function updateResearchMenu(){
    if(currentMenu == "Research" && researchCheck == false){
        updateCheck();
        researchCheck = true;
        setInterval(updateResearchConditions, timeInterval);
    }
}

/**
 * STORAGE MENU
 */

function createStorageMenu(){
    if (currentMenu != "Storage") return;
    updateStorageConditions();
    DOM.gameButtonsDiv.style.flexFlow = "row wrap";
    for(let count = 0; count < Buildings.storageArray.length; count++){
        let building = Buildings.storageArray[count];
        if(building.display == true && building.unlocked == true && document.getElementById(`${building.name}`) == null){
            insertButton(building, PlayerMethod.purchaseBuilding.bind(building));
        }
    }
    updateStorageMenu();
}

function updateStorageConditions(){
    disableOrEnableButtons();

    for(let count = 0; count < Buildings.storageArray.length; count++){
        let building = Buildings.storageArray[count];
        if(building.unlocked == true){
            building.display = true;
        }
    }
}

function updateStorageMenu(){
    if(currentMenu == "Storage" && storageCheck == false){
        updateCheck();
        storageCheck = true;
        setInterval(createStorageMenu, timeInterval);
    }
}
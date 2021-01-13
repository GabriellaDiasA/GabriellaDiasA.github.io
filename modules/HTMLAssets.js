import * as DOM from './HTMLElementsConst.js';
import { Building, Cost, Research } from './Classes.js';
import * as Buildings from './Buildings.js';
import * as Techs from './Technologies.js';
import { Player } from './Player.js';
import { timeInterval, yOffset } from './constants.js'

let currentMenu = "Construction";
let constructionCheck = false;
let researchCheck = false;

function itemButton(object){
    let buttonContainer = document.createElement('div');
    let button = document.createElement('div');
    let p = document.createElement('p');

    buttonContainer.setAttribute("class", "itemSpace");
    button.setAttribute("class", "item");
    p.setAttribute("id", `${object.name}`);
    if (object.constructor.name == Building.name) p.textContent = `${object.name}: ${object.stk}`;
    if (object.constructor.name == Research.name){
        p.textContent = `${object.name}`;
        if(object.purchased == true) button.style.backgroundColor = "rgb(60,5,5)";
    }
    button.append(p);
    buttonContainer.append(button);

    return buttonContainer;
}

function infoDivIn(object, parent){

    let y = parent.offsetTop;
    let x = parent.offsetLeft + parent.offsetWidth + 10;
    let infoDiv = document.createElement('div');

    infoDiv.setAttribute("id", "infoDiv");
    infoDiv.style.top = y.toString() + "px";
    infoDiv.style.left = x.toString() + "px";

    let costTitle = document.createElement('h3');
    costTitle.textContent = "Costs :";
    infoDiv.append(costTitle);

    for(let i in object.cost){
        let p = document.createElement('p');
        p.setAttribute("id", "infoText");
        p.textContent = `${object.cost[i][1]}: ${object.cost[i][0].toFixed(2)}`;
        infoDiv.append(p);
    }

    infoDiv.append(document.createElement('br'));

    if(object.constructor.name == Building.name){
        let prodTitle = document.createElement('h3');
        prodTitle.textContent = "Produces :";
        infoDiv.append(prodTitle);
    
        for(let i in object.prodRate){
            let p = document.createElement('p');
            p.setAttribute("id", "infoText");
            p.textContent = `${object.prodRate[i][1]}: ${object.prodRate[i][0]}/s`;
            infoDiv.append(p);
        }
    }

    let p = document.createElement('p');
    let flavorText = document.createElement('em');

    if(object.flavorText != undefined){
        infoDiv.append(document.createElement('br'));
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
 * CONSTRUCTION MENU
 */

export function createConstructionMenu(){
    if (currentMenu != "Construction") return;
    DOM.gameButtonsDiv.style.flexFlow = "row wrap";
    let count = DOM.gameButtonsDiv.childElementCount;
    for(count; count < Buildings.buildingArray.length; count++){
        let building = Buildings.buildingArray[count];
        if(building.display == true && building.unlocked == true){
            insertButton(building, Player.purchaseBuilding.bind(building));
        }
    }
    updateConstructionMenu();
}

function updateBuildingConditions(){
    let count = DOM.gameButtonsDiv.childElementCount;
    for(count; count < Buildings.buildingArray.length; count++){
        let building = Buildings.buildingArray[count];
        let costCounter = 0;
        for(let i in building.cost){
            if(building.cost[i][0] * 0.35 <= Player[i][0]){
                costCounter++;
            }
        }
        if(costCounter == Object.keys(building.cost).length){
            building.display = true;
            if(building.unlocked == true){
                createConstructionMenu();
            }
        }
    }
}

function updateConstructionMenu(){
    if (currentMenu == "Construction" && constructionCheck == false){
        constructionCheck = true;
        researchCheck = false;
        setInterval(updateBuildingConditions, timeInterval);
    }
}

/**
 * RESOURCE MENU
 */

export function createResourceMenu(){
    for(let i in Player){
        if(typeof Player[i] == typeof Player){
            let p = document.createElement('p');
            p.setAttribute("id", Player[i][1]);
            DOM.leftDiv.append(p);
        }
    }
}

function updateResources(){
    for(let i in Player){
        if(typeof Player[i] == typeof Player){
            let p = document.getElementById(`${Player[i][1]}`);
            p.innerText = `${Player[i][1]}: ${Player[i][0].toFixed(2)}`;
        }
    }
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
    p.textContent = text;

    menuItem.addEventListener('click', () => {currentMenu = p.textContent});
    menuItem.addEventListener('click', clearMenu);
    menuItem.addEventListener('click', method);

    menuItem.append(p);
    DOM.gameMenu.append(menuItem);
}

export function createGameMenu(){
    insertMenuItem("Construction", createConstructionMenu);
    insertMenuItem("Research", createResearchMenu);
}

export function updateGameMenu(){

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
            insertButton(research, Player.purchaseTechnology.bind(research));
        }
    }
    updateResearchMenu();
}

function updateResearchConditions(){
    for(let count = 0; count < Techs.researchArray.length; count++){
        let research = Techs.researchArray[count];
        let costCounter = 0;
        for(let i in research.cost){
            if(research.cost[i][0] * 0.35 <= Player[i][0]){
                costCounter++;
            }
        }
        let p = document.getElementById(research.name);
        if(costCounter == Object.keys(research.cost).length && research.unlocked == true && p == null){
            research.display = true;
            createResearchMenu();
        }
    }
}

function updateResearchMenu(){
    if(currentMenu == "Research" && researchCheck == false){
        researchCheck = true;
        constructionCheck = false;
        setInterval(updateResearchConditions, timeInterval);
    }
}
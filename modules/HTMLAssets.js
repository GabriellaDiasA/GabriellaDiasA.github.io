import * as DOM from './HTMLElementsConst.js';
import { Building, Cost } from './Classes.js';
import * as Buildings from './Buildings.js';
import { Player } from './Player.js';
import { timeInterval, yOffset } from './constants.js'

function itemButton(object){
    let buttonContainer = document.createElement('div');
    let button = document.createElement('div');
    let p = document.createElement('p');

    buttonContainer.setAttribute("class", "itemSpace");
    button.setAttribute("class", "item");
    p.setAttribute("id", `${object.name}`);
    p.textContent = `${object.name}: ${object.stk}`;

    button.append(p);
    buttonContainer.append(button);

    return buttonContainer;
}

function infoDivIn(object, parent, event){
    let y = event.target.offsetTop;
    let x = event.target.offsetLeft + event.target.offsetWidth + 10;
    let infoDiv = document.createElement('div');

    infoDiv.setAttribute("id", "infoDiv");
    infoDiv.style.top = y.toString() + "px";
    infoDiv.style.left = x.toString() + "px";

    for(let i in object.cost){
        let p = document.createElement('p');
        p.setAttribute("id", "infoText");
        p.textContent = `${object.cost[i][1]}: ${object.cost[i][0]}`;
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
    newButton.childNodes[0].addEventListener('mouseenter', (event) => infoDivIn(object, newButton, event));
    newButton.childNodes[0].addEventListener('mouseleave', (event) => infoDivOut());
    DOM.gameButtonsDiv.append(newButton);
}

export function createButtonMenu(count){
    if(count == undefined) count = 0;
    for(count; count < Buildings.buildingArray.length; count++){
        let costCounter = 0;
        for(let i in Buildings.buildingArray[count].cost){
            if(Buildings.buildingArray[count].cost[i][0] * 0.35 <= Player[i][0]){
                costCounter++;
            }
        }
        if(costCounter == Object.keys(Buildings.buildingArray[count].cost).length){
            insertButton(Buildings.buildingArray[count], Player.purchaseBuilding.bind(Buildings.buildingArray[count]));
        }
    }
}

function updateBuildingConditions(){
    let count = DOM.gameButtonsDiv.childElementCount;
    for(count; count < Buildings.buildingArray.length; count++){
        let costCounter = 0;
        for(let i in Buildings.buildingArray[count].cost){
            if(Buildings.buildingArray[count].cost[i][0] * 0.35 <= Player[i][0]){
                costCounter++;
            }
        }
        if(costCounter == Object.keys(Buildings.buildingArray[count].cost).length){
            createButtonMenu(count);
        }
    }
}

export function updateButtonsMenu(){
     setInterval(updateBuildingConditions, timeInterval);
}

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
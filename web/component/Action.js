import { HTMLWrapper } from './Wrapper.js';
import * as DOM from '../config/constants.js';

export class ActionHTML extends HTMLWrapper{
    constructor(item){
        super(item);
        this.display = document.getElementById("playerActions");

        this.configure();
        this.append();
    }

    configure(){
        super.configure(this.constructor.name);
        this.title = createTitle();
        this.button.addEventListener("click", this.itemReference.action);
    }

    append(){
        super.append();
        this.button.append(this.text);
        this.buttonContainer.append(this.button);
        this.display.append(this.buttonContainer);
        if (!document.getElementById(this.display.id)) {
            DOM.gameButtons.append(this.title);
            return;
        }
        if (!document.getElementById(`${this.constructor.name}DisplayTitle`)) {
            DOM.gameButtons.insertBefore(this.title, this.display);
            return;
        }
    }
}

function createTitle() {
    let title = document.createElement('h3');
    title.setAttribute("class", "displayTitle");
    title.setAttribute("id", `ActionHTMLDisplayTitle`);
    title.textContent = "Actions";
    return title;
}
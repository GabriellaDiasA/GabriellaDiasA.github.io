import { HTMLWrapper } from './Wrapper.js';

export class ActionHTML extends HTMLWrapper{
    constructor(item){
        super(item);
        this.actionsDisplay = document.getElementById("playerActions");

        this.configure();
        this.append();
    }

    configure(){
        super.configure("Action");
        this.button.addEventListener("click", this.itemReference.action);
    }

    append(){
        super.append();
        this.button.append(this.text);
        this.buttonContainer.append(this.button);
        this.actionsDisplay.append(this.buttonContainer);
    }
}
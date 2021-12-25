import { InfoDisplay } from "./InfoDisplay.js";

export class HTMLWrapper{
    constructor(item){
        this.itemReference = item;
        this.label = item.label;
        this.list;
        this.display;
        this.buttonContainer = document.createElement('div');
        this.button = document.createElement('div');
        this.text = document.createElement('p');
    }

    append(){

    }

    configure(name){
        this.text.textContent = this.label;
        this.buttonContainer.setAttribute("class", "itemSpace");
        this.buttonContainer.setAttribute("id", this.label);
        this.button.setAttribute("class", "item");
        this.button.classList.add(name)
        this.addInfoDisplayListeners(name)
    }

    addInfoDisplayListeners(name){
        this.button.addEventListener("mouseenter", e => new InfoDisplay(this.itemReference, this.button, name, e));
        this.button.addEventListener("mouseleave", () => this.removeInfoDisplay(name))
    }

    removeInfoDisplay(name){
        let infoDisplay = document.getElementById(`${name}InfoDisplay`);
        if (infoDisplay) infoDisplay.remove();
    }
}
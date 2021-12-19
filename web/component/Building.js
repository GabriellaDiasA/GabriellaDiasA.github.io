import * as DOM from '../config/constants.js'
import { HTMLWrapper } from './Wrapper.js';

export class BuildingHTML extends HTMLWrapper{
    constructor(item){
        super(item);
        this.buttonContainer = document.createElement('div');
        this.button = document.createElement('div');

        this.configure();
        this.append();
    }

    configure(){
        super.configure();
        this.buttonContainer.setAttribute("class", "itemSpace");
        this.button.setAttribute("class", "item");
    }

    append(){
        super.append();
        this.button.append(this.text);
        this.buttonContainer.append(this.button);
        DOM.gameButtons.append(this.buttonContainer);
    }
}
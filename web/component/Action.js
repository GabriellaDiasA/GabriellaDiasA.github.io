import * as DOM from '../config/constants.js'
import { HTMLWrapper } from './Wrapper.js';
import * as Content from '../../lib/config/contents.js';

export class ActionHTML extends HTMLWrapper{
    constructor(item){
        super(item);
        this.buttonContainer = document.createElement('div');
        this.button = document.createElement('div');
        this.actionReference = item.reference;

        this.configure();
        this.append();
    }

    configure(){
        super.configure();
        this.buttonContainer.setAttribute("class", "itemSpace");
        this.button.setAttribute("class", "item");
        this.button.addEventListener("click", Content.actionMap[this.actionReference])
    }

    append(){
        super.append();
        this.button.append(this.text);
        this.buttonContainer.append(this.button);
        DOM.gameButtons.append(this.buttonContainer);
    }
}
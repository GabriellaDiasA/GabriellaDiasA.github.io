import * as DOM from '../config/constants.js';
import { HTMLWrapper } from './Wrapper.js';

export class MenuHTML extends HTMLWrapper{
    constructor(item){
        super(item);
        this.menuItem = document.createElement('div');

        this.configure();
        this.append();
    }

    configure(){
        super.configure();
        this.menuItem.setAttribute("class", "gameMenuItem");
        this.text.setAttribute("id", this.label);
    }

    append(){
        super.append();
        this.menuItem.append(this.text);
        DOM.gameMenu.append(this.menuItem);
    }
}
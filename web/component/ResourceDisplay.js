import * as DOM from '../config/constants.js'
import { GridCell } from './GridCell.js';
import { HTMLWrapper } from './Wrapper.js';

export class ResourceDisplayHTML extends HTMLWrapper{
    constructor(item){
        super(item);
        this.gridContainer = document.createElement('div');
        this.configure();

        new GridCell({title: "label", parent: this.gridContainer, parentLabel: this.label});
        new GridCell({title: "amount", parent: this.gridContainer, parentLabel: this.label});
        new GridCell({title: "limit", parent: this.gridContainer, parentLabel: this.label});
        new GridCell({title: "rate", parent: this.gridContainer, parentLabel: this.label});

        this.append();
    }

    configure(){
        super.configure();
        this.gridContainer.setAttribute("class", "gridContainer");
        this.gridContainer.setAttribute("id", `${this.label.toLowerCase()}GridContainer`);
    }

    append(){
        super.append();
        DOM.baseResourceDisplay.append(this.gridContainer);
    }
}
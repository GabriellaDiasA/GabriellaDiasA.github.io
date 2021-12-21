import * as DOM from '../config/constants.js'
import { GridCell } from './GridCell.js';
import { HTMLWrapper } from './Wrapper.js';

export class ResourceDisplayHTML extends HTMLWrapper {
    constructor(item) {
        super(item);
        this.gridContainer = document.createElement('div');
        this.itemReference = item
        this.configure();

        new GridCell({ label: "label", parent: this.gridContainer, parentLabel: this.label });
        new GridCell({ label: "amount", parent: this.gridContainer, parentLabel: this.label });
        new GridCell({ label: "limit", parent: this.gridContainer, parentLabel: this.label });
        new GridCell({ label: "rate", parent: this.gridContainer, parentLabel: this.label });

        this.append();
    }

    configure() {
        super.configure();
        this.gridContainer.setAttribute("class", "gridContainer");
        this.gridContainer.setAttribute("id", `${this.itemReference.label}`);
    }

    append() {
        super.append();
        DOM.baseResourceDisplay.append(this.gridContainer);
    }
}
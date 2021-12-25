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
        switch (this.itemReference.type) {
            case 'extraction':
                this.configureAndAppendTitle(DOM.extractionResourceDisplay)
                break;
            case 'conversion':
                this.configureAndAppendTitle(DOM.conversionResourceDisplay)
                break;
            case 'data':
                this.configureAndAppendTitle(DOM.dataResourceDisplay)
            default:
                break;
        }
    }

    configureAndAppendTitle(DOMElement) {
        let title = document.createElement('h3');
        title.setAttribute("id", `${this.itemReference.type}Title`);
        title.textContent = `${capitalizeFirstLetter(this.itemReference.type)}:`;
        if (!document.getElementById(`${this.itemReference.type}Title`)) {
            DOMElement.append(title)
        }
        DOMElement.append(this.gridContainer);
    }
}

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.substring(1);
}
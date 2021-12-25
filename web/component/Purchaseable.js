import { HTMLWrapper } from "./Wrapper.js";
import { Player } from '../../lib/model/player/player.js'
import * as DOM from '../config/constants.js';

export class PurchaseableHTML extends HTMLWrapper {
    constructor(item) {
        super(item);
        this.purchaseable;
        this.listener = () => Player.purchase(this.itemReference);
        this.title;
    }

    configure(name) {
        super.configure(name);
        this.title = createTitle(name);
        this.purchaseable = Object.entries(this.list).find(purchaseable => purchaseable[1].label == this.label)[0];
        this.button.addEventListener("click", this.listener);
        this.text.textContent = `${this.label}: ${this.list[this.purchaseable]["amount"]}`;
        this.display.classList.add("purchaseableSpace");
    }

    update() {
        setInterval(() => {
            this.text.textContent = `${this.label}: ${this.list[this.purchaseable]["amount"]}`;
        }, DOM.screenTick)
    }

    append() {
        super.append();
        this.button.prepend(this.text);
        this.buttonContainer.prepend(this.button);
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

function createTitle(name) {
    let title = document.createElement('h3');
    title.setAttribute("class", "displayTitle");
    title.setAttribute("id", `${name}DisplayTitle`);
    switch (name) {
        case 'BuildingHTML':
            title.textContent = "Resource Extraction";
            break;
        case 'MachineHTML':
            title.textContent = "Resource Conversion";
            break;
        case 'StorageHTML':
            title.textContent = "Storage";
            break;
        case 'DataHTML':
            title.textContent = "Data Processing Units";
            break;
        case 'EnergyHTML':
            title.textContent = "Energy Production";
            break;
        case 'InfrastructureHTML':
            title.textContent = "Infrastructure";
            break;
        default:
            title.textContent = null;
            break;
    }

    return title;
}
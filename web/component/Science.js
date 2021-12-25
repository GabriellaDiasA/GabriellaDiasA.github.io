import { HTMLWrapper } from "./Wrapper.js";
import { Player } from '../../lib/model/player/player.js';
import { scienceList } from '../../lib/config/contents.js';
import * as DOM from '../config/constants.js'
import { InfoDisplay } from "./InfoDisplay.js";

export class ScienceHTML extends HTMLWrapper {
    constructor(item) {
        super(item);
        this.science = Object.entries(scienceList).find(science => science[1].label == this.label)

        this.configure();
        this.append();
    }

    configure() {
        super.configure(this.constructor.name);
        if (this.science[1].purchased) { this.setPurchased() }
        this.button.addEventListener("click", () => {
            if (Player.purchase(this.itemReference)) { this.setPurchased(); }
        })
    }

    append() {
        super.append();
        this.button.append(this.text);
        this.buttonContainer.append(this.button);
        DOM.gameButtons.append(this.buttonContainer);
    }

    setPurchased() {
        this.button.classList.add("purchased");
    }
}
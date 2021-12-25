import { techList } from "../../lib/config/contents.js";
import { HTMLWrapper } from "./Wrapper.js";
import * as DOM from '../config/constants.js'
import { Player } from "../../lib/model/player/player.js";

export class TechHTML extends HTMLWrapper {
    constructor(item) {
        super(item);
        this.tech = Object.entries(techList).find(tech => tech[1].label == this.label)

        this.configure();
        this.append();
    }

    configure() {
        super.configure(this.constructor.name);
        if (this.tech[1].purchased) { this.setPurchased() }
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
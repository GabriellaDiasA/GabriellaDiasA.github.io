import { Player } from "../../lib/model/player/player.js";
import { playerStorage } from "../../lib/model/player/storage.js";
import { HTMLWrapper } from "./Wrapper.js";
import * as DOM from "../config/constants.js";

export class StorageHTML extends HTMLWrapper{
    constructor(item){
        super(item);
        this.storage = Object.entries(playerStorage).find(storage => storage[1].label == this.label)[0];

        this.configure();
        this.update();
        this.append();
    }

    configure() {
        super.configure("Storage");
        this.button.addEventListener("click", () => Player.purchase(this.itemReference) );
        this.text.textContent = `${this.label}: ${playerStorage[this.storage]["amount"]}`;
    }

    update() {
        setInterval(() => {
            this.text.textContent = `${this.label}: ${playerStorage[this.storage]["amount"]}`;
        }, DOM.screenTick)
    }

    append() {
        super.append();
        this.button.append(this.text);
        this.buttonContainer.append(this.button);
        DOM.gameButtons.append(this.buttonContainer);
    }
}
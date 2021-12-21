import { HTMLWrapper } from './Wrapper.js';
import { Player } from '../../lib/model/player/player.js';
import { playerBuildings } from '../../lib/model/player/buildings.js';
import * as DOM from '../config/constants.js';

export class BuildingHTML extends HTMLWrapper {
    constructor(item) {
        super(item);
        this.buildingsDisplay = document.getElementById("playerBuildings");
        this.building = Object.entries(playerBuildings).find(building => building[1].label == this.label)[0];

        this.configure();
        this.update();
        this.append();
    }

    configure() {
        super.configure("Building");
        this.button.addEventListener("click", () => Player.purchase(this.itemReference));
        this.text.textContent = `${this.label}: ${playerBuildings[this.building]["amount"]}`;
    }

    update() {
        setInterval(() => {
            this.text.textContent = `${this.label}: ${playerBuildings[this.building]["amount"]}`;
        }, DOM.screenTick)
    }

    append() {
        super.append();
        this.button.append(this.text);
        this.buttonContainer.append(this.button);
        this.buildingsDisplay.append(this.buttonContainer);
    }
}
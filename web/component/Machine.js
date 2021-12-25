import { PurchaseableHTML } from "./Purchaseable.js";
import { playerMachines } from "../../lib/model/player/machines.js";
import { Player } from "../../lib/model/player/player.js";
import * as DOM from '../config/constants.js'

export class MachineHTML extends PurchaseableHTML {
    constructor(item) {
        super(item);
        this.toggle = document.createElement('div');
        this.switchOn = document.createElement('p');
        this.switchOff = document.createElement('p');
        this.hasMachineListeners;

        this.configure();
        this.update();
        this.append();
    }

    configure(name = this.constructor.name, display = document.getElementById("playerMachines"), list = playerMachines) {
        this.toggle.classList.add("switchDiv");
        this.switchOn.classList.add("switchOn");
        !this.hasMachineListeners && this.switchOn.addEventListener("click", () => Player.switchOn(this.itemReference));
        this.switchOn.textContent = "+"
        this.switchOff.classList.add("switchOff");
        !this.hasMachineListeners && this.switchOff.addEventListener("click", () => Player.switchOff(this.itemReference));
        this.switchOff.textContent = "-"
        this.display = display;
        this.list = list;
        this.hasMachineListeners = true;
        super.configure(name);
    }

    update() {
        setInterval(() => {
            this.text.textContent = `${this.label}: ${this.list[this.purchaseable]["amount"]}/${this.list[this.purchaseable]["limit"]}`;
        }, DOM.screenTick)
    }

    append() {
        this.buttonContainer.append(this.toggle);
        this.toggle.append(this.switchOn);
        this.toggle.append(this.switchOff);
        super.append();
    }
}
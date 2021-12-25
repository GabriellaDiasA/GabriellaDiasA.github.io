import { Building } from "./building.js";
import { availableEnergy } from "./player/energy.js";

export class Machine extends Building {
    constructor(props) {
        super(props)
        this.limit = props.amount;
        this.value = props.value || 0;
    }

    switchOn = () => {
        if (this.playerReference.amount < this.playerReference.limit && availableEnergy.amount >= this.value) {
            this.playerReference.amount++;
        }
    }

    switchOff = () => {
        if (this.playerReference.amount > 0) {
            this.playerReference.amount--;
        }
    }

    purchaseRoutine = () => {
        this.updateCosts();
    }
}
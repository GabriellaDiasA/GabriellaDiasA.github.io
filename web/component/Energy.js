import { PurchaseableHTML } from "./Purchaseable.js";
import { playerEnergy } from '../../lib/model/player/energy.js';

export class EnergyHTML extends PurchaseableHTML {
    constructor(item) {
        super(item);

        this.configure();
        this.update();
        this.append();
    }

    configure() {
        this.display = document.getElementById("playerEnergy");
        this.list = playerEnergy;
        super.configure(this.constructor.name);
    }

    update() {
        super.update();
    }

    append() {
        super.append();
    }
}
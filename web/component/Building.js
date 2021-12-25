import { playerBuildings } from '../../lib/model/player/buildings.js';
import * as DOM from '../config/constants.js';
import { PurchaseableHTML } from './Purchaseable.js';

export class BuildingHTML extends PurchaseableHTML {
    constructor(item) {
        super(item);

        this.configure();
        this.update();
        this.append();
    }

    configure() {
        this.display = document.getElementById("playerBuildings");
        this.list = playerBuildings
        super.configure(this.constructor.name);
    }

    update() {
        super.update();
    }

    append() {
        super.append();
    }
}
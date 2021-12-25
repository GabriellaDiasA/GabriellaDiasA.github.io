import { playerInfrastructure } from "../../lib/model/player/infrastructure.js";
import { PurchaseableHTML } from "./Purchaseable.js";

export class InfrastructureHTML extends PurchaseableHTML{
    constructor(item){
        super(item);

        this.configure();
        this.update();
        this.append();
    }

    configure() {
        this.display = document.getElementById("playerInfrastructure");
        this.list = playerInfrastructure
        super.configure(this.constructor.name);
    }

    update() {
        super.update();
    }

    append() {
        super.append();
    }
}
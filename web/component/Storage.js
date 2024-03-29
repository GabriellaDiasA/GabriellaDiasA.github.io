import { playerStorage } from "../../lib/model/player/storage.js";
import { PurchaseableHTML } from "./Purchaseable.js";

export class StorageHTML extends PurchaseableHTML{
    constructor(item){
        super(item);

        this.configure();
        this.update();
        this.append();
    }

    configure() {
        this.display = document.getElementById("playerStorage");
        this.list = playerStorage;
        super.configure(this.constructor.name);
    }

    update() {
        super.update();
    }

    append() {
        super.append();
    }
}
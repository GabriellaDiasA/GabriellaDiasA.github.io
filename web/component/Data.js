import { playerDPUs } from "../../lib/model/player/dpus.js";
import { MachineHTML } from "./Machine.js";

export class DataHTML extends MachineHTML{
    constructor(item){
        super(item);

        this.configure();
        this.update();
        this.append();
    }

    configure() {
        this.display = document.getElementById("playerDPUs");
        this.list = playerDPUs;
        super.configure(this.constructor.name, this.display, this.list);
    }

    update() {
        super.update();
    }

    append() {
        super.append();
    }
}
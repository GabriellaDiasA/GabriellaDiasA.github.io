import { Building } from "./building";

export class Machine extends Building{
    constructor(props){
        super(props)
        this.limit = props.amount;
    }

    turnOff = () => {
        if (this.amount = 0) return;
        this.amount--;
    }

    turnOn = () => {
        if (this.amount = this.limit) return;
        this.amount++;
    }
}
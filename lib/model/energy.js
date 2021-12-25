import { Building } from "./building.js";

export class Energy extends Building{
    constructor(props) {
        super(props);
        this.value = props.value;
    }
}
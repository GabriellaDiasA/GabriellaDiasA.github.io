import * as SciChange from '../config/scienceChanges.js';

export class Science {
    constructor({
        label: label,
        price: price,
        render: render = false,
        info: info = null,
        flavor: flavor = null
        }) {
        this.label = label;
        this.price = price;
        this.render = render;
        this.changes = scienceMap[this.label];
        this.purchased = false;
        this.info = info;
        this.flavor = flavor;
    }

    purchase_routine = () => {
        this.execute_changes();
    }

    execute_changes() {
        for (let i in this.changes) { this.changes[i](); }
    }
}

var scienceMap = {
    "Digging": [SciChange.digging],
    "Mining": [SciChange.mining],
    "Workshop": [SciChange.workshop],
    "Better Drones": [SciChange.betterDrones]
}
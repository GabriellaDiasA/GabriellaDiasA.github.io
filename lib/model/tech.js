import * as TechChange from '../config/techChanges.js';

export class Tech {
    constructor({ label: label, price: price, render: render = false, info: info = null, flavor: flavor = null }) {
        this.label = label;
        this.price = price;
        this.render = render;
        this.changes = techMap[this.label];
        this.info = info;
        this.flavor = flavor;
    }

    purchase_routine = () => {
        this.execute_changes();
    }

    execute_changes() {
        for(let i in this.changes) { this.changes[i](); }
    }
}

var techMap = {
    "Better Drills": [TechChange.betterDrills]
}
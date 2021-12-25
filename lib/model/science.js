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

    purchaseRoutine = () => {
        this.executeChanges();
    }

    executeChanges() {
        for (let i in this.changes) { this.changes[i](); }
    }
}

var scienceMap = {
    "Physics": [SciChange.physics],
    "Circuitry": [SciChange.circuitry],
    "Tinkering": [SciChange.tinkering],
    "Mining": [SciChange.mining],
    "Metallurgy": [SciChange.metallurgy]
}
let typeMap = {
    "Scrap": "extraction",
    "Iron Ore": "extraction",
    "Copper Ore": "extraction"
}

export function resourceListFactory(opts = {}) {
    let scrap = opts.scrap || new Resource({ label: "Scrap", render: true });
    let ironOre = opts.ironOre || new Resource({ label: "Iron Ore", render: true });
    let copperOre = opts.copperOre || new Resource({ label: "Copper Ore" });

    return {
        scrap: scrap,
        ironOre: ironOre,
        copperOre: copperOre
    }
}

export class Resource {
    constructor({ label: label, amount: amount = 0, limit: limit = 0, rate: rate = 0, render: render = false }) {
        this.label = label;
        this.amount = amount;
        this.limit = limit;
        this.rate = rate;
        this.render = render;
        this.type = typeMap[this.label];
    }
}
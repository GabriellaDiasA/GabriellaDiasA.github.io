let typeMap = {
    "Scrap": "extraction",
    "Iron Ore": "extraction",
    "Copper Ore": "extraction",

    "Iron": "conversion",
    "Copper": "conversion",

    "Bit": "data",
    "Byte": "data"
}

let limitedTypes = [
    "extraction",
    "conversion"
]

export function resourceListFactory(opts = {}) {
    let scrap = new Resource({ label: "Scrap", render: true, limit: 2000, amount: opts.scrap });
    let ironOre = new Resource({ label: "Iron Ore", limit: 1000, amount: opts.ironOre });
    let copperOre = new Resource({ label: "Copper Ore", limit: 500, amount: opts.copperOre });

    let iron = new Resource({ label: "Iron", limit: 10, amount: opts.iron });
    let copper = new Resource({ label: "Copper", limit: 10, amount: opts.copper });

    let bit = new Resource({ label: "Bit", amount: opts.bit });
    let byte = new Resource({ label: "Byte", amount: opts.byte });

    return {
        scrap: scrap,
        ironOre: ironOre,
        copperOre: copperOre,

        iron: iron,
        copper: copper,

        bit: bit,
        byte: byte
    }
}

export class Resource {
    constructor({ label: label, amount: amount = 0, limit: limit = 0, rate: rate = 0, render: render = false }) {
        this.label = label;
        this.type = typeMap[this.label];
        this.amount = amount;
        this.limit = (limitedTypes.includes(this.type) ? limit : Infinity)
        this.rate = rate;
        this.render = render;
    }
}
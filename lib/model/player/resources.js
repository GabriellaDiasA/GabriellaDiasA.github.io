import { Resource, resourceListFactory } from "../resource.js";

// Only add if you want nonzero specific limits. The factory should take care of the rest.
export let playerResources = resourceListFactory(
    {
        scrap: new Resource({ label: "Scrap", limit: 500, amount: 500 }),
        ironOre: new Resource({ label: "Iron Ore", limit: 100, amount: 0 }),
        copperOre: new Resource({ label: "Copper Ore", limit: 80, amount: 0 })
    }
);
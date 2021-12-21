import { Resource, resourceListFactory } from "../resource.js";

export let playerResources = resourceListFactory(
    {
        scrap: new Resource({ label: "Scrap", limit: 500, amount: 500 }),
        ironOre: new Resource({ label: "Iron Ore", limit: 100, amount: 2 })
    }
);
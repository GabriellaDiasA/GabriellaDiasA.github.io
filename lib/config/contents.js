import { Action } from '../model/action.js'
import { Building } from '../model/building.js'
import { Resource, resourceListFactory } from '../model/resource.js'
import { Science } from '../model/science.js'
import { Storage } from '../model/storage.js'
import { Tech } from '../model/tech.js'

export const playerActionList = {
    scavengeWasteland: new Action({
        label: "Scavenge Wasteland",
        render: true,
        info: "Brave the wasteland and return with some scrap metal.",
        flavor: "Use sunscreen."
    })
}

export const menuList = {
    outpost: { label: "Outpost", render: true },
    science: { label: "Science", render: true },
    tech: { label: "Tech", render: false },
    storage: { label: "Storage", render: false }
}

export const resourceList = resourceListFactory()

export const buildingList = {
    scavengerDrone: new Building({
        label: "Scavenger Drone",
        render: true,
        price: resourceListFactory({ scrap: new Resource({ label: "Scrap", amount: 10 }) }),
        priceRate: 1.1,
        production: resourceListFactory({ scrap: new Resource({ label: "Scrap", amount: 0.05 }) }),
        flavor: "Not as cute as Wall-E."
    }),
    minerDrone: new Building({
        label: "Miner Drone",
        price: resourceListFactory({ scrap: new Resource({ label: "Scrap", amount: 100 }) }),
        priceRate: 1.1,
        production: resourceListFactory({ ironOre: new Resource({ label: "Iron Ore", amount: 0.01 }) }),
        flavor: "Could be modded to bring you coffee. If you had any coffee."
    })
}

export const scienceList = {
    digging: new Science({
        label: "Digging",
        render: true,
        price: resourceListFactory({ scrap: new Resource({ label: "Scrap", amount: 1 }) }),
        info: "Unlocks the first few important research options and better storage options.",
        flavor: "The Dwarves dug too greedily and too deep."
    }),
    workshop: new Science({
        label: "Workshop",
        price: resourceListFactory({ scrap: new Resource({ label: "Scrap", amount: 50 }) }),
        info: "Unlocks the tech tab, which allows access to powerful upgrades.",
        flavor: "I though I just needed some wooden planks to make this."
    }),
    mining: new Science({
        label: "Mining",
        price: resourceListFactory({ scrap: new Resource({ label: "Scrap", amount: 1000 }) }),
        info: "Allows the extraction of more precious ore.",
        flavor: "You know what they awoke in the darkness of Khazad-dûm."
    }),
    betterDrones: new Science({
        label: "Better Drones",
        render: true,
        price: resourceListFactory({ scrap: new Resource({ label: "Scrap", amount: 1 }) }),
        info: "Upgrades your Scavenger Drones. Beware: You will lose all of your current Scavenger Drones.",
        flavor: "Why do you lose your drones? Discovering these upgrades requires many, many sacrifices."
    })
}

export const storageList = {
    pit: new Storage({
        label: "Pit",
        price: resourceListFactory({ scrap: new Resource({ label: "Scrap", amount: 100 }) }),
        capacity: resourceListFactory({
            scrap: new Resource({ label: "Scrap", amount: 100 }),
            ironOre: new Resource({ label: "Iron Ore", amount: 70 }),
            copperOre: new Resource({ label: "Copper Ore", amount: 50 })
        }),
        flavor: "I guess you can just throw it in there..."
    })
}

export const techList = {
    betterDrills: new Tech({
        label: "Better Drills",
        price: resourceListFactory({
            scrap: new Resource({ label: "Scrap", amount: 100 }),
            ironOre: new Resource({ label: "Iron Ore", amount: 200 })
        }),
        render: true,
        info: "Increases the resource extraction capabilities of your basic drones.",
        flavor: "Made out of better pieces of metal and better dirt!"
    })
}
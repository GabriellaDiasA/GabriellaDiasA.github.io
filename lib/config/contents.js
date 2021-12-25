import { Action } from '../model/action.js'
import { Building } from '../model/building.js'
import { DPU } from '../model/dpu.js'
import { Machine } from '../model/machine.js'
import { resourceListFactory } from '../model/resource.js'
import { Science } from '../model/science.js'
import { Storage } from '../model/storage.js'
import { Energy } from '../model/energy.js'
import { Tech } from '../model/tech.js'
import { Infrastructure } from '../model/infrastructure.js'

export const playerActionList = {
    scavengeWasteland: new Action({
        label: "Scavenge Wasteland",
        render: true,
        info: "Brave the wasteland and return with some scrap metal.",
        flavor: "Wear sunscreen."
    }),
    mineIronOre: new Action({
        label: "Mine Iron Ore",
        info: "Join your drones in the depths.",
        flavor: "Got our pick axe swinging from side to side."
    })
}

export const menuList = {
    outpost: { label: "Outpost", render: true },
    science: { label: "Science", render: true },
    energy: { label: "Energy", render: false },
    data: { label: "Data", render: false },
    workshop: { label: "Workshop", render: false },
    tech: { label: "Tech", render: false },
}

export const resourceList = resourceListFactory()

export const energyList = {
    solarPanel: new Energy({
        label: "Solar Panel",
        price: resourceListFactory({ scrap: 100 }),
        priceRate: 1.8,
        value: 1
    })
}

export const buildingList = {
    scavengerDrone: new Building({
        label: "Scavenger Drone",
        price: resourceListFactory({ scrap: 10 }),
        priceRate: 1.1,
        production: resourceListFactory({ scrap: 0.01 }),
        flavor: "Not as cute as Wall-E."
    }),
    minerDrone: new Building({
        label: "Miner Drone",
        price: resourceListFactory({ scrap: 25 }),
        priceRate: 1.1,
        production: resourceListFactory({ ironOre: 0.01 }),
        flavor: "Could be modded to bring you coffee. If you had any coffee."
    }),
}

export const machineList = {
    smelter: new Machine({
        label: "Smelter",
        price: resourceListFactory({
            scrap: 1,
            ironOre: 1
        }),
        priceRate: 1.2,
        production: resourceListFactory({
            ironOre: -0.1,
            iron: 0.01
        })
    }),
    electrolyzer: new Machine({
        label: "Electrolyzer",
        price: resourceListFactory({
            scrap: 500,
            iron: 10
        }),
        priceRate: 1.2,
        production: resourceListFactory({
            iron: 0.05,
            copper: 0.05
        })
    })
}

export const dataProcessingList = {
    crudeProcessor: new DPU({
        label: "Crude Processor",
        price: resourceListFactory({ scrap: 1 }),
        priceRate: 1.3,
        production: resourceListFactory({ bit: 0.01 }),
        value: 1,
        flavor: "It's all grimy and dirty. Nice."
    })
}

export const infrastructureList = {
    droneTower: new Infrastructure({
        label: "Drone Tower",
        price: resourceListFactory({ scrap: 1000, iron: 30 }),
        priceRate: 1.25,
        info: "Boosts your drones' capabilities by +10%.",
        flavor: "You're shorter than I thought."
    })
}

export const scienceList = {
    circuitry: new Science({
        label: "Circuitry",
        render: true,
        price: resourceListFactory({ scrap: 30 }),
        info: "The first steps towards automation and true research.",
    }),
    physics: new Science({
        label: "Physics",
        price: resourceListFactory({ scrap: 250 }),
        info: "Put all this scrap metal to good use."
    }),
    tinkering: new Science({
        label: "Tinkering",
        price: resourceListFactory({ scrap: 500, bit: 150 }),
        info: "Unlocks the tech tab, which allows access to powerful upgrades.",
        flavor: "I though I just needed some wooden planks to make this."
    }),
    mining: new Science({
        label: "Mining",
        price: resourceListFactory({ bit: 500 }),
        info: "Allows the extraction of more precious ore.",
        flavor: "You know what they awoke in the darkness of Khazad-dûm."
    }),
    metallurgy: new Science({
        label: "Metallurgy",
        price: resourceListFactory({ ironOre: 500, copperOre: 500, bit: 5000 }),
        info: "Schematics for basic ore purification and metal production."
    })
}

export const storageList = {
    pit: new Storage({
        label: "Pit",
        price: resourceListFactory({ scrap: 100 }),
        capacity: resourceListFactory({
            scrap: 1000,
            ironOre: 700,
            copperOre: 500
        }),
        flavor: "I guess you can just throw it in there..."
    }),
    warehouse: new Storage({
        label: "Warehouse",
        price: resourceListFactory({
            scrap: 250,
            ironOre: 150
        }),
        capacity: resourceListFactory({
            scrap: 500,
            ironOre: 200,
            copperOre: 150,
            iron: 5,
            copper: 1
        })
    }),
    silo: new Storage({
        label: "Silo",
        price: resourceListFactory({
            iron: 10,
            copper: 8
        }),
        capacity: resourceListFactory({
            ironOre: 4000,
            copperOre: 4000
        })
    })
}

export const techList = {
    digging: new Tech({
        label: "Digging",
        price: resourceListFactory({
            scrap: 150
        }),
        info: "Unlocks... storage?"
    }),
    lighterClutches: new Tech({
        label: "Lighter Clutches",
        price: resourceListFactory({
            scrap: 200,
            bit: 20
        }),
        info: "Your drones move more efficiently."
    }),
    fasterTransistors: new Tech({
        label: "Faster Transistors",
        price: resourceListFactory({
            scrap: 250,
            bit: 250
        }),
        info: "Drones and processing units are more responsive and calculate faster."
    }),
    solarPanelRecycling: new Tech({
        label: "Solar Panel Recycling",
        price: resourceListFactory({
            scrap: 1000
        }),
        info: "Solar panels are cheaper to produce."
    }),
    droneHeatSinks: new Tech({
        label: "Drone Heatsinks",
        price: resourceListFactory({
            scrap: 1000
        }),
        info: "Enables your basic Miner Drones to dig deeper and find more precious ore."
    }),
    betterDrills: new Tech({
        label: "Better Drills",
        price: resourceListFactory({
            scrap: 100,
            ironOre: 200
        }),
        info: "Increases the resource extraction capabilities of your basic drones.",
        flavor: "Made out of better pieces of metal and better dirt!"
    }),
    electrolysis: new Tech({
        label: "Electrolysis",
        price: resourceListFactory({
            scrap: 5000,
            iron: 50
        }),
        info: "Allows for a different method of generating metals."
    }),
    betterDrones: new Tech({
        label: "Better Drones",
        price: resourceListFactory({ scrap: 1 }),
        info: "Upgrades your Scavenger Drones. Beware: You will lose all of your current Scavenger Drones.",
        flavor: "Why do you lose your drones? Discovering these upgrades requires many, many sacrifices."
    })
}
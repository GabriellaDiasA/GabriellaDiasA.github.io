import { playerBuildings } from "./player/buildings.js";
import { Player } from "./player/player.js";
import { Resource, resourceListFactory } from "./resource.js";

export class Building {
    constructor(
        {
            label: label,
            render: render = false,
            price: price = resourceListFactory(),
            priceRate: priceRate = 1.1,
            production: production = resourceListFactory(),
            amount: amount = 0,
            stage: stage = 0,
            flavor: flavor = null
        }) {
        this.label = label;
        this.render = render;
        this.price = price;
        this.priceBase = price;
        this.production = production;
        this.productionBase = production;
        this.priceRate = priceRate;
        this.amount = amount;
        this.stage = stage;
        this.flavor = flavor;
        this.playerReference = findPlayerBuilding(this.label);
    }

    purchaseRoutine = () => {
        this.updateCosts();
    }

    upgradeStage = identifier => {
        this.stage++;
        let props = stages_info[identifier][this.stage];
        Player.upgradeBuilding(this.playerReference, props)

        this.label = props.label;
        this.render = props.render;
        this.price = props.price;
        this.priceBase = props.price;
        this.production = props.production;
        this.productionBase = props.production;
        this.priceRate = props.priceRate;
        this.amount = props.amount;
        this.stage = props.stage;
        this.flavor = props.flavor;
    }

    recalculateCosts = () => {
        Object.entries(this.price).forEach(price => {
            price[1].amount = this.priceBase[price[0]].amount * (this.priceRate ** this.amount)
        })
    }

    updateCosts() {
        Object.entries(this.price).forEach(price => {
            price[1].amount *= this.priceRate;
        })
    }
}

var stages_info = {
    scavengerDrone: {
        1: {
            label: "Scavenger Drone Mk. II",
            render: true,
            price: resourceListFactory({ scrap: new Resource({ label: "Scrap", amount: 1 }) }),
            production: resourceListFactory({ scrap: new Resource({ label: "Scrap", amount: 0.1 }) }),
            priceRate: 1.1,
            stage: 1,
            amount: 0,
            flavor: "Still not as cute as Wall-E."
        },
        2: {
            label: "Scavenger Drone Mk. III",
            render: true,
            price: resourceListFactory({ scrap: new Resource({ label: "Scrap", amount: 1000 }) }),
            priceRate: 1.1,
            stage: 2,
            amount: 0,
            flavor: "Pretty cute."
        }
    },

    minerDrone: {
        1: {
            label: "Miner Drone Mk. II",
            render: true,
            price: resourceListFactory({ scrap: new Resource({ label: "Scrap", amount: 1000 }) }),
            priceRate: 1.1,
            stage: 1,
            amount: 0,
            flavor: "Highly resistent to modding."
        }
    }
}

function findPlayerBuilding(label) {
    return Object.entries(playerBuildings).find(building => building[1].label == label)[1]
}
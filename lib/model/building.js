import { gameTick } from "../config/constants.js";
import { playerBuildings } from "./player/buildings.js";
import { Player } from "./player/player.js";
import { playerResources } from "./player/resources.js";
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
        this.playerReference = find_player_building(this.label);

        this.start_production();
    }

    purchase_routine = () => {
        this.update_costs();
    }

    upgrade_stage = identifier => {
        this.stage++;
        let props = stages_info[identifier][this.stage];
        Player.upgrade_building(this.playerReference, props)

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

    recalculate_costs = () => {
        Object.entries(this.price).forEach(price => {
            price[1].amount = this.priceBase[price[0]].amount * (this.priceRate ** this.amount)
        })
    }

    update_costs() {
        Object.entries(this.price).forEach(price => {
            price[1].amount *= this.priceRate;
        })
    }

    start_production = () => {
        setInterval(() => {
            Object.entries(this.production).forEach(prodResource => {
                let playerResource = playerResources[prodResource[0]];
                let attemptedAmount = playerResource.amount + prodResource[1].amount * this.playerReference.amount;
                if (attemptedAmount < playerResource.limit) {
                    playerResource.amount = attemptedAmount
                } else {
                    playerResource.amount = playerResource.limit;
                }
            })
        }, gameTick)
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

function find_player_building(label) {
    return Object.entries(playerBuildings).find(building => building[1].label == label)[1]
}
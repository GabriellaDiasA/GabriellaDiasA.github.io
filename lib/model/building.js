import { playerBuildings } from "./player/buildings.js";
import { playerDPUs } from "./player/dpus.js";
import { playerEnergy } from "./player/energy.js";
import { playerInfrastructure } from "./player/infrastructure.js";
import { playerMachines } from "./player/machines.js";
import { Player } from "./player/player.js";
import { playerStorage } from "./player/storage.js";
import { resourceListFactory } from "./resource.js";

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
        this.priceBase = clone(Object.entries(price));
        this.production = production;
        this.productionBase = clone(Object.entries(production));
        this.priceRate = priceRate;
        this.amount = amount;
        this.stage = stage;
        this.flavor = flavor;
        this.effect;
        this.bonus = resourceListFactory();
        this.playerReference = findPlayerItem(this.label);
    }

    purchaseRoutine = () => {
        this.updateCosts();
    }

    upgradeStage = identifier => {
        this.stage++;
        let props = stagesInfo[identifier][this.stage];
        Player.upgradeBuilding(this.playerReference, props);
        if (this.stageEffects) { this.stageEffects() };

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

        if (this.effect) { this.effect = effectsMap[this.label][this.stage] };
    }

    recalculateCosts = () => {
        console.log(this.priceBase)
        Object.entries(this.price).forEach(price => {
            let maybeLimit = this.playerReference.limit || this.playerReference.amount
            console.log(this.priceBase[price[0]].amount + " " + this.priceRate + " " + maybeLimit)
            price[1].amount = this.priceBase[price[0]].amount * (this.priceRate ** maybeLimit)
        })
    }

    updateCosts() {
        Object.entries(this.price).forEach(price => {
            price[1].amount *= this.priceRate;
        })
    }
}

var stagesInfo = {
    scavengerDrone: {
        1: {
            label: "Scavenger Drone Mk. II",
            render: true,
            price: resourceListFactory({ scrap: 1 }),
            production: resourceListFactory({ scrap: 0.1 }),
            priceRate: 1.1,
            stage: 1,
            amount: 0,
            flavor: "Still not as cute as Wall-E."
        },
        2: {
            label: "Scavenger Drone Mk. III",
            render: true,
            price: resourceListFactory({ scrap: 1000 }),
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
            price: resourceListFactory({ scrap: 1000 }),
            priceRate: 1.1,
            stage: 1,
            amount: 0,
            flavor: "Highly resistent to modding."
        }
    }
}

var effectsMap;

function findPlayerItem(label) {
    let possibleTargets = [playerBuildings, playerDPUs, playerStorage, playerMachines, playerEnergy, playerInfrastructure]
    let foundItem;

    possibleTargets.forEach(list => {
        let result = maybeFindItem(list, label)

        if (result) {
            foundItem = result;
        }
    })

    return foundItem[1];
}

function maybeFindItem(list, label) {
    return Object.entries(list).find(building => building[1].label == label)
}

// Has something to this effect already been implemented in JS?
// This doesn't handle doubly-nested objects (and so on...)
// but it shouldn't be hard to implement. This is why I love Elixir
function clone(array) {
    let obj = resourceListFactory();
    array.forEach(resource => {
        Object.entries(resource[1]).forEach(property => {
            obj[resource[0]][property[0]] = resource[1][property[0]];
        });
    });
    return obj;
}
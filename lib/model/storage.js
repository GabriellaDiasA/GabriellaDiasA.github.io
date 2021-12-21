import { Player } from "./player/player.js";
import { playerStorage } from "./player/storage.js";

export class Storage {
    constructor({
        label: label,
        render: render = false,
        price: price = resourceListFactory(),
        priceRate: priceRate = 1.15,
        capacity: capacity = resourceListFactory(),
        amount: amount = 0,
        stage: stage = 0,
        flavor: flavor = null
    }) {
        this.label = label;
        this.render = render;
        this.price = price;
        this.priceBase = price;
        this.capacity = capacity;
        this.capacityBase = capacity;
        this.priceRate = priceRate;
        this.amount = amount;
        this.stage = stage;
        this.flavor = flavor;
        this.playerReference = find_player_storage(this.label);
    }

    purchase_routine = () => {
        this.update_costs();
        Player.increase_storage(this.capacity);
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
}

function find_player_storage(label){
    return Object.entries(playerStorage).find(storage => storage[1].label == label)[1]
}
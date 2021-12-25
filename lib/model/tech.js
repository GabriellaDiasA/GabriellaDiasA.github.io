import * as TechChange from '../config/techChanges.js';

export class Tech {
    constructor({ label: label, price: price, render: render = false, info: info = null, flavor: flavor = null }) {
        this.label = label;
        this.price = price;
        this.render = render;
        this.changes = techMap[this.label];
        this.info = info;
        this.flavor = flavor;
        this.purchased = false;
    }

    purchaseRoutine = () => {
        this.executeChanges();
    }

    executeChanges() {
        for(let i in this.changes) { this.changes[i](); }
    }
}

var techMap = {
    "Lighter Clutches": [TechChange.lighterClutches],
    "Faster Transistors": [TechChange.fasterTransistors],
    "Solar Panel Recycling": [TechChange.solarPanelRecycling],
    "Digging": [TechChange.digging],
    "Drone Heatsinks": [TechChange.droneHeatsinks],
    "Better Drills": [TechChange.betterDrills],
    "Electrolysis": [TechChange.electrolysis],
    "Better Drones": [TechChange.betterDrones]
}
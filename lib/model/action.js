import * as PlayerAction from '../config/playerActions.js'

export class Action {
    constructor({ label: label, render: render = false, info: info = null, flavor: flavor = null }) {
        this.label = label;
        this.render = render;
        this.action = actionMap[label];
        this.info = info;
        this.flavor = flavor;
    }
}

var actionMap = {
    "Scavenge Wasteland": PlayerAction.scavengeWasteland,
    "Mine Iron Ore": PlayerAction.mineIronOre,
}
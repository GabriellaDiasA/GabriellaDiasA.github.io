import { HTMLWrapper } from "./Wrapper.js";
import { playerResources } from "../../lib/model/player/resources.js";
import * as DOM from '../config/constants.js'

export class GridCell extends HTMLWrapper {
    constructor(item) {
        super(item);
        this.parent = item.parent;
        this.parentLabel = item.parentLabel;
        this.prefix = "";
        this.suffix = "";
        this.cell = document.createElement('div');
        this.resource = Object.entries(playerResources).find(entry => entry[1].label == this.parentLabel)[0]

        this.configure();
        this.update();
        this.append();
    }

    configure() {
        super.configure();
        this.localConfigure();
    }

    update() {
        setInterval(() => {
            this.localConfigure();
        }, DOM.screenTick * 10)
    }

    append() {
        super.append();
        this.cell.append(this.text);
        this.parent.append(this.cell);
    }

    localConfigure() {
        switch (this.label) {
            case 'limit':
                this.prefix = '/';
                break;
            case 'rate':
                this.prefix = (playerResources[this.resource][this.label] >= 0 ? "+" : "");
                this.suffix = "/s";
                break;
            default:
                this.prefix = '';
                break;
        };

        this.cell.setAttribute("class", `${this.label}Cell`);
        this.cell.setAttribute("id", `${this.label}Cell${this.parentLabel}`);
        let content = playerResources[this.resource][this.label];
        if (this.label == 'rate') content *= 20;
        if (typeof content === 'number' && content !== Infinity) content = content.toFixed(2)
        if (content === Infinity) {
            content = "";
            this.prefix = "";
        }
        this.text.textContent = this.prefix + content + this.suffix;
    }
}
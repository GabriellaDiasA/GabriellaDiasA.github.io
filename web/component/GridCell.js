import { HTMLWrapper } from "./Wrapper.js";
import { playerResources } from "../../lib/model/player/resources.js";
import * as DOM from '../config/constants.js'

export class GridCell extends HTMLWrapper{
    constructor(item){
        super(item);
        this.parent = item.parent;
        this.parentLabel = item.parentLabel;
        this.cell = document.createElement('div');
        this.resource = Object.entries(playerResources).find(entry => entry[1].label == this.parentLabel)[0]

        switch (this.label) {
            case 'limit':
                this.prefix = '/';
                break;
            default:
                this.prefix = '';
                break;
        };

        this.configure();
        this.update();
        this.append();
    }

    configure(){
        super.configure();
        this.cell.setAttribute("class", `${this.label}Cell`);
        this.cell.setAttribute("id", `${this.label}Cell${this.parentLabel}`);
        let content = playerResources[this.resource][this.label];
        if (typeof content === 'number') {
            content = content.toFixed(2)
        }
        this.text.textContent = this.prefix + content
    }

    update(){
        setInterval(() => {
            let content = playerResources[this.resource][this.label];
            if (typeof content === 'number') {
                content = content.toFixed(2)
            }
            this.text.textContent = this.prefix + content
        }, DOM.screenTick * 10)
    }

    append(){
        super.append();
        this.cell.append(this.text);
        this.parent.append(this.cell);
    }
}
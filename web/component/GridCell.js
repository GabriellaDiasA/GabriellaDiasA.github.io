import { HTMLWrapper } from "./Wrapper.js";
import { playerBaseResources } from "../../lib/model/player/resources.js";

export class GridCell extends HTMLWrapper{
    constructor(item){
        super(item);
        this.parent = item.parent;
        this.parentLabel = item.parentLabel;
        this.cell = document.createElement('div');
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
        this.text.textContent = this.prefix + playerBaseResources[this.parentLabel.toLowerCase()][this.label]
    }

    update(){
        setInterval(() => {
            this.text.textContent = this.prefix + playerBaseResources[this.parentLabel.toLowerCase()][this.label]
        }, 100)
    }

    append(){
        super.append();
        this.cell.append(this.text);
        this.parent.append(this.cell);
    }
}
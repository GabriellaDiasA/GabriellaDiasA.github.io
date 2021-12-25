import { resourceList } from '../../lib/config/contents.js';
import { playerResources } from '../../lib/model/player/resources.js';
import * as DOM from '../config/constants.js'

export class InfoDisplay {
    constructor(item, element, type, event) {
        this.itemReference = item;
        this.referredElement = element;
        this.type = type;
        this.event = event;
        this.infoCard = document.createElement('div');
        this.pos;
        this.listener;

        this.maybeConfigure();
        this.update();
        this.append();
    }

    maybeConfigure() {
        this.pos = {
            x: this.referredElement.offsetLeft + this.referredElement.offsetWidth + 10,
            y: this.event.y
        }
        this.infoCard.setAttribute("id", `${this.type}InfoDisplay`);
        this.infoCard.setAttribute("class", "infoDisplay");

        this.infoCard.style.top = this.pos.y.toString() + "px";
        this.infoCard.style.left = this.pos.x.toString() + "px";

        this.referredElement.addEventListener("mouseleave", () => clearInterval(this.listener))

        this[`configure${this.type}`]();
        this.configureFlavorText();
    }

    update() {
        if (this.type == "Action") return;
        this.listener = setInterval(() => {
            let p = document.getElementsByClassName("infoPrice");
            for (let i in p) {
                if (!p[i].id) break;
                let label = this.itemReference.price[p[i].id].label;
                p[i].textContent = `${label}: ${this.itemReference.price[p[i].id].amount.toFixed(2)}`;
            }
            p = document.getElementsByClassName("infoProduction");
            for (let i in p) {
                if (!p[i].id) break;
                let resource = this.itemReference.production[p[i].id];
                let bonus = this.itemReference.bonus[p[i].id].amount || 0;
                let production = (resource.amount * (bonus + 1)) * 20;
                let prefix = (production > 0 ? "+" : "");
                p[i].textContent = `${resource.label}: ${prefix}${production.toFixed(2)}/s`;
            }
        }, DOM.screenTick * 5)
    }

    append() {
        this.referredElement.append(this.infoCard);
    }

    configureActionHTML() {
        this.configureInfo();
    }

    configureBuildingHTML() {
        this.configureAttributes(["price", "production"]);
    }

    configureScienceHTML() {
        this.configureAttributes(["price"]);
        this.configureInfo();
    }

    configureStorageHTML() {
        this.configureAttributes(["price", "capacity"]);
    }

    configureTechHTML() {
        this.configureAttributes(["price"]);
        this.configureInfo();
    }

    configureMachineHTML() {
        this.configureAttributes(["price", "production", "value"]);
    }

    configureEnergyHTML() {
        this.configureAttributes(["price", "value"]);
    }

    configureDataHTML() {
        this.configureAttributes(["price", "production", "value"]);
    }

    configureInfrastructureHTML() {
        this.configureAttributes(["price"])
    }

    configureAttributes(list) {
        for (let type in list) {
            type = list[type]
            type.toLowerCase();

            if (type == "value") {
                this.appendTitle("Energy demand");
                let p = document.createElement('p');
                p.classList.add("infoText");
                p.setAttribute("id", "energyInfoDisplayText");
                p.textContent = `${this.itemReference.value}MW`;
                this.infoCard.append(p)
                break;
            }

            this.appendTitle(capitalizeFirstLetter(type));

            let attribute = this.itemReference[type];
            Object.entries(attribute).forEach(resource => {
                this.configureResource(resource, capitalizeFirstLetter(type))
            })
        }
    }

    configureInfo() {
        this.appendTitle("Effects");

        let p = document.createElement('p');
        p.setAttribute("class", "infoText");
        p.textContent = this.itemReference.info;
        this.infoCard.append(p);
    }

    configureFlavorText() {
        if (this.itemReference.flavor) {
            this.infoCard.append(document.createElement('br'));
            let p = document.createElement('p');
            p.setAttribute("class", "flavorText");
            p.textContent = this.itemReference.flavor;
            this.infoCard.append(p)
        }
    }

    configureResource(resource, type = "Text") {
        let res = resource[1];
        let name = resource[0];
        let prefix = "";
        let suffix = "";
        let multiplier = 1;
        let bonus = 0;
        if (type == "Production") {
            multiplier = 20;
            prefix = (res.amount > 0 ? "+" : "");
            bonus = this.itemReference.bonus[name].amount || 0;
            suffix = "/s";
        }
        if (res.amount) {
            let p = document.createElement('p');
            p.setAttribute("class", `info${type}`);
            p.classList.add("infoText");
            p.setAttribute("id", resource[0]);
            let label = res.label;
            p.textContent = `${label}: ${prefix}${(multiplier * res.amount * (bonus + 1)).toFixed(2)}${suffix}`;
            if (resourceList[name].render) this.infoCard.append(p);
        }
    }

    appendTitle(text) {
        let title = document.createElement('h3');
        title.textContent = text + ":";
        this.infoCard.append(title);
        this.infoCard.append(document.createElement('hr'));
        return title;
    }
}

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.substring(1);
}
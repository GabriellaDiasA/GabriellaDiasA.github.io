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

        switch (this.type) {
            case "Action":
                this.configureAction();
                break;
            case "Building":
                this.configureBuilding();
                break;
            case "Science":
                this.configureScience();
                break;
            case "Storage":
                this.configureStorage();
                break;
            case "Tech":
                this.configureTech();
                break;
            default:
                break;
        }
    }

    update() {
        if (this.type == "Action") return;
        this.listener = setInterval(() => {
            let p = document.getElementsByClassName("infoPrice");
            for (let i in p) {
                if (!p[i].id) return;
                let label = this.itemReference.price[p[i].id].label
                p[i].textContent = `${label}: ${this.itemReference.price[p[i].id].amount.toFixed(2)}`;
            }
        }, DOM.screenTick * 5)
    }

    append() {
        this.referredElement.append(this.infoCard);
    }

    configureAction() {
        this.configureInfo();
        this.configureFlavorText();
    }

    configureBuilding() {
        this.configurePrice();
        this.configureProduction();
        this.configureFlavorText();
    }

    configureScience() {
        this.configurePrice();
        this.configureInfo();
        this.configureFlavorText();
    }

    configureStorage() {
        this.configurePrice();
        this.configureCapacity();
        this.configureFlavorText();
    }

    configureTech() {
        this.configurePrice();
        this.configureInfo();
        this.configureFlavorText();
    }

    configurePrice() {
        this.appendTitle("Price")

        let price = this.itemReference.price;
        Object.entries(price).forEach(resource => {
            let res = resource[1];
            if (res.amount) {
                let p = document.createElement('p');
                p.setAttribute("class", "infoText");
                p.classList.add("infoPrice");
                p.setAttribute("id", resource[0]);
                let label = res.label;
                p.textContent = `${label}: ${res.amount.toFixed(2)}`;
                this.infoCard.append(p);
            }
        })
    }

    configureProduction() {
        this.appendTitle("Production");

        let production = this.itemReference.production;
        Object.entries(production).forEach(res => {
            res = res[1]
            if (res.amount) {
                let p = document.createElement('p');
                p.setAttribute("class", "infoText");
                let label = res.label;
                p.textContent = `${label}: ${res.amount.toFixed(2) * 20}`;
                this.infoCard.append(p);
            }
        })
    }

    configureCapacity() {
        this.appendTitle("Capacity");

        let capacity = this.itemReference.capacity;
        Object.entries(capacity).forEach(res => {
            res = res[1]
            if (res.amount) {
                let p = document.createElement('p');
                p.setAttribute("class", "infoText");
                let label = res.label;
                p.textContent = `${label}: ${res.amount.toFixed(2)}`;
                this.infoCard.append(p);
            }
        })
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

    appendTitle(text) {
        let title = document.createElement('h3');
        title.textContent = text + ":";
        this.infoCard.append(title);
        this.infoCard.append(document.createElement('hr'));
    }
}
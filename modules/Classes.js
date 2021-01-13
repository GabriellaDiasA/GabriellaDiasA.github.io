export class Building{
    constructor(name, stk, prodRate, cost, costRate, display, unlocked, flavorText){
        this.name = name;
        this.stk = stk;
        this.prodRate = prodRate;
        this.cost = cost;
        this.costRate = costRate;
        this.display = display;
        this.unlocked = unlocked;
        this.flavorText = flavorText;
    }

    updateButtonText(){
        let button = document.getElementById(`${this.name}`);
        if (button == null) return 0;
        button.textContent = `${this.name}: ${this.stk}`;
    }

    updateCost(){
        for(const i in this.cost){
            this.cost[i][0] = (this.cost[i][0] * this.costRate).toFixed(2);
        }
    }

    interact(){
        this.stk++;
        this.updateCost();
        this.updateButtonText();
    }
}

export class Cost{
    constructor(ironOre, copperOre, titaniumOre){
        this.ironOre = [ironOre, "Iron ore"];
        this.copperOre = [copperOre, "Copper ore"];
        this.titaniumOre = [titaniumOre, "Titanium ore"];
    }
}

export class ProdRate{
    constructor(ironOre, copperOre, titaniumOre){
        this.ironOre = [ironOre, "Iron ore"];
        this.copperOre = [copperOre, "Copper ore"];
        this.titaniumOre = [titaniumOre, "Titanium ore"];
    }
}

export class Research{
    constructor(name, cost, display, unlocked, method, flavorText){
        this.name = name;
        this.cost = cost;
        this.display = display;
        this.unlocked = unlocked;
        this.method = method;
        this.flavorText = flavorText;
        this.purchased = false;
    }

    disableButton(){
        let text = document.getElementById(`${this.name}`);
        let button = text.parentNode;

        button.style.backgroundColor = "rgb(60,5,5)";
    }
}
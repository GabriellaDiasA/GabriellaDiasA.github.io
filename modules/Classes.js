export class Building{
    constructor(name, stk, prodRate, cost, costRate){
        this.name = name;
        this.stk = stk;
        this.prodRate = prodRate;
        this.cost = cost;
        this.costRate = costRate;
    }

    updateResourceMenuText(){
        let resourceMenuText = document.getElementById(`${this.name}`);
        if (resourceMenuText == null) return 0;
        resourceMenuText.textContent = `${this.name}: ${this.stk}`;
    }

    updateInfoText(){
        let infoDiv = document.getElementById('infoDiv');
        let count = infoDiv.childElementCount;
        for(let i = 0; i < count; i++){
            infoDiv.childNodes[0].remove();
        }
        for(let i in this.cost){
            let p = document.createElement('p');
            p.textContent = `${this.cost[i][1]}: ${this.cost[i][0]}`;
            infoDiv.append(p);
        }
    }

    updateCost(){
        for(const i in this.cost){
            this.cost[i][0] = (this.cost[i][0] * this.costRate).toFixed(2);
        }
    }

    interact(){
        this.stk++;
        this.updateCost();
        this.updateResourceMenuText();
        this.updateInfoText();
    }
}

export class Cost{
    constructor(ironOre, copperOre, titaniumOre){
        this.ironOre = [ironOre, "Iron ore"];
        this.copperOre = [copperOre, "Copper ore"];
        this.titaniumOre = [titaniumOre, "Titanium ore"];
    }
}
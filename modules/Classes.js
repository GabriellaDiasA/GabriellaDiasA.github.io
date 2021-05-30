export class Building{
    constructor(name, stk, prodRate, cost, baseCost, costRate, display, unlocked, flavorText){
        this.name = name;
        this.stk = stk;
        this.prodRate = prodRate;
        this.cost = cost;
        this.baseCost = baseCost;
        this.costRate = costRate;
        this.display = display;
        this.unlocked = unlocked;
        this.flavorText = flavorText;
        this.bonusProd = 1;
        this.buildingBonusProd = 1;
    }

    updateButtonText(){
        let button = document.getElementById(`${this.name}`);
        if (button == null){
            return;
        }
        button.textContent = `${this.name}: ${this.stk}`;
    }

    updateCost(){
        for(let type in this.cost){
            for(let resource in this.cost[type]){
                this.cost[type][resource].amount = (this.cost[type][resource].amount * this.costRate);
            }
        }
    }

    interact(){
        this.stk++;
        this.updateCost();
        this.updateButtonText();
    }

    recalculateCost(){
        for(let i in this.cost){
            this.cost[i].amount = (this.baseCost[i].amount * (this.costRate ** this.stk));
        }
    }

    updateBuildingBonusProd(number){
        this.buildingBonusProd += number;
    }
}

export class BasicResourceList{
    constructor(scrap, ironOre, iron, copperOre, copper, quartz, silicon, bits){
        this.scrap = {amount: scrap, label: "Scrap"};
        this.ironOre = {amount: ironOre, label: "Iron Ore"};
        this.iron = {amount: iron, label: "Iron"};
        this.copperOre = {amount: copperOre, label: "Copper Ore"};
        this.copper = {amount: copper, label: "Copper"};
        this.quartz = {amount: quartz, label: "Quartz"};
        this.silicon = {amount: silicon, label: "Silicon"};
        this.bits = {amount: bits, label: "Bits"};
    }
}

export class CraftResourceList{
    constructor(gear){
        this.gear = {amount: gear, label: "Gear"};
    }
}

export class DataResourceList{
    constructor(byte){
        this.byte = {amount: byte, label: "Byte"};
    }
}

export class CompleteResourceList{
    constructor(basicResources, craftingResources, dataResources){
        this.basicResources = basicResources;
        this.craftingResources = craftingResources;
        this.dataResources = dataResources;
    }
}

export class Technology{
    constructor(name, cost, display, unlocked, method, unlockMethod, flavorText, effectsText){
        this.name = name;
        this.cost = cost;
        this.display = display;
        this.unlocked = unlocked;
        this.method = method;
        this.unlock = unlockMethod;
        this.flavorText = flavorText;
        this.effectsText = effectsText;
        this.purchased = false;
    }

    disableButton(){
        let text = document.getElementById(`${this.name}`);
        let button = text.parentNode;

        button.style.backgroundColor = "rgb(60,5,5)";
    }
}

export class Machine extends Building{
    constructor(name, stk, maxStk, prodRate, cost, baseCost, costRate, display, unlocked, flavorText){
        super(name, stk, prodRate, cost, baseCost, costRate, display, unlocked, flavorText);
        this.maxStk = maxStk;
        this.eventListenerCheck = false;
    }

    interact(){
        this.maxStk++;
        super.interact();
    }

    updateButtonText(){
        let button = document.getElementById(`${this.name}`);
        if (button == null) return 0;
        button.textContent = `${this.name}: ${this.stk}/${this.maxStk}`
    }
}

export class StorageBuilding extends Building{
    constructor(name, stk, limitIncrease, cost, baseCost, costRate, display, unlocked, flavorText){
        super(name, stk, false, cost, baseCost, costRate, display, unlocked, flavorText);
        this.limitIncrease = limitIncrease;
        this.bonusLimit = 1;
    }
}

export class LimitIncrease extends BasicResourceList{
}

export class Upgrade extends Technology{

}

export class BonusBuilding extends Building{
    constructor(name, stk, resourceBonus, buildingBonus, cost, baseCost, costRate, display, unlocked, flavorText){
        super(name, stk, false, cost, baseCost, costRate, display, unlocked, flavorText);
        this.resourceBonus = resourceBonus;
        this.buildingBonus = buildingBonus;
        this.selfBonus = 1;
    }
}

export class Craft{
    constructor(name, cost, amount){
        this.name = name;
        this.cost = cost;
        this.amount = amount;
        this.display = true;
        this.unlocked = true;
    }

    unlock(){
        this.unlocked = true;
    }
}
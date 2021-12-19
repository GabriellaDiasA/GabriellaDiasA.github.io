export class HTMLWrapper{
    constructor(item){
        this.label = item.title;
        this.text = document.createElement('p');
    }

    append(){

    }

    configure(){
        this.text.setAttribute("id", this.label)
        this.text.textContent = this.label;
    }
}
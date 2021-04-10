
export class Cocktails {

    constructor() {
        this.cocktails = [];
    }

    add(cocktail){
        this.cocktails.push(cocktail);
    }

    get(){
        return this.cocktails;
    }

}
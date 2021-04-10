import {Ingredients} from "./ingredients.js";
import {Unites} from "./unites.js";


export class Cocktail  {

    constructor(titre,description) {
        this.titre = titre;
        this.description = description;
        this.ingredients = new Ingredients();
        this.unites = new Unites();
        this.quantities = [];
    }
    addingredient(ingredient){
        this.ingredients.add(ingredient);
    }

    addunite(unite){
        this.unites.add(unite);
    }

    addquantity(quantity)
    {
        this.quantities.push(quantity);
    }

    getingredients()
    {
        return this.ingredients;
    }
    getunites()
    {
        return this.unites;
    }
    getquantities()
    {
        return this.quantities;
    }

}
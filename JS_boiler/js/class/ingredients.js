import {Ingredient} from "./ingredient.js";

export class Ingredients {

    constructor () {
        this.ingredients = [];  // list of instances of "Ingredient"
    }

    add(ingredient) {
        this.ingredients.push(new Ingredient(ingredient));
    }

    get()
    {
        return this.ingredients;
    }

}


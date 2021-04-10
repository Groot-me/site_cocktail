import {Unite} from "./unite.js";

export class Unites {

    constructor () {
        this.Unites = [];  // list of instances of "Unite"
    }

    add(unite) {
        this.Unites.push(new Unite(unite));
    }

    get()
    {
        return this.Unites;
    }

}




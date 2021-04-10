const CSS_IMAGE = {
    "height" : "125px",
    "width" : "125px",
    "background-size" : "contain",
    "align-self" : "center",
    "margin-left": '30px'
}

export class Cocktail {

    constructor(name,ingredient,image) {

        this.cadre = $("<div/>");
        this.name = name;
        this.ingredient = ingredient;
        this.image = $("<div/>").css(CSS_IMAGE).css("background-image", "url("+image+")");


        this.cadre.append("<p> Name : "+ this.name+" </p>");
        this.cadre.append("<p> Ingredients : "+ this.ingredient +"</p>");
        this.cadre.append(this.image);

    }

    display(){

        return this.cadre;
    }

}

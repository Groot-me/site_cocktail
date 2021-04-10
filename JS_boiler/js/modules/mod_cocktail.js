import {Cocktail} from "../class/cocktail.js";

const URL_COCKTAIL = "php/Cocktail/cocktail.php";


//fonction bonus pour l'affichage des cocktails
//si la 1ere lettre est une voyelle affiche d' sinon de

let isvoyelle = (mot) => {
    let $voyelle = ['a','e','y','u','i','o'];
    for(let $lettre of $voyelle)
    {
        if(mot[0] == $lettre)
        {
            return true;
        }
    }
    return false;

}



let generatecocktailButton = ($liste_ingredient,$liste_unite,$liste_cocktail) => {
    return $("<button />")
        .append("Créer Cocktail")
        .click(function() {
            generateCocktailForm($liste_ingredient,$liste_unite,$liste_cocktail);
        });

}

const input_like_p = {
    "display" : "inline",
    "background": "0",
    "border": "0",
    "width": "90px",
    "overflow": "visible",
    "outline": "0",
    "height": "auto",
    "margin" : "5px"
}

let generateCocktailForm = ($liste_ingredient,$liste_unite,$liste_cocktail) => {


    //on vide l'autre liste pour le design
    $('#liste_of_thing').empty();

    // liste de cocktail
    $('#liste_of_cocktails').empty().append($("<h3> La liste de vos Cocktails : </h3>"));


    for(let $cocktail of $liste_cocktail.get())
    {

        let $div = $("<div class='cocktails' />");

        let $titre = $cocktail.titre;
        let $description = $cocktail.description;

        if($description != "")
        {
            $($div).append(
                $("<h4>"+$titre+ "</h4>"),
                $("<h5> Description : </h5>"),
                $("<p>"+$description+" </p>")
            );
        }else{
            $($div).append(
                $("<h4>"+$titre+ "</h4>")
            );
        }

        let $ingredients = $cocktail.getingredients();
        let $unites = $cocktail.getunites();
        let $quantities = $cocktail.getquantities();

        let $cpt = $ingredients.ingredients.length;


        for(let $i = 0; $i < $cpt; $i++)
        {
            let $ingredient = $ingredients.ingredients[$i].ingredient;
            let $unite = $unites.Unites[$i].unite;
            let $quantity = $quantities[$i];
            let $preposition = "";

            if(isvoyelle($ingredient))
            {
                $preposition = " d\'" ;
            }else{
               $preposition = " de " ;
            }

            $($div).append(
                $('<li style=\'list-style-type: disc;\'>'+$quantity+" " +$unite + $preposition  + $ingredient+'</li>')
            );
        }

        $('#liste_of_cocktails').append($div);
    }


    //creation du select avec toutes les unités
    let createselectwithunite = ($cpt) => {

        let $select = $("<select />").attr("name","unite"+$cpt);
        let $liste = $liste_unite.get();
        for(let $unite of $liste){
            $select.append("<option>"+$unite.unite +" </option>").attr("value",$unite.unite);
        }

        return $select;
    }

    //formulaire
    $('#Main_content').empty().append($("<form id='cocktail_form'/>").attr("method", "get").attr("action",URL_COCKTAIL));
    $('#cocktail_form').empty().append(
        $("<b><h1> NOUVEAU COCKTAIL </h1></b> <br> "),
        $("<label> Titre </label>"),
        $("<input required /> ")
            .attr("type","text")
            .attr("name","titre"),
        $("<br><br>"),
        $("<label> Description </label>"),
        $("<textarea/>")
            .attr("name","description"),
        $("<input/>")
            .attr("type","hidden")
            .attr("name","cpt")
            .attr("value",$liste_ingredient.get().length)

    );

    // li + checkbox + ingredients + quantity
    let $liste = $liste_ingredient.get();
    let $cpt = 0;
    for(let $ingredient of $liste)
    {
        $cpt +=1 ;
        $('#cocktail_form').append(
            $("<li style='list-style-type: disc;'></li>").append(
                $("<input/>")
                    .attr("type","checkbox")
                    .attr("name","check"+$cpt),
                $("<input readonly='readonly' class='inputliketext '/> ")
                    .css(input_like_p)
                    .attr("value",$ingredient.ingredient)
                    .attr("name", "ingredient"+$cpt),
                $("<input style='width:20px; margin-right: 5px'/>")
                    .attr("type","text")
                    .attr("name","quantity"+$cpt),
                $(createselectwithunite($cpt))
            ));
    }
    //submit button
    $('#cocktail_form').append(
        $("<button />")
            .attr("type", "submit")
            .append("Envoyer"),
    ).submit(function () {

        AjaxCocktail($(this),$liste_cocktail,$liste_ingredient,$liste_unite);

        return false;
    })

}

let AjaxCocktail = ($self,$liste_cocktail,$liste_ingredient,$liste_unite) => {
    let $data = $self.serialize();
    $self.hide();
    $.ajax({
        url: $self.attr("action"),
        method: $self.attr("method"),
        data: $data,
        dataType: "json",
    })
        .done(function (data) {
            if (data.hasOwnProperty("result")) {
                if (data.result) {

                    //creer un nvx cocktails avec notre titre et description
                    let $cocktail = new Cocktail(data.titre,data.description);


                    //recuperer les ingredients, unites , quantity
                    if(data.hasOwnProperty("ingredients")){
                        for(let $ingredient of data.ingredients){
                            $cocktail.addingredient($ingredient);
                        }
                    }

                    if(data.hasOwnProperty("unites")){
                        for(let $unite of data.unites){
                            $cocktail.addunite($unite);
                        }
                    }

                    if(data.hasOwnProperty("quantities")){
                        for(let $quantity of data.quantities){
                            $cocktail.addquantity($quantity);
                        }
                    }

                    //on ajoute le cocktail a notre liste de cocktail
                    $liste_cocktail.add($cocktail);

                    //on reaffiche le formulaire pour le design
                    generateCocktailForm($liste_ingredient,$liste_unite,$liste_cocktail);

                    $("#message_formulaire").empty().append("<p >"+data.message+"</p>").fadeIn(1000);
                }else {
                    $self.fadeIn(2000);
                    if (data.hasOwnProperty("message")) {
                        /* display message */
                        $("#message_formulaire").empty().append("<p style='color: red' >"+data.message+"</p>").fadeIn(1000);
                    }
                }

            }
        })
        .fail(function () {});
    return false;
}



export{generatecocktailButton}


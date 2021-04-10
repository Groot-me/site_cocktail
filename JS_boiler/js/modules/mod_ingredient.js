const URL_INGREDIENT = "php/Cocktail/ingredient.php";

let generateIngredientButton = ($liste_ingredient) => {
    return	$("<button />")
        .append("Créer Ingredient")
        .click(function() {
            generateIngredientForm($liste_ingredient);
        });

}

let generateIngredientForm = ($liste_ingredient) => {

    //on vide l'autre liste pour le design
    $('#liste_of_cocktails').empty();


    let $liste = $liste_ingredient.get();
    $('#liste_of_thing').empty().append($("<h3 style='margin-left: -15px'> La liste de vos ingrédients : </h3>"));
    for(let $ingredient of $liste)
    {
        if($ingredient.ingredient != undefined)
        {
            $('#liste_of_thing').append(
                $("<li style='list-style-type: disc;'>"+ $ingredient.ingredient +"</li>")
            );
        }

    }


    $('#Main_content').empty().append($("<form />")
        .attr("action", URL_INGREDIENT)
        .attr("method", "get")
        .append(
            $("<b><h1> NOUVEL INGREDIENT </h1></b> <br> "),
            $("<label> Ingrédient </label>"),
            $("<input /> ")
                .attr("type", "text")
                .attr("name", "ingredient"),
            $("<button />")
                .attr("type", "submit")
                .append("Envoyer"),
        ).submit(function () {

            AjaxIngredient($(this),$liste_ingredient);

            return false;
        })
    );

}


let AjaxIngredient = ($self,$liste_ingredient) => {
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
                    //recuperer data.ingredient puis l'ajouter dans notre liste d'ingredient
                    $liste_ingredient.add(data.ingredient);

                    //on reaffiche le formulaire pour le design
                    generateIngredientForm($liste_ingredient);

                    $("#message_formulaire").empty().append("<p>"+data.message+"</p>").fadeIn(1000);
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


export {generateIngredientButton};
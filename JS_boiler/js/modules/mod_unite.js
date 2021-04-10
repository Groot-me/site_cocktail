const URL_UNITE = "php/Cocktail/unite.php";



let generateUniteButton = ($liste_unite) => {
    return $("<button />")
        .append("Créer Unité")
        .click(function() {
            generateUniteForm($liste_unite);
        });

}


let generateUniteForm = ($liste_unite) => {

    //on vide l'autre liste pour le design
    $('#liste_of_cocktails').empty();

    let $liste = $liste_unite.get();
    $('#liste_of_thing').empty().append($("<h3 style='margin-left: -15px'> La liste de vos Unités : </h3>"));
    for(let $Unite of $liste)
    {
        $('#liste_of_thing').append(
            $("<li style='list-style-type: disc;'>"+ $Unite.unite +"</li>")
        );
    }


    $('#Main_content').empty().append($("<form />")
        .attr("action", URL_UNITE)
        .attr("method", "get")
        .append(
            $("<b><h1> NOUVEL UNITE </h1></b> <br> "),
            $("<label> Unité </label>"),
            $("<input /> ")
                .attr("type", "text")
                .attr("name", "unite"),
            $("<button />")
                .attr("type", "submit")
                .append("Envoyer"),
        ).submit(function () {

            AjaxUnite($(this),$liste_unite);

            return false;
        })
    );

}


let AjaxUnite = ($self,$liste_unite) => {
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
                    //recuperer data.unite puis l'ajouter dans notre liste d'ingredient
                    $liste_unite.add(data.unite);
                    //on reaffiche le formulaire pour le design
                    generateUniteForm($liste_unite);

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

export {generateUniteButton};
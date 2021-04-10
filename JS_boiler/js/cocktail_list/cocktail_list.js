import{Cocktail} from "./class/cocktail.js";

(function () {
    "use strict";

    const URL_COCKTAIL = "https://gist.githubusercontent.com/renandanton/8d99dab65bf9fb5b4465ded7ab73a7df/raw/2c5e0480bd239f76b055bb09f236f365e1530634/cocktails.json";

    $(() => {
        $.ajax({
            url: URL_COCKTAIL,
            method: "get",
            dataType: "json",
            success: function(data) {
                for (let key in data)
                {
                    if(data.hasOwnProperty(key))
                    {
                        for(let cocktails of data[key])
                        {
                            let cocktail = new Cocktail(cocktails.name, cocktails.preparation, cocktails.image);
                            $("#cocktails_list").append(cocktail.display());
                        }

                    }

                }
            },
            error: function(){

            }
        })

    });


}) ();
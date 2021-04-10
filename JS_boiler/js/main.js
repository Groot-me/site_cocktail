import{generateLoginForm,generateLogoutForm} from "./login_logout.js";
import{generateIngredientButton} from "./modules/mod_ingredient.js";
import{generateUniteButton} from "./modules/mod_unite.js";
import{generatecocktailButton} from "./modules/mod_cocktail.js";

import {Ingredients} from "./class/ingredients.js"
import {Unites} from "./class/unites.js";
import {Cocktails} from "./class/cocktails.js";

const URL_IS_CONNECTED = "php/Connexion/is_connected.php";

$(() => {
	$.ajax({
		url: URL_IS_CONNECTED,
		method: "get",
		dataType: "json",
	})
		.done(function (data) {
			if (data.hasOwnProperty("result")) {
				if (data.result) {
					if (data.hasOwnProperty("is_connected")) {
						let $login_logout = $("#login-logout");
						let $choice_button = $("#button_choice");
						let $right_side = $("#right_side");
						if (data.is_connected) {

							// display logout button
							$login_logout.append(generateLogoutForm());

							//create tab of cocktail, ingredient , unite then we will fill it with form
							let $liste_ingredient = new Ingredients();
							let $liste_unite = new Unites();
							let $liste_cocktail = new Cocktails();

							$choice_button.append(generateIngredientButton($liste_ingredient),generateUniteButton($liste_unite),generatecocktailButton($liste_ingredient,$liste_unite,$liste_cocktail));

							//affichage element de droite quand on est connecté
							$right_side.fadeIn(2000);

						} else {

							// display login form
							$login_logout.append(generateLoginForm());

							//message for disconnected people
							$('body').append("<h1 style='color: black; text-align: center'> Connecter vous pour faire des cocktails !! </h1>").fadeIn(4000);
						}

						$login_logout.fadeIn(1000);
						$choice_button.fadeIn(2000);

					} else {
						/* displayUnrecoverableError("...") */
					}
				} else {
					/* displayUnrecoverableError("...") */
				}
			} else {
				/* displayUnrecoverableError("...") */
			}
		})
		.fail(function () {
			/* displayUnrecoverableError("...") */
		});
});

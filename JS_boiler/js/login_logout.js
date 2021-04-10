const URL_LOGIN = "php/Connexion/login.php";
const URL_LOGOUT = "php/Connexion/logout.php";


let ajaxLogin = ($self) => {
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
					window.location.reload(true);

				}else {
					$self.fadeIn(2000);
					if (data.hasOwnProperty("message")) {
						/* display message */
						$("#message").html(data.message).fadeIn(1000);
					}
				}

			}
		})
		.fail(function () {});
	return false;
}

let ajaxLogout = () => {
	$.ajax({
		url: URL_LOGOUT,
		method: "get",
		dataType: "json",
	})
		.done(data => window.location.reload(true))
		.fail(function () {})
}

let generateLoginForm = () => {
	return	$("<form />")
		.attr("action", URL_LOGIN)
		.attr("method", "post")
		.append(
			$("<input />")
				.attr("type", "text")
				.attr("name", "username"),
			$("<input />")
				.attr("type", "password")
				.attr("name", "password"),
			$("<button />")
				.attr("type", "submit")
				.append("Login"),
		)
		.submit(function () {
			ajaxLogin($(this));
			return false;
		});
}
let generateLogoutForm = () => {
	return $("<button />").append("Logout").click(ajaxLogout)
}

export {generateLoginForm,generateLogoutForm};
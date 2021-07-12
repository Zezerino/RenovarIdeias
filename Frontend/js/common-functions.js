$(document).ready(function () {
	var loginBtn = document.getElementById("loginBtn");


	if (sessionStorage.getItem('loggedIn') == 'true') {
		loginBtn.innerHTML = "<i class='fas fa-sign-in-alt'></i><span>Logout</span>";
		$("#adminStuff").show();
		$("#hideThis").show();

	}else {
		loginBtn.innerHTML = "<i class='fas fa-sign-in-alt'></i><span>Login</span>"
		$("#adminStuff").hide();
		$("#hideThis").hide();

	}

	$('#username').keypress(function(e){
		if(e.keyCode==13)
		$('#botaologin').click();
	  });

	$('#password').keypress(function(e){
		if(e.keyCode==13)
		$('#botaologin').click();
	});
});


$("#botaologin").click(function () {
	console.log("Botao login");

	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;

	login(username, password);
})


function loginModal() {

	if (sessionStorage.getItem('loggedIn') == 'true') {

		sessionStorage.setItem('loggedIn', 'false');
		location.reload();


	} else {

		var modal = document.getElementById("myModalLogin");


		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];


		modal.style.display = "block";


		// When the user clicks on <span> (x), close the modal
		span.onclick = function () {
			modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	}
}

function login(username, password) {

	console.log(username);
	console.log(password);
	var form = { "user": username, "pass": password };

	fetch("http://localhost:3000/utilizadores/login", {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=utf-8'
		},
		method: 'POST',
		body: JSON.stringify(form)
	}).then(
		response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error(" Erro ao fazer login, certifique-se que as credenciais estão corretas");
			}
		}
	).then(result => {

		console.log(result);

		if (result) {
			console.log("Fiz login");
			sessionStorage.setItem('loggedIn', 'true');
			location.reload();
		} else {

            var modalLogin = document.getElementById("divErroLogin");
            modalLogin.innerHTML = "<p align='center' style='color:#e74a3b' id='pErro'><b>O login falhou, certifique-se que as credenciais estão corretas</b></p>";
            $("#pErro").effect("shake");
		}

	});


}

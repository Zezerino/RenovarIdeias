$( document ).ready(function() {

	console.log( "addObra ready!" );

	if (sessionStorage.getItem('loggedIn') == 'true') {

	}else {
		console.log("here");
		window.location.replace("../index.html");

	}

});



function postObra(){


	var nomeObra = document.getElementById("nomeObra").value;
	var localObra = document.getElementById("localObra").value;

	var souValido = false;


	$("#erroNomeObra").hide();
	$("#erroLocalObra").hide();


	if (nomeObra == ""){
		console.log("Erro nome")
		$("#erroNomeObra").show();
		$("#formObra").effect("shake");
	}else if(localObra == ""){
			//console.log("Erro nome")
			$("#erroLocalObra").show();
			$("#formObra").effect("shake");
	}else{
		souValido = true;
	}
	
	if(souValido){

	
		//console.log(document.getElementById('nomeObra').value);
		var form = {"nomeObra":nomeObra, "localObra":localObra, "estadoObra":1};

		//console.log(form);

		fetch("http://localhost:3000/obras",{
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json; charset=utf-8'
			},       
			method: 'POST',
			body: JSON.stringify(form)
		}).then(
		response=>{
			if(response.ok){
				return response.json();
			}else{
				throw new Error(" Problema ao adicionar uma nova obra ");
			}
		}
		).then(result=>{
			
			location.reload();
			
		});
	}

}


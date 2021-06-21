$( document ).ready(function() {

	console.log( "addObra ready!" );


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
		//$("#formOperador").effect("shake");
	}else if(localObra == ""){
			//console.log("Erro nome")
			$("#erroLocalObra").show();
			//$("#formOperador").effect("shake");
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


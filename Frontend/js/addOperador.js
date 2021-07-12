$( document ).ready(function() {

	console.log( "addOperador ready!" );
	

});



function postOperador(){

	console.log("Entrou no postOperador")

	var nomeOp = document.getElementById("nomeOperador").value;


	$("#erroNome").hide();

	if (nomeOp == ""){
		//console.log("Erro nome")
		$("#erroNome").show();
		$("#formOperador").effect("shake");
	}else{

		var form = {"nomeOperador":nomeOp, "estadoOperador":1};
		
	fetch("http://localhost:3000/operadores",{
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
			throw new Error(" Problema ao adicionar um novo operador ");
		}
	}
	).then(result=>{
		
		location.reload();

	});

	}

}


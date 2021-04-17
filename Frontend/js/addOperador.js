$( document ).ready(function() {

	console.log( "addOperador ready!" );


});



function postOperador(){

	console.log("yo operador");

	
	console.log(document.getElementById('nomeOperador').value);
	var form = {"nomeOperador":document.getElementById('nomeOperador').value, "estadoOperador":1};

	console.log(form);

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
			throw new Error("something went wrong operadores");
		}
	}
	).then(result=>{
		
		console.log("fixe");


	});

}


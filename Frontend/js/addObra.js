$( document ).ready(function() {

	console.log( "addObra ready!" );


});



function postObra(){

	console.log("yo");

	
	console.log(document.getElementById('nomeObra').value);
	var form = {"Nome":document.getElementById('nomeObra').value};

	console.log(form);

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
			throw new Error("something went wrong 1");
		}
	}
	).then(result=>{
		
		console.log("fixe");


	});

}

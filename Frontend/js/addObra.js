$( document ).ready(function() {

	console.log( "addObra ready!" );


});



function postObra(){

	
	console.log(document.getElementById('nomeObra').value);
	var form = {"nomeObra":document.getElementById('nomeObra').value, "localObra":document.getElementById('localObra').value, "estadoObra":1};

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
			throw new Error(" Problema ao adicionar uma nova obra ");
		}
	}
	).then(result=>{
		
		location.reload();
		
	});

}


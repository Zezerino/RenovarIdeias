$( document ).ready(function() {

	console.log( "addEquip ready!" );


});



function postEquip(){

	console.log("yo");

	
	console.log(document.getElementById('nomeEquip').value);
	var form = {"Nome":document.getElementById('nomeEquip').value, "Codigo":document.getElementById('codigoEquip').value, "CodigoLongo":document.getElementById('codigoLEquip').value};

	console.log(form);

	fetch("http://localhost:3000/equipamentos",{
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
			throw new Error("something went wrong equipamentos");
		}
	}
	).then(result=>{
		
		console.log("fixe");


	});

}


// {"Codigo":document.getElementById('codigoEquip').value}, {"CodigoLongo":document.getElementById('codigoLEquip').value}
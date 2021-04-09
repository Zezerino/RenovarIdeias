$( document ).ready(function() {

	console.log( "ready!" );
	fillEquip();
	fillObra();
	fillOperador();

});



function fillEquip(){

	fetch("http://25.83.4.101:3000/equipamentos",{
		headers:{
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=utf-8'
		},       
		method: 'GET'
	}).then(
	response=>{
		if(response.ok){
			return response.json();
		}else{
			throw new Error("something went wrong");
		}
	}
	).then(result=>{
		
		console.log(result);
		console.log((result.data).length);
		console.log(result.data[0].idEquipamento);

		var comboEquip = document.getElementById("comboEquip");

		for (var i= 0; i < (result.data).length; i++){

			var option = document.createElement("option");
			option.id = result.data[i].idEquipamento;
			option.value = result.data[i].Nome;
			option.innerHTML = result.data[i].Nome;
			comboEquip.appendChild(option);
		}


	});

}


function fillObra(){

	fetch("http://25.83.4.101:3000/obras",{
		headers:{
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=utf-8'
		},       
		method: 'GET'
	}).then(
	response=>{
		if(response.ok){
			return response.json();
		}else{
			throw new Error("something went wrong");
		}
	}
	).then(result=>{
		
		console.log(result);
		console.log((result.data).length);
		console.log(result.data[0].idObra);

		var comboObra = document.getElementById("comboObra");

		for (var i= 0; i < (result.data).length; i++){

			var option = document.createElement("option");
			option.id = result.data[i].idObra;
			option.value = result.data[i].Nome;
			option.innerHTML = result.data[i].Nome;
			comboObra.appendChild(option);
		}


	});

}


function fillOperador(){

	fetch("http://25.83.4.101:3000/operadores",{
		headers:{
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=utf-8'
		},       
		method: 'GET'
	}).then(
	response=>{
		if(response.ok){
			return response.json();
		}else{
			throw new Error("something went wrong");
		}
	}
	).then(result=>{
		
		console.log(result);
		console.log((result.data).length);
		console.log(result.data[0].idOperador);

		var comboOperador = document.getElementById("comboOperador");

		for (var i= 0; i < (result.data).length; i++){

			var option = document.createElement("option");
			option.id = result.data[i].idOperador;
			option.value = result.data[i].Nome;
			option.innerHTML = result.data[i].Nome;
			comboOperador.appendChild(option);
		}


	});

}
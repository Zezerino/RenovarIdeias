$( document ).ready(function() {

	console.log( "index ready!" );
	fillEquip();
	fillObra();
	fillOperador();

});



function postMovimento(){

	console.log("yo");

	console.log("Test");
	console.log(document.getElementById('comboEquip').value);
	console.log("Test2");

	var l = document.getElementById('comboEquip').childNodes[2]
	console.log(l);

	console.log(document.getElementById('checkboxLimpar').value);


	var form = {"idEquipamento":document.getElementById('comboEquip').value, "idObra":document.getElementById('comboObra').value, "idOperador":document.getElementById('comboOperador').value, "Tipo":document.getElementById('comboTipo').value, "EstadoNaEntregaFunciona":document.getElementById('checkboxFunciona').value, "EstadoNaEntregaLimpar":document.getElementById('checkboxLimpar').value};

	console.log(form);

	fetch("http://localhost:3000/movimentacoes",{
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
			throw new Error("something went wrong movimentacoes");
		}
	}
	).then(result=>{
		
		console.log("fixe");


	});

}



function fillEquip(){

	fetch("http://localhost:3000/equipamentos",{
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
		
		//console.log(result);
		//console.log((result.data).length);
		//console.log(result.data[0].idEquipamento);

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

	fetch("http://localhost:3000/obras",{
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
		
		//console.log(result);
		//console.log((result.data).length);
		//console.log(result.data[0].idObra);

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

	fetch("http://localhost:3000/operadores",{
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
		
		//console.log(result);
		//console.log((result.data).length);
		//console.log(result.data[0].idOperador);

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
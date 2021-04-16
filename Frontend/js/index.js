$( document ).ready(function() {

	console.log( "index ready!" );
	fillEquip();
	fillObra();
	fillOperador();
	fillEquipS();
	fillObraS();
	fillOperadorS();


});



function postEntrada(){

	var comboE = document.getElementById("comboEquip");
	var comboO = document.getElementById("comboObra");
	var comboW = document.getElementById("comboOperador");
	var checkF = 0;
	var checkL = 0;


  	if(document.getElementById("checkboxFunciona").checked){
  		checkF = 1;

  	}

  	if(document.getElementById("checkboxLimpar").checked){
  		checkL = 1;

  	}

	var form = {"idEquipamento":comboE[comboE.selectedIndex].id, "idObra":comboO[comboO.selectedIndex].id, "idOperador":comboW[comboW.selectedIndex].id, "Tipo":"Entrada", "EstadoNaEntregaFunciona":checkF, "EstadoNaEntregaLimpar":checkL};

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
			alert("Erro ao adicionar uma nova Entrada");
			throw new Error("something went wrong movimentacoes");
		}
	}
	).then(result=>{
		alert("Entrada feita com sucesso");
		console.log("fixe");


	});

}


function postSaida(){

	var comboES = document.getElementById("comboEquipS");
	var comboOS = document.getElementById("comboObraS");
	var comboWS = document.getElementById("comboOperadorS");


	var form = {"idEquipamento":comboES[comboES.selectedIndex].id, "idObra":comboOS[comboOS.selectedIndex].id, "idOperador":comboWS[comboWS.selectedIndex].id, "Tipo":"Saida", "EstadoNaEntregaFunciona":null, "EstadoNaEntregaLimpar":null};

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
			alert("Erro ao adicionar uma nova Saída");
			throw new Error("something went wrong movimentacoes");
		}
	}
	).then(result=>{
		alert("Saida feita com sucesso");

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

function fillEquipS(){

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

		var comboEquip = document.getElementById("comboEquipS");

		for (var i= 0; i < (result.data).length; i++){

			var option = document.createElement("option");
			option.id = result.data[i].idEquipamento;
			option.value = result.data[i].Nome;
			option.innerHTML = result.data[i].Nome;
			comboEquip.appendChild(option);

		}


	});

}


function fillObraS(){

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

		var comboObra = document.getElementById("comboObraS");

		for (var i= 0; i < (result.data).length; i++){

			var option = document.createElement("option");
			option.id = result.data[i].idObra;
			option.value = result.data[i].Nome;
			option.innerHTML = result.data[i].Nome;
			comboObra.appendChild(option);

		}


	});

}


function fillOperadorS(){

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

		var comboOperador = document.getElementById("comboOperadorS");

		for (var i= 0; i < (result.data).length; i++){

			var option = document.createElement("option");
			option.id = result.data[i].idOperador;
			option.value = result.data[i].Nome;
			option.innerHTML = result.data[i].Nome;
			comboOperador.appendChild(option);
		}


	});

}
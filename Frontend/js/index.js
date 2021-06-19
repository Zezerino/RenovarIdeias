$( document ).ready(function() {

	console.log( "index ready!" );
	fillEquip();
	fillObra();
	fillOperador();
	fillEquipS();
	fillObraS();
	fillOperadorS();


});




function changeEntrega(estadoEntrega, id){


	// var comboE = document.getElementById("comboEquip");
	// var comboO = document.getElementById("comboObra");
	// var comboW = document.getElementById("comboOperador");
	// var idEquipamento = document.getElementById("equipamentoInput").value;


	var form = {"estadoEntrega":estadoEntrega};

	fetch("http://localhost:3000/equipamentos/entradas/" + id,{
		headers:{
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=utf-8'
		},       
		method: 'PUT',
		body: JSON.stringify(form)
	}).then(
	response=>{
		if(response.ok){
			return response.json();
		}else{
			throw new Error(" Problema ao alterar estado de entrega ");
		}
	}
	).then(result=>{
		
		location.reload();

	});


}



function postEntrada(){


	var idEquipamento = document.getElementById("equipamentoInput").value;
	var comboO = document.getElementById("comboObra");
	var comboW = document.getElementById("comboOperador");
	
	//check funciona
	var checkF = 0;
	//check limpar
	var checkL = 0;
	//check entrega
	var checkE = 1;


	var validar = document.getElementById("comboEquip").children;
	var souValido = false;

	$("#entradaErroEquip").hide();
	$("#entradaErroObra").hide();
	$("#entradaErroOp").hide();

	$("#saidaErroEquip").hide();
	$("#saidaErroObra").hide();
	$("#saidaErroOp").hide();


	for(var i=0; i < validar.length; i++ ){

		if (idEquipamento == validar[i].value){
			souValido = true;

		}

	}


	if (idEquipamento == ""){
		console.log("Erro equip")
		$("#entradaErroEquip").show();
		$("#formMovEntrada" ).effect("shake");
	}else{
		for(var i=0; i < validar.length; i++ ){

			if (idEquipamento == validar[i].value){
	
				if (comboO[comboO.selectedIndex].value == "" ){
					//console.log("Erro Obra")
					$("#entradaErroObra").show();
					$("#formMovEntrada" ).effect("shake");
				}else if (comboW[comboW.selectedIndex].value == "" ){
					//console.log("Erro Op")
					$("#entradaErroOp").show();
					$("#formMovEntrada" ).effect("shake");
				}else{
					//console.log("Sou Válido")
					souValido = true;
				}	
			}
		}
	}


	
	if(souValido){

		if(document.getElementById("checkboxFunciona").checked){
			checkF = 1;
		}

		if(document.getElementById("checkboxLimpar").checked){
			checkL = 1;
		}

		var form = {"idEquipamento":idEquipamento, "idObra":comboO[comboO.selectedIndex].id, "idOperador":comboW[comboW.selectedIndex].id, "tipo":"Entrada", "estadoFunciona":checkF, "estadoLimpo":checkL, "estadoEntrega":checkE};

		fetch("http://localhost:3000/movimentos",{
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
				throw new Error("something went wrong movimentos");
			}
		}
		).then(result=>{

			//Altera o estado da entrada
			changeEntrega(checkE, idEquipamento);

			alert("Entrada feita com sucesso");

		});
	}
	// else{
	// 	$("#formMovEntrada" ).effect("shake");
	// 	alert(" Este equipamento já se encontra no armazem ou não existe");
	// }


}





function postSaida(){

	var idEquipamentoS = document.getElementById("equipamentoInputS").value;
	var comboOS = document.getElementById("comboObraS");
	var comboWS = document.getElementById("comboOperadorS");
	var checkE = 0;

	var validar = document.getElementById("comboEquipS").children;
	var souValido = false;

	$("#saidaErroEquip").hide();
	$("#saidaErroObra").hide();
	$("#saidaErroOp").hide();

	$("#entradaErroEquip").hide();
	$("#entradaErroObra").hide();
	$("#entradaErroOp").hide();

	// console.log(idEquipamentoS)
	// console.log(comboOS[comboOS.selectedIndex])
	// console.log(comboWS)



	if (idEquipamentoS == ""){
		//console.log("Erro equip")
		$("#saidaErroEquip").show();
		$("#formMovSaida" ).effect("shake");
	}else{
		for(var i=0; i < validar.length; i++ ){

			if (idEquipamentoS == validar[i].value){
	
				if (comboOS[comboOS.selectedIndex].value == "" ){
					//console.log("Erro Obra")
					$("#saidaErroObra").show();
					$("#formMovSaida" ).effect("shake");
				}else if (comboWS[comboWS.selectedIndex].value == "" ){
					//console.log("Erro Op")
					$("#saidaErroOp").show();
					$("#formMovSaida" ).effect("shake");
				}else{
					//console.log("Sou Válido")
					souValido = true;
				}	
			}
		}
	}




	if(souValido){



		var form = {"idEquipamento":idEquipamentoS, "idObra":comboOS[comboOS.selectedIndex].id, "idOperador":comboWS[comboWS.selectedIndex].id, "tipo":"Saida", "estadoFunciona":null, "estadoLimpo":null, "estadoEntrega":checkE};

		fetch("http://localhost:3000/movimentos",{
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
				throw new Error("something went wrong movimentos");
			}
		}
		).then(result=>{
			changeEntrega(checkE, idEquipamentoS);

			alert("Saida feita com sucesso");

			//console.log("fixe");


		});

	}
	// else{

	// 	$("#formMovSaida" ).effect("shake");
	// 	alert(" Este equipamento já se encontra fora do armazem ou não existe");

	// }
}






function fillEquip(){

	fetch("http://localhost:3000/equipamentos/disponivel",{
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
		

		var comboEquip = document.getElementById("comboEquip");

		//console.log(result.data).length;

		comboEquip.innerHTML = "";

		for (var i= 0; i < (result.data).length; i++){

			comboEquip.innerHTML +=  '<option value="'+result.data[i].idEquipamento +'">' + result.data[i].nomeEquipamento + '</option>';

		}




	});

}


function fillObra(){

	fetch("http://localhost:3000/obras/disponivel",{
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
		//console.log(result.data);
		//console.log(result.data[0].idObra);

		var comboObra = document.getElementById("comboObra");

		for (var i= 0; i < (result.data).length; i++){

			var option = document.createElement("option");
			option.id = result.data[i].idObra;
			option.value = result.data[i].nomeObra;
			option.innerHTML = result.data[i].nomeObra;
			comboObra.appendChild(option);

		}


	});

}


function fillOperador(){

	fetch("http://localhost:3000/operadores/disponivel",{
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
		

		var comboOperador = document.getElementById("comboOperador");

		for (var i= 0; i < (result.data).length; i++){

			var option = document.createElement("option");
			option.id = result.data[i].idOperador;
			option.value = result.data[i].nomeOperador;
			option.innerHTML = result.data[i].nomeOperador;
			comboOperador.appendChild(option);
		}


	});

}

function fillEquipS(){

	fetch("http://localhost:3000/equipamentos/ndisponivel",{
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
		
		var comboEquipS = document.getElementById("comboEquipS");

		comboEquipS.innerHTML = "";

		for (var i= 0; i < (result.data).length; i++){

			comboEquipS.innerHTML +=  '<option value="'+result.data[i].idEquipamento +'">' + result.data[i].nomeEquipamento + '</option>';

		}

	});

}


function fillObraS(){

	fetch("http://localhost:3000/obras/disponivel",{
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
			option.value = result.data[i].nomeObra;
			option.innerHTML = result.data[i].nomeObra;
			comboObra.appendChild(option);

		}


	});

}


function fillOperadorS(){

	fetch("http://localhost:3000/operadores/disponivel",{
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
			option.value = result.data[i].nomeOperador;
			option.innerHTML = result.data[i].nomeOperador;
			comboOperador.appendChild(option);
		}


	});

}
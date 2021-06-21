$(document).ready(function() {

	console.log( "addEquip ready!" );
	fillCategoria()

});



function fillCategoria(){

	fetch("http://localhost:3000/categorias/disponivel",{
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


		var comboCategoria = document.getElementById("comboCategoria");

		for (var i= 0; i < (result.data).length; i++){

			var option = document.createElement("option");
			option.id = result.data[i].idCategoria;
			option.value = result.data[i].nomeCategoria;
			option.innerHTML = result.data[i].nomeCategoria;
			comboCategoria.appendChild(option);
		}


	});

}


function postEquip(){

	var idEquip = document.getElementById("idEquipamento").value;
	var codL = document.getElementById("codigoLongo").value;
	var nomeEquip = document.getElementById("nomeEquipamento").value;
	var comboC = document.getElementById("comboCategoria");


	var souValido = false;

	$("#erroNomeId").hide();
	$("#erroCodigoLongo").hide();
	$("#erroNomeEquip").hide();
	$("#erroCategoria").hide();



	if (idEquip == ""){
//console.log("Erro equip")
$("#erroNomeId").show();
//$("#formMovSaida" ).effect("shake");
}else if (codL == "" ){
//console.log("Erro Obra")
$("#erroCodigoLongo").show();
//$("#formMovSaida" ).effect("shake");
}else if (nomeEquip == "" ){
//console.log("Erro Op")
$("#erroNomeEquip").show();
//$("#formMovSaida" ).effect("shake");
}else if (comboC[comboC.selectedIndex].value == ""){
//console.log("Erro Op")
$("#erroCategoria").show();
//$("#formMovSaida" ).effect("shake");
}else{
//console.log("Sou Válido")
souValido = true;
}	



if(souValido){

//var form = {"idEquipamento":document.getElementById('idEquipamento').value, "codigoLongo":document.getElementById('codigoLongo').value, "nomeEquipamento":document.getElementById('nomeEquipamento').value, "estadoEquipamento":1};
const formData = new FormData();
formData.append("idEquipamento",idEquip);
formData.append("codigoLongo", codL);
formData.append("nomeEquipamento", nomeEquip);
formData.append("idCategoria", comboC[comboC.selectedIndex].id);

formData.append("estadoEquipamento",1);

// console.log(document.getElementById('comboCategoria').value)
// console.log('yooo fsfsfsf');
// console.log(document.getElementById('myFile').files[0]);

formData.append("imagemEquipamento", document.getElementById('myFile').files[0]);

fetch("http://localhost:3000/equipamentos",{
/*headers:{
'Accept': 'application/json',
'Content-Type': 'application/json; charset=utf-8'
},*/       
method: 'POST',
body: formData
/*body: JSON.stringify(form)*/
}).then(
response=>{
	if(response.ok){
		return response.json();
	}else{
		throw new Error(" Problema ao adicionar um novo equipamento ");
	}
}
).then(result=>{

	location.reload();

});
}
}

function postCategoria(){


	console.log(document.getElementById('nomeCategoria').value);
	var form = {"nomeCategoria":document.getElementById('nomeCategoria').value};

	console.log(form);

	fetch("http://localhost:3000/categorias",{
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
			throw new Error(" Problema ao adicionar uma nova categoria ");
		}
	}
	).then(result=>{

		location.reload();

	});

}
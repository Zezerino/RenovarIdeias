$( document ).ready(function() {

	console.log( "addEquip ready!" );
	fillCategoria()

});



// POR FAZER
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

	var comboC = document.getElementById("comboCategoria");


	//var form = {"idEquipamento":document.getElementById('idEquipamento').value, "codigoLongo":document.getElementById('codigoLongo').value, "nomeEquipamento":document.getElementById('nomeEquipamento').value, "estadoEquipamento":1};
	const formData = new FormData();
	formData.append("idEquipamento",document.getElementById('idEquipamento').value);
	formData.append("codigoLongo", document.getElementById('codigoLongo').value);
	formData.append("nomeEquipamento", document.getElementById('nomeEquipamento').value);
	formData.append("idCategoria", comboC[comboC.selectedIndex].id);

	formData.append("estadoEquipamento",1);

	console.log(document.getElementById('comboCategoria').value)
	console.log('yooo fsfsfsf');
	console.log(document.getElementById('myFile').files[0]);
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

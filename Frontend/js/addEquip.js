$( document ).ready(function() {

	console.log( "addEquip ready!" );


});



function postEquip(){


	var form = {"idEquipamento":document.getElementById('idEquipamento').value, "codigoLongo":document.getElementById('codigoLongo').value, "nomeEquipamento":document.getElementById('nomeEquipamento').value, "estadoEquipamento":1};


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
			throw new Error(" Problema ao adicionar um novo equipamento ");
		}
	}
	).then(result=>{

		location.reload();

	});

}
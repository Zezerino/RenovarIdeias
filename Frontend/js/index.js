$( document ).ready(function() {

	console.log( "ready!" );
	fillEquip();
});



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
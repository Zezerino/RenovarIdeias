$(document).ready(function () {

	console.log("addEquip ready!");
	fillCategoria()

});



function fillCategoria() {

	fetch("http://localhost:3000/categorias/disponivel", {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=utf-8'
		},
		method: 'GET'
	}).then(
		response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("something went wrong");
			}
		}
	).then(result => {


		var comboCategoria = document.getElementById("comboCategoria");
		var removerCategoria = document.getElementById("removerCategoria");


		for (var i = 0; i < (result.data).length; i++) {

			var option = document.createElement("option");
			option.id = result.data[i].idCategoria;
			option.value = result.data[i].nomeCategoria;
			option.innerHTML = result.data[i].nomeCategoria;
			comboCategoria.appendChild(option);
		}

		for (var i = 0; i < (result.data).length; i++) {

			var option = document.createElement("option");
			option.id = result.data[i].idCategoria;
			option.value = result.data[i].nomeCategoria;
			option.innerHTML = result.data[i].nomeCategoria;
			removerCategoria.appendChild(option);
		}


	});

}

function checkIfExist(idEquip,codL,nomeEquip,comboC) {


	var upperIdEquip = idEquip.toUpperCase();
	var upperCodL = codL.toUpperCase();

	fetch("http://localhost:3000/equipamentos/", {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=utf-8'
		},
		method: 'GET'
	}).then(
		response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("something went wrong");
			}
		}
	).then(result => {

		var insert = true;

		for (var i = 0; i < (result.data).length; i++) {

			if (result.data[i].idEquipamento == idEquip || result.data[i].idEquipamento == idEquip.toUpperCase() || result.data[i].idEquipamento == idEquip.toLowerCase() ) {
				$("#erroSameId").show();
				$("#formEquip").effect("shake");
				insert = false
			}
		}
		
		// Se existir não entra aqui
		if(insert){

			const formData = new FormData();
			formData.append("idEquipamento", upperIdEquip);
			formData.append("codigoLongo", upperCodL);
			formData.append("nomeEquipamento", nomeEquip);
			formData.append("idCategoria", comboC[comboC.selectedIndex].id);		
			formData.append("estadoEquipamento", 1);
			formData.append("imagemEquipamento", document.getElementById('myFile').files[0]);

			fetch("http://localhost:3000/equipamentos", {
				method: 'POST',
				body: formData
			}).then(
				response => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error(" Problema ao adicionar um novo equipamento ");
					}
				}
			).then(result => {

				location.reload();

			});

		}

		
	});

}



function postEquip() {

	var idEquip = document.getElementById("idEquipamento").value;
	var codL = document.getElementById("codigoLongo").value;
	var nomeEquip = document.getElementById("nomeEquipamento").value;
	var comboC = document.getElementById("comboCategoria");


	var souValido = false;

	$("#erroNomeId").hide();
	$("#erroCodigoLongo").hide();
	$("#erroNomeEquip").hide();
	$("#erroCategoria").hide();
	$("#erroSameId").hide();

	
	if (idEquip == "") {
		//console.log("Erro equip")
		$("#erroNomeId").show();
		$("#formEquip").effect("shake");
	} else if (codL == "") {
		//console.log("Erro Obra")
		$("#erroCodigoLongo").show();
		$("#formEquip").effect("shake");
	} else if (nomeEquip == "") {
		//console.log("Erro Op")
		$("#erroNomeEquip").show();
		$("#formEquip").effect("shake");
	} else if (comboC[comboC.selectedIndex].value == "") {
		//console.log("Erro Op")
		$("#erroCategoria").show();
		$("#formEquip").effect("shake");
	} else {
		//console.log("Sou Válido")
		souValido = true;
	}



	if (souValido) {

		// Faz o check e depois o post
		checkIfExist(idEquip,codL,nomeEquip,comboC)

	}
}

function postCategoria() {
	var nomeCat = document.getElementById('nomeCategoria').value
	var souValido = false;

	$("#erroAdicionarCategoria").hide();


	//console.log(document.getElementById('nomeCategoria').value);
	var form = { "nomeCategoria": nomeCat};

	//console.log(form);

	if (nomeCat == "") {
		//console.log("Erro equip")
		$("#erroAdicionarCategoria").show();
		$("#formEquip").effect("shake");
	} else {
		//console.log("Sou Válido")
		souValido = true;
	}

	if (souValido) {


		fetch("http://localhost:3000/categorias", {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json; charset=utf-8'
			},
			method: 'POST',
			body: JSON.stringify(form)
		}).then(
			response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(" Problema ao adicionar uma nova categoria ");
				}
			}
		).then(result => {

			location.reload();

		});
	}

}

function removeCategoria() {

	var souValido = false;

	$("#erroApagarCategoria").hide();

	

	

	var remCategoria = document.getElementById("removerCategoria");
	var id = remCategoria[remCategoria.selectedIndex].id
	console.log(id);

	const formData = new FormData();
	formData.append("idCategoria", remCategoria[remCategoria.selectedIndex].id);

	if (remCategoria[remCategoria.selectedIndex].value == "") {
		//console.log("Erro equip")
		$("#erroEscolherCategoria").show();
		$("#formEquip").effect("shake");
	} else {
		//console.log("Sou Válido")
		souValido = true;
	}

	if (souValido) {


		fetch("http://localhost:3000/equipamentos/categoria/" + id, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json; charset=utf-8'
			},
			method: 'GET'
		}).then(
			response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("something went wrong");
				}
			}
		).then(result => {
			
			
			if(result.data.length == 0){

				fetch("http://localhost:3000/categorias/" + id, {
					/*
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json; charset=utf-8'
					},*/
					method: 'DELETE',
					body: formData
				}).then(
					response => {
						if (response.ok) {
							return response.json();
						} else {
							throw new Error(" Erro a apagar uma categoria (F: botaoApagar) ");
						}
					}
				).then(result => {
		
					location.reload();
		
				});

			}else{
				$("#erroApagarCategoria").show();
				$("#formEquip").effect("shake");
			}
	
		});




		



	}
}


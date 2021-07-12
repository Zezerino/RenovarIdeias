// Call the dataTables jQuery plugin
$(document).ready(function () {

	$('#idEquipamentoEditar').keypress(function(e){
		if(e.keyCode==13)
		$('#botaoEquipamentoEditar').click();
	});

	$('#idCodigoEditar').keypress(function(e){
		if(e.keyCode==13)
		$('#botaoEquipamentoEditar').click();
	});
	$('#nomeEquipamentoEditar').keypress(function(e){
		if(e.keyCode==13)
		$('#botaoEquipamentoEditar').click();
	});
	$('#comboCategoriaEditar').keypress(function(e){
		if(e.keyCode==13)
		$('#botaoEquipamentoEditar').click();
	});
	$('#myFileUpdate').keypress(function(e){
		if(e.keyCode==13)
		$('#botaoEquipamentoEditar').click();
	});

	if (sessionStorage.getItem('loggedIn') == 'true') {
		fetch("http://localhost:3000/equipamentos/view", {
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
					throw new Error(" Erro a receber dados da BD da tabela equipamentos ");
				}
			}
		).then(result => {

			// Setup - add a text input to each footer cell
			$('#dataTableEquipamento thead tr').clone(true).appendTo('#dataTableEquipamento thead');
			$('#dataTableEquipamento thead tr:eq(1) th').each(function (i) {
				var title = $(this).text();
				$(this).html('<input type="text" placeholder="Pesquisar ' + title + '" />');

				$('input', this).on('keyup change', function () {
					if (table.column(i).search() !== this.value) {
						table.column(i).search(this.value).draw();
					}
				});
			});

			var table = $('#dataTableEquipamento').DataTable({

				orderCellsTop: true,
				fixedHeader: true,
				data: result.data,
				"createdRow": function (row, data, dataIndex) {
					if (data.estadoEquipamento == 1) {
						$(row).addClass('greenClass');
					} else {
						$(row).addClass('redClass');
					}
				},
				columns: [
					{ data: 'idEquipamento' },
					{ data: 'codigoLongo' },
					{ data: 'nomeEquipamento' },
					{ data: 'nomeCategoria' },
					{ data: 'estadoEquipamento' },
					{
						data: 'idEquipamento', // can be null or undefined
						"defaultContent": ""
					}
				],
				columnDefs: [
					{
						targets: [0], render: function (data) {
							return "<div class='hover_img'><a href='http://localhost:3000/uploads/" + data + ".png' target='_blank'>" + data + "<span><img src='http://localhost:3000/uploads/" + data + ".png' alt='" + data + "' height='150' /></span></a></div>"
						}
					},
					{
						targets: [4], render: function (data) {
							if (data == 1) {
								return "Ativo";
							} else {
								return "Desativado";
							}
						}
					},
					{
						targets: [5], render: function (data) {
							return "<button class='btn'  type='button' id='" + data + "' onClick=editarEquipamento('" + data + "')> <i class='far fa-edit'> </i> </button>"
						}
					}
				],
				"order": [[0, "desc"]]
			}
			);

		})
			.catch(error => alert(' Erro a colocar os dados na tabela equipamento ' + error.message));
	} else {
		window.location.replace("index.html");
	}

});


function editarEquipamento(id) {
	//alert(id);
	// Get the modal

	fetch("http://localhost:3000/equipamentos/" + id, {
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

				throw new Error(" Erro a receber dados da BD da tabela equipamentos (F: editarEquipamento) ");
			}
		}
	).then(result => {


		var idText = document.getElementById("idEquipamentoEditar");
		var codigoText = document.getElementById("idCodigoEditar");
		var nomeText = document.getElementById("nomeEquipamentoEditar");
		var comboC = document.getElementById("comboCategoriaEditar");
		var estadoCheck = document.getElementById("checkBoxEquipamentoEditar");


		idText.value = result.data[0].idEquipamento;
		idText.disabled = true;

		codigoText.value = result.data[0].codigoLongo;

		nomeText.value = result.data[0].nomeEquipamento;

		

		if (result.data[0].estadoEquipamento == 1) {
			estadoCheck.checked = true;
		} else {
			estadoCheck.checked = false;
		}


	})
		.catch(error => alert(' Erro a colocar dados (F: editarEquipamento)' + error.message));



	var modal = document.getElementById("myModal");

	// Get the button that opens the modal
	var btn = document.getElementById(id);

	// Get the <span> element that closes the modal
	var span = document.getElementById("closeEquipamentosEditar");

	// When the user clicks on the button, open the modal
	modal.style.display = "block";

	// When the user clicks on <span> (x), close the modal
	span.onclick = function () {
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
};

$('#botaoEquipamentoEditar').click(function () {


	$("#erroCategoriaEditar").hide();


	var idText = document.getElementById("idEquipamentoEditar").value;
	var codigoText = document.getElementById("idCodigoEditar").value;
	var nomeText = document.getElementById("nomeEquipamentoEditar").value;
	var comboC = document.getElementById("comboCategoriaEditar");
	var estadoCheck = document.getElementById("checkBoxEquipamentoEditar");
	var checkF = 0;


	const formData = new FormData();

	if (estadoCheck.checked) {
		checkF = 1;
	}


	formData.append("idEquipamento", idText);
	formData.append("codigoLongo", codigoText);
	formData.append("nomeEquipamento", nomeText);
	formData.append("idCategoria", comboC[comboC.selectedIndex].id);
	formData.append("estadoEquipamento", checkF);
	formData.append("imagemEquipamento", document.getElementById('myFileUpdate').files[0]);

	console.log(formData.values());
	//var form = { "idEquipamento": idText.value, "codigoLongo": codigoText.value, "nomeEquipamento": nomeText.value, "estadoEquipamento": checkF };



	if (comboC[comboC.selectedIndex].value == "") {
		//console.log("Erro Op")
		$("#erroCategoriaEditar").show();
		$("#formEquipamento").effect("shake");

	}else{

		fetch("http://localhost:3000/equipamentos/" + idText, {
			/*
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json; charset=utf-8'
			},*/
			method: 'PUT',
			body: formData
		}).then(
			response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(" Erro a receber dados da BD da tabela equipamentos (F: botaoEquipamento) ");
				}
			}
		).then(result => {
	
			location.reload();
	
		});
	}



});

// Call the dataTables jQuery plugin
$(document).ready(function () {

	if (sessionStorage.getItem('loggedIn') == 'true') {

		fetch("http://localhost:3000/operadores/view", {
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

					throw new Error(" Erro a receber dados da BD da tabela operadores ");
				}
			}
		).then(result => {



			$('#dataTableOperador thead tr').clone(true).appendTo('#dataTableOperador thead');
			$('#dataTableOperador thead tr:eq(1) th').each(function (i) {
				var title = $(this).text();
				$(this).html('<input type="text" placeholder="Pesquisar ' + title + '" />');

				$('input', this).on('keyup change', function () {
					if (table.column(i).search() !== this.value) {
						table.column(i).search(this.value).draw();
					}
				});
			});



			var table = $('#dataTableOperador').DataTable({
				data: result.data,
				orderCellsTop: true,
				fixedHeader: true,
				"createdRow": function (row, data, dataIndex) {
					if (data.estadoOperador == 1) {
						$(row).addClass('greenClass');
					} else {
						$(row).addClass('redClass');
					}
				},
				columns: [
					{ data: 'idOperador' },
					{ data: 'nomeOperador' },
					{ data: 'estadoOperador' },
					{
						data: 'idOperador', // can be null or undefined
						"defaultContent": ""
					}
				],
				columnDefs: [
					{
						targets: [2], render: function (data) {
							if (data == 1) {
								return "Ativo";
							} else {
								return "Desativado";
							}
						}
					},
					{
						targets: [3], render: function (data) {
							return "<button class='btn btn-dark'  type='button' id='" + data + "' onClick=editarOperador(" + data + ")> <i class='fas fa-user-edit'> </i> </button>"
						}
					}
				],
				"order": [[0, "desc"]]
			}
			);

		})
			.catch(error => alert(' Erro a colocar os dados na tabela operadores ' + error.message));
	} else {
		window.location.replace("index.html");
	}

});


function editarOperador(id) {
	//alert(id);
	// Get the modal

	fetch("http://localhost:3000/operadores/" + id, {
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

		console.log(result.data)
		

		var idText = document.getElementById("idOperadorEditar");
		var nomeText = document.getElementById("nomeOperadorEditar");
		var estadoCheck = document.getElementById("checkBoxOperadorEditar");



		idText.value = result.data[0].idOperador;
		idText.disabled = true;

		nomeText.value = result.data[0].nomeOperador;


		if (result.data[0].estadoOperador == 1) {
			estadoCheck.checked = true;
		} else {
			estadoCheck.checked = false;
		}


	}).catch(error => alert(' Erro a colocar dados na tabela operadores' + error.message));



	var modal = document.getElementById("myModal");

	// Get the button that opens the modal
	//var btn = document.getElementById(id);

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

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

$('#botaoOperador').click(function () {


	var idText = document.getElementById("idOperadorEditar");
	var nomeText = document.getElementById("nomeOperadorEditar");
	var estadoCheck = document.getElementById("checkBoxOperadorEditar");
	var checkF = 0;

	if (estadoCheck.checked) {
		checkF = 1;

	}


	var form = { "idOperador": idText.value, "nomeOperador": nomeText.value, "estadoOperador": checkF };


	fetch("http://localhost:3000/operadores/" + idText.value, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=utf-8'
		},
		method: 'PUT',
		body: JSON.stringify(form)
	}).then(
		response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error(" Erro a atualizar dados da BD da tabela operadores ");
			}
		}
	).then(result => {

		location.reload();

	});


});

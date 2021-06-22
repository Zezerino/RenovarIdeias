// Call the dataTables jQuery plugin
$(document).ready(function() {

	moment.locale('pt');

	moment.updateLocale('pt', {
		months : [
		"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
		"Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
		]
	});

	fetch("http://localhost:3000/movimentos/view",{
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
			throw new Error("Erro a receber dados da BD da tabela movimentos");
		}
	}
	).then(result=>{
		

		$('#dataTableMovimentacoes thead tr').clone(true).appendTo('#dataTableMovimentacoes thead');
		$('#dataTableMovimentacoes thead tr:eq(1) th').each(function (i) {
			var title = $(this).text();
			$(this).html('<input type="text" placeholder="Pesquisar ' + title + '" />');

			$('input', this).on('keyup change', function () {
				if (table.column(i).search() !== this.value) {
					table.column(i).search(this.value).draw();
				}
			});
		});


		
		var table = $('#dataTableMovimentacoes').DataTable({
			data: result.data,
			"createdRow": function( row, data, dataIndex){
				if( data.tipo ==  'entrada' || data.tipo ==  'Entrada'){
					$(row).addClass('greenClass');
				}else{
					$(row).addClass('redClass');
				}
			},
			columns: [
			{ data: 'tipo' },
			{ data: 'data'},
			{ data: 'nomeOperador' },
			{ data: 'nomeObra'},
			{ data: 'nomeEquipamento'},
			{ data: 'estadoFunciona'},
			{ data: 'estadoLimpo'}
			],
			columnDefs: [
			{ targets: [1], render:function(data){return moment(data).format('LL HH:mm');}},
			{ targets: [5], render:function(data){
				if(data == "Funciona" || data.tipo ==  'funciona' ){
					return  "<i class='fas fa-check d-flex justify-content-center mt-1'></i>";
				}else{
					return "";
				}
			}},
			{ targets: [6], render:function(data){
				if(data == "Limpo" || data.tipo ==  'limpo'){
					return  "<i class='fas fa-check d-flex justify-content-center mt-1'></i>";
				}else{
					return "";
				}
			}
		}
		],		
		"order": [[ 1, "desc" ]]
	}
	);

	})
	.catch(error => alert(' Erro a colocar os dados na tabela ' + error.message));



});

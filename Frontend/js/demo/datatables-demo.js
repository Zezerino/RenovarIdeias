// Call the dataTables jQuery plugin
$(document).ready(function() {

	moment.locale('pt');

	moment.updateLocale('pt', {
    months : [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]
	});

  	fetch("http://localhost:3000/movimentacoes/view",{
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
		
		console.log(result.data[0]);
		console.log(moment(result.data[0].data).format('MMMM Do YYYY'));

		$('#dataTableMovimentacoes').DataTable({
			data: result.data,
			columns: [
			{ data: 'tipo' },
			{ data: 'Data'},
			{ data: 'nomeOperador' },
			{ data: 'nomeObra'},
			{ data: 'nomeEquipamento'},
			{ data: 'EstadoNaEntregaFunciona'},
			{ data: 'EstadoNaEntregaLimpar'}
			],
			columnDefs: [
       		 	{ targets: [1], render:function(data){return moment(data).format('MMMM Do YYYY');}}	
    		],		
			"order": [[ 2, "desc" ]]
		}
		);

	})
	.catch(error => alert('Error! ' + error.message));



});

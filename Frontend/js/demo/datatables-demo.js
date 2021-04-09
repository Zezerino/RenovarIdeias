// Call the dataTables jQuery plugin
$(document).ready(function() {

  	fetch("http://25.83.4.101:3000/movimentacoes/view",{
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
		
		console.log(result.data);

		$('#dataTableMovimentacoes').DataTable({
			data: result.data,
			columns: [
			{ data: 'tipo' },
			{ data: 'Data' },
			{ data: 'nomeOperador' },
			{ data: 'nomeObra'},
			{ data: 'nomeEquipamento'},
			{ data: 'EstadoNaEntregaFunciona'},
			{ data: 'EstadoNaEntregaLimpar'}
			],
			"order": [[ 2, "desc" ]]
		}
		);

	})
	.catch(error => alert('Error! ' + error.message));



});

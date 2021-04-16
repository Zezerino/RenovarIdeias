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
		
		//console.log(result.data[0]);
		//console.log(moment(result.data[0].data).format('LLL'));

		
		$('#dataTableMovimentacoes').DataTable({
			data: result.data,
			"createdRow": function( row, data, dataIndex){
				console.log(row);
                if( data.tipo ==  'entrada' || data.tipo ==  'Entrada'){
                    $(row).addClass('greenClass');
                }else{
                	$(row).addClass('redClass');
                }
            },
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
       		 	{ targets: [1], render:function(data){return moment(data).format('LLL');}},
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
	.catch(error => alert('Error! ' + error.message));



});

$(document).ready(function() {


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
	
		function hideSearchInputs(columns) {
			for (i=0; i<columns.length; i++) {
			  if (columns[i]) {
				$('.filterhead:eq(' + i + ')' ).show();
			  } else {
				$('.filterhead:eq(' + i + ')' ).hide();
			  }
			}
		  }
		  
		  var table = $('#dataTableMovimentacoes').DataTable({
				data: result.data,
				columns: [
					{ data: 'tipo' },
					{ data: 'data'},
					{ data: 'nomeOperador' },
					{ data: 'nomeObra'},
					{ data: 'nomeEquipamento'},
					{ data: 'estadoFunciona'},
					{ data: 'estadoLimpo'}
					],
			  	orderCellsTop: true,
				dom: 'Bfrtip',
				"createdRow": function( row, data, dataIndex){
					if( data.tipo ==  'entrada' || data.tipo ==  'Entrada'){
						$(row).addClass('greenClass');
					}else{
						$(row).addClass('redClass');
					}
				},
				responsive: {
					details: {
						display: $.fn.dataTable.Responsive.display.modal( {
							header: function ( row ) {
								var data = row.data();
								return 'Detalhes ';
							}
						} ),
						renderer: $.fn.dataTable.Responsive.renderer.tableAll()
					}
				},
				scrollY:        500,
				scrollCollapse: true,
				scroller:       true,
				buttons: [
					'excel', 'pdf'
				],
				columnDefs: [
					{ targets: [1], render:function(data){return moment(data).format('YYYY/MM/DD, HH:mm');}}, 
				],					
				"order": [[ 1, "desc" ]],
				initComplete: function () {
				  var api = this.api();
					$('.filterhead', api.table().header()).each( function (i) {
					  var column = api.column(i);
						var select = $('<select><option value=""></option></select>')
							.appendTo( $(this).empty() )
							.on( 'change', function () {
								var val = $.fn.dataTable.util.escapeRegex(
									$(this).val()
								);
		 
								column
									.search( val ? '^'+val+'$' : '', true, false )
									.draw();
							} );
		 
						column.data().unique().sort().each( function ( d, j ) {
							select.append( '<option value="'+d+'">'+d+'</option>' );
						} );
					} );
				  hideSearchInputs(api.columns().responsiveHidden().toArray());
				}
			} );
		  
			table.on( 'responsive-resize', function ( e, datatable, columns ) {
				hideSearchInputs( columns );
		   
			} );
	
	}) //result end
	.catch(error => alert(' Erro a colocar os dados na tabela ' + error.message));




	



	  
	
  });
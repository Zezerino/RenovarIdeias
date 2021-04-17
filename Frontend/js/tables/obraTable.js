// Call the dataTables jQuery plugin
$(document).ready(function() {


  	fetch("http://localhost:3000/obras/view",{
		headers:{
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=utf-8'
		},       
		method: 'GET'
	}).then(
	response=>{
		if(response.ok){
					//console.log("cenas1");

			return response.json();
		}else{
					//console.log("cenas2");

			throw new Error("something went wrong");
		}
	}
	).then(result=>{
		
		
		$('#dataTableObras').DataTable({
			data: result.data,
			"createdRow": function( row, data, dataIndex){
				if( data.estadoObra == 1){
					$(row).addClass('greenClass');
				}else{
					$(row).addClass('redClass');
				}
			},
			columns: [
			{ data: 'idObra' },
			{ data: 'nomeObra'},
			{ data: 'localObra' },
			{ data: 'estadoObra'},
			{ data: 'idObra', // can be null or undefined
			"defaultContent": ""
		}
		],
		columnDefs: [
		{ targets: [3], render:function(data){
			if(data == 1){
				return  "Ativo";
			}else{
				return "Desativado";
			}
		}
	},
	{ targets: [4], render:function(data){
		return "<button class='btn'  type='button' id='"+ data + "' onClick=editarObra("+ data +")> <i class='far fa-edit'> </i> </button>"
	}
}
],		
"order": [[ 0, "desc" ]]
}
);

	})
	.catch(error => alert('Error! ' + error.message));

//"<i class='far fa-edit' id='"+ data.idObra + "'></i>"

});


function editarObra(id){
	alert(id);
};
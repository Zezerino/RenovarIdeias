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
	//alert(id);
// Get the modal

fetch("http://localhost:3000/obras/"+ id,{
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
					//console.log("cenas2");

					throw new Error("something went wrong");
				}
			}
			).then(result=>{

				console.log(result.data)

				var idText = document.getElementById("idObraEditar");
				var nomeText = document.getElementById("nomeObraEditar");
				var localText = document.getElementById("localObraEditar");
				var estadoCheck = document.getElementById("checkBoxObraEditar");


				idText.value = result.data[0].idObra;
				idText.disabled = true;

				nomeText.value = result.data[0].nomeObra;
				localText.value = result.data[0].localObra;


				if(result.data[0].estadoObra == 1){
					estadoCheck.checked = true;
				}else{
					estadoCheck.checked = false;
				}


			})
			.catch(error => alert('Error! ' + error.message));



			var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById(id);

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
};

$('#botaoObra').click(function(){




	var idText = document.getElementById("idObraEditar");
	var nomeText = document.getElementById("nomeObraEditar");
	var localText = document.getElementById("localObraEditar");
	var estadoCheck = document.getElementById("checkBoxObraEditar");
	var checkF = 0;

	console.log(estadoCheck.checked)

	if(estadoCheck.checked){
  		checkF = 1;

  	}


	var form = {"idObra":idText.value, "nomeObra":nomeText.value, "localObra":localText.value, "estadoObra":checkF};

	console.log(form);

	fetch("http://localhost:3000/obras/" + idText.value,{
		headers:{
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=utf-8'
		},       
		method: 'PUT',
		body: JSON.stringify(form)
	}).then(
	response=>{
		if(response.ok){
			return response.json();
		}else{
			throw new Error("something went wrong 1");
		}
	}
	).then(result=>{
		
		location.reload();
		console.log("fixe");


	});


});

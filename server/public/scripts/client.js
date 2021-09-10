console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  clickListeners();
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

//listens for clicks on any buttons/inputs
function clickListeners() {
  $( '#addButton' ).on( 'click', postKoala);
  $('#viewKoalas').on('click', '.koala-transfer', updateTransfer);
  $('#viewKoalas').on('click', '.koala-delete', deleteKoala)
}

//adds the new koala from the inputs when #addButton is clicked
function postKoala() {
  console.log( 'in addButton on click' );
  let koalaToSend = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    readyForTransfer: ($('#readyForTransferIn').val().toLowerCase() === 'y'), //returns true or false if input is 'y' or 'n' respectively
    notes: $('#notesIn').val(),
  };
  console.log(koalaToSend)
  $('input').val('');
  // call saveKoala with the new obejct
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: koalaToSend,
    }).then(function(response) {
      console.log('Response from server.', response);
      getKoalas();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add koala.');
    });
}; 

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $('#viewKoalas').empty();
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function(response){
      console.log('Get /koalas response',  response);
      
      for(let i = 0; i < response.length; i++){
       
        $('#viewKoalas').append(`
            <tr>
                <td>${response[i].name}</td>
                <td>${response[i].age}</td>
                <td>${response[i].gender}</td>
                <td>${(response[i].ready_to_transfer ? "Y" : "N")}</td>
                <td>${response[i].notes}</td>
                <td>
                  ${(response[i].ready_to_transfer ? "" : `
                   <button data-id="${response[i].id}" class="koala-transfer">
                            Ready for Transfer
                   </button>
                   `)}
                </td>
                <td>
                   <button data-id="${response[i].id}" class="koala-delete">
                            Delete
                   </button>
                </td>
            </tr>
        
        `)
      }

  })
  // ajax call to server to get koalas
  
} // end getKoalas

//Updates koalas to be ready for transfer
function updateTransfer(){
  const koalaId = $(this).data('id');
  console.log(koalaId);
  $.ajax({
      method: 'PUT',
      url: `/koalas/${koalaId}`,
  }).then( function(response){
      console.log('Koala Ready for transfer!');
      getKoalas();
  }).catch (function (error){
      alert('Something went wrong!');
      console.log('Error in PUT', error);
  });
}

//Deletes Koalas
function deleteKoala(){
  const koalaId = $(this).data('id');
  console.log(koalaId);
  $.ajax({
      method: 'DELETE',
      url: `/koalas/${koalaId}`,
  }).then( function(response){
      console.log('koala removed!')
      getKoalas();
  }).catch (function (error){
      alert('Something went wrong!');
      console.log('Error in DELETE', error);
  });
}

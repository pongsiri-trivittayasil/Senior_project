/*------------------------------
	Modal Login
------------------------------*/
$('#edit-map').hide();
$('#saving').hide();

$('#botton_login').on('click',function(){
	$('#modal_login').modal('show');
});

$('#form_login').submit(function(e){
  var data_form = $('#form_login').serialize();
    $.post("/login",data_form, function(data, status){
      if(data == "refresh"){
        location.reload();
      }
      if(data == "error"){
        document.getElementById("error").innerHTML = "invalid username or password";
      }
    });
	e.preventDefault();
});
// switch edit map
$('#switch_edit_map').on('click',function(){
  $('#edit-map').slideToggle(500);
  // $('#edit-map').fadeToggle(500);
});// switch edit map

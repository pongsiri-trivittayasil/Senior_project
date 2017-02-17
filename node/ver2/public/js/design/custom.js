/*------------------------------
	Modal Login
------------------------------*/
$('#edit-map').hide();
$('#saving').hide();

$('#button_login').on('click',function(){
  console.log('test');
  $('#modal_login').modal('show');
});

$('#form_login').submit(function(e){
  var data_form = $('#form_login').serialize();
    $.post("/login",data_form, function(data, status){
      if(data == "refresh"){
        window.location.href = '/choose_map';
      }
      if(data == "error"){
        document.getElementById("error").innerHTML = "invalid username or password";
      }
    });
  e.preventDefault();
});
/*------------------------------
  Modal Signup
------------------------------*/
$('#button_signup').on('click',function(){
  $('#modal_Signup').modal('show');
});
$('#form_signup').submit(function(e){
  var data_form = $('#form_signup').serialize();
    $.post("/signup",data_form, function(data, status){
      if(status == 'success'){
        location.reload();
      }
    });
  e.preventDefault();
});
/*------------------------------
  Modal Signup
------------------------------*/
// switch edit map
$('#switch_edit_map').on('click',function(){
  $('#edit-map').slideToggle(500);
  // $('#edit-map').fadeToggle(500);
});// switch edit map

/*------------------------------
  Modal add room
------------------------------*/
$('#addmap').on('click',function(){
  $('#modal-newmap').modal('show');
});// switch edit map


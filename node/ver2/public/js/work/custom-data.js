/*------------------------------
  Modal Edit
------------------------------*/
// edit control
$('[id^="edit-control"]').each(function(){
	$(this).on('click',function(){
		$('#modal-edit-control').modal('show');
		//old name
		var oldname = $(this).closest('tr').find('#control-name').html();
		var modal = $('#modal-edit-control');
		modal.find('#oldname').val(oldname);
		modal.find('#oldname-set').val(oldname);
	});
});

$('#form-edit-control').submit(function(e){
  var data_form = $('#form-edit-control').serialize();
  console.log(data_form);
  $.post("/editcontrol",data_form, function(data, status){
        console.log(status);
        $('#modal-edit-control').hide();
        location.reload();
  });
  e.preventDefault();
});

// edit tag
$('[id^="edit-tag"]').each(function(){
	$(this).on('click',function(){
		$('#modal-edit-tag').modal('show');
		//old name
		var oldname = $(this).closest('tr').find('#tag-name').html();
		var modal = $('#modal-edit-tag');
		modal.find('#oldname').val(oldname);
		modal.find('#oldname-set').val(oldname);
	});
});

$('#form-edit-tag').submit(function(e){
  var data_form = $('#form-edit-tag').serialize();
  console.log(data_form);
  $.post("/edittag",data_form, function(data, status){
        console.log(status);
        $('#modal-edit-tag').hide();
        location.reload();
  });
  e.preventDefault();
});

// edit room
$('[id^="edit-room"]').each(function(){
	$(this).on('click',function(){
		$('#modal-edit-room').modal('show');
		//old name
		var oldname = $(this).closest('tr').find('#room-name').html();
		var modal = $('#modal-edit-room');
		modal.find('#oldname').val(oldname);
		modal.find('#oldname-set').val(oldname);
	});
});

$('#form-edit-room').submit(function(e){
  var data_form = $('#form-edit-room').serialize();
  console.log(data_form);
  $.post("/editroom",data_form, function(data, status){
        console.log(status);
        $('#modal-edit-room').hide();
        location.reload();
  });
  e.preventDefault();
});

// edit ap
$('[id^="edit-ap"]').each(function(){
	$(this).on('click',function(){
		$('#modal-edit-ap').modal('show');
		//old name
		var oldname = $(this).closest('tr').find('#ap-name').html();
		var modal = $('#modal-edit-ap');
		modal.find('#oldname').val(oldname);
		modal.find('#oldname-set').val(oldname);
	});
});

$('#form-edit-ap').submit(function(e){
  var data_form = $('#form-edit-ap').serialize();
  console.log(data_form);
  $.post("/editap",data_form, function(data, status){
        console.log(status);
        $('#modal-edit-ap').hide();
        location.reload();
  });
  e.preventDefault();
});

/*------------------------------
  Modal Delete
------------------------------*/


// delete control
$('[id^="delete-control"]').each(function(){
	$(this).on('click',function(){
		$('#modal-delete-control').modal('show');
		//old name
		var name = $(this).closest('tr').find('#control-name').html();
		var modal = $('#modal-delete-control');
		modal.find('#name').val(name);
		modal.find('#name-set').val(name);
	});
});
$('#form-delete-control').submit(function(e){
  var data_form = $('#form-delete-control').serialize();
  console.log(data_form);
  $.post("/removecontrol",data_form, function(data, status){
        console.log(status);
        $('#modal-delete-control').hide();
        location.reload();
  });
  e.preventDefault();
});

// delete tag
$('[id^="delete-tag"]').each(function(){
	$(this).on('click',function(){
		$('#modal-delete-tag').modal('show');
		//old name
		var name = $(this).closest('tr').find('#tag-name').html();
		var modal = $('#modal-delete-tag');
		modal.find('#name').val(name);
		modal.find('#name-set').val(name);
	});
});
$('#form-delete-tag').submit(function(e){
  var data_form = $('#form-delete-tag').serialize();
  console.log(data_form);
  $.post("/removetag",data_form, function(data, status){
        console.log(status);
        $('#modal-delete-tag').hide();
        location.reload();
  });
  e.preventDefault();
});

// delete room
$('[id^="delete-room"]').each(function(){
	$(this).on('click',function(){
		$('#modal-delete-room').modal('show');
		//old name
		var name = $(this).closest('tr').find('#room-name').html();
		var modal = $('#modal-delete-room');
		modal.find('#name').val(name);
		modal.find('#name-set').val(name);
	});
});
$('#form-delete-room').submit(function(e){
  var data_form = $('#form-delete-room').serialize();
  console.log(data_form);
  $.post("/removeroom",data_form, function(data, status){
        console.log(status);
        $('#modal-delete-room').hide();
        location.reload();
  });
  e.preventDefault();
});


// delete ap
$('[id^="delete-ap"]').each(function(){
	$(this).on('click',function(){
		$('#modal-delete-ap').modal('show');
		//old name
		var name = $(this).closest('tr').find('#ap-name').html();
		var modal = $('#modal-delete-ap');
		modal.find('#name').val(name);
		modal.find('#name-set').val(name);
	});
});
$('#form-delete-ap').submit(function(e){
  var data_form = $('#form-delete-ap').serialize();
  console.log(data_form);
  $.post("/removeap",data_form, function(data, status){
        console.log(status);
        $('#modal-delete-ap').hide();
        location.reload();
  });
  e.preventDefault();
});




/*------------------------------
  Modal add
------------------------------*/
// set modal body hide
$('#modal-body-control').hide();
$('#modal-body-tag').hide();
$('#modal-body-room').hide();
$('#modal-body-ap').hide();


$('#modal_add').on('hide.bs.modal', function (event) {
	$('#modal-body-control').hide();
	$('#modal-body-tag').hide();
	$('#modal-body-room').hide();
	$('#modal-body-ap').hide();
})

// control
$('#control_add').on('click',function(){
	$('#modal-body-control').show();
	$('#modal_add').modal('show');
	var modal = $('#modal_add');
	modal.find('.modal-title').text('Add Control');
});
$('#form_add_control').submit(function(e){
  var data_form = $('#form_add_control').serialize();
  console.log(data_form);
  $.post("/createcontrol",data_form, function(data, status){
        console.log(status);
        $('#modal_add').modal('hide');
        $('#modal-body-control').hide();
        location.reload();
  });
  e.preventDefault();
});

//tag
$('#tag_add').on('click',function(){
  $('#modal-body-tag').show();
  $('#modal_add').modal('show');
    var modal = $('#modal_add');
    modal.find('.modal-title').text('Add Tag');
});
$('#form_add_tag').submit(function(e){
  var data_form = $('#form_add_tag').serialize();
  console.log(data_form);
  $.post("/createtag",data_form, function(data, status){
        console.log(status);
        $('#modal_add').modal('hide');
        $('#modal-body-control').hide();
        location.reload();
  });
  e.preventDefault();
});

//room
$('#room_add').on('click',function(){
  $('#modal-body-room').show();
  $('#modal_add').modal('show');
    var modal = $('#modal_add');
    modal.find('.modal-title').text('Add Room');
});
$('#form_add_room').submit(function(e){
  var data_form = $('#form_add_room').serialize();
  console.log(data_form);
  $.post("/createroom",data_form, function(data, status){
        console.log(status);
        $('#modal_add').modal('hide');
        $('#modal-body-control').hide();
        location.reload();
  });
  e.preventDefault();
});


$('#ap_add').on('click',function(){
  $('#modal-body-ap').show();
  $('#modal_add').modal('show');
    var modal = $('#modal_add');
    modal.find('.modal-title').text('Add AP');
});

$('#form_add_ap').submit(function(e){
  var data_form = $('#form_add_ap').serialize();
  console.log(data_form);
  $.post("/createap",data_form, function(data, status){
        console.log(status);
        $('#modal_add').modal('hide');
        $('#modal-body-ap').hide();
        location.reload();
  });
  e.preventDefault();
});



/*------------------------------
  End page loding
------------------------------*/
$("#preloader").fadeOut("slow");
var newrule = "<div id='list'><div class='if'><p>if</p></div><div class='choice-box'><div class='choice' id='time'><p>time<p></div><div class='choice' id='tag'><p>Tag<p></div></div></div>";


// $("#add-down").on('click', function(){
// 	console.log('ok');
// 	$( "#rule-list" ).append( $( "<div id='list'><div class='if'><p>if</p></div></div>" ) );
// });


$("#add-right").on('click', function(){
	console.log('ok');
	$(this).parent().append( $("<div class='if'><p>if</p></div>"));
	$(this).remove();
	// $(this).fadeOut("slow");
});

// new rule
$("#add-down").on('click', function(){
	console.log('ok');
	$( "#rule-list" ).append( $( newrule ));
});

// for all id click new dom element
$(document).on('click', '#time', function(e) {
	// console.log('new f');
	//do whatever
});


/*--------------------------------------------------------------------------------------------------------------------------*/


/*------------------------------
  init if choice
------------------------------*/
$('#modal-add-rule').modal('show');
var if_time = "<div class='row list' id='if-time'><div class='col-md-2'>Time</div><div class='col-md-6'id='if-time'><input class='form-control timepicker'type='text' id='val-time'></div><div class='col-md-4'style='text-align:right'><i class='fa fa-times remove'aria-hidden='true'></i></div></div>";
var if_tag = "<div class='row list'id='if-tag'><div class='col-md-1' >Tag</div><div class='col-md-4' ><select class='selectpicker' id='tag-name'><option>tag1</option><option>tag2</option></select></div><div class='col-md-1'>in</div><div class='col-md-4' ><select class='selectpicker'id='room-name'><option>room</option></select></div><div class='col-md-2' style='text-align:right'><i class='fa fa-times remove' aria-hidden='true'></i></div></div>";
var if_date = "<div class='row list' id='if-date'><div class='col-md-2' >Date</div><div class='col-md-6 '><input class='form-control datepicker' type='text' id='val-date'></div><div class='col-md-4' style='text-align:right'><i class='fa fa-times remove' aria-hidden='true'></i></div></div>";
var if_day = "<div class='row list' id='if-day'><div class='col-md-2' >Day</div><div class='col-md-6'><select class='selectpicker' id='val-day'><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option><option>Sunday</option></select></div><div class='col-md-4' style='text-align:right'><i class='fa fa-times remove' aria-hidden='true'></i></div></div>";
var then_line = "<div class='row list' id='then-line'><div class='col-md-1' >Line</div><div class='col-md-4' ><select class='selectpicker'><option>token</option></select></div><div class='col-md-2'>Message</div><div class='col-md-4'><input type='text' class='form-control' id='formGroupExampleInput' placeholder='Example input'></div><div class='col-md-1' style='text-align:right'><i class='fa fa-times remove' aria-hidden='true'></i></div></div>";
var then_control = "<div class='row list' id='then-control'><div class='col-md-2'>Control</div><div class='col-md-4' ><select class='selectpicker'><option>control name</option></select></div><div class='col-md-4' ><select class='selectpicker'><option>on</option><option>off</option></select></div><div class='col-md-2' style='text-align:right'><i class='fa fa-times remove' aria-hidden='true'></i></div></div>";


/*------------------------------
  button add new rule
------------------------------*/
// show modal
$('#add-rule').on('click',function(){
	console.log('ok');
	$('#modal-add-rule').modal('show');
});

/*------------------------------
  button choose if choice
------------------------------*/
// if tag
$('#if-button-tag').on('click',function(){
	console.log('tag');
	$('#if-list').append( $(if_tag)).slideDown("fast");
	// $(rule_tag).appendTo($('.if-list')).slideDown("slow");
	$('.selectpicker').selectpicker();
});
//  if time
$('#if-button-time').on('click',function(){
	console.log('time');
	// $('#if-list').append( $(if_time)).slideDown("fast");
	$(if_time).appendTo($('#if-list')).slideDown("slow");
	// set attp 
	$( ".timepicker" ).timepicker({
		showMeridian:false
	});
});
// if date
$('#if-button-date').on('click',function(){
	console.log('date');
	// $('#if-list').append( $(if_time)).slideDown("fast");
	$(if_date).appendTo($('#if-list')).slideDown("slow");
	// set attp
	$('.datepicker').datepicker({
		autoclose:true,
		calendarWeeks:true,
	    format: "dd/mm/yyyy",
	    todayHighlight: true
	});
});
// if day
$('#if-button-day').on('click',function(){
	console.log('day');
	$(if_day).appendTo($('#if-list')).slideDown("slow");
	$('.selectpicker').selectpicker();
});

/*------------------------------
  button choose then choice
------------------------------*/
$('#then-button-line').on('click',function(){
	console.log('line');
	$(then_line).appendTo($('#then-list')).slideDown("slow");
	$('.selectpicker').selectpicker();
});
$('#then-button-control').on('click',function(){
	console.log('control');
	$(then_control).appendTo($('#then-list')).slideDown("slow");
	$('.selectpicker').selectpicker();
});


/*------------------------------
  remove list
------------------------------*/
$(document).on('click', '.remove', function(e) {
	console.log('remove');
	$(this).parent().parent().remove();
	//do whatever
});

/*------------------------------
  button submit and cancel
------------------------------*/
$('#submit-modal').on('click',function(){
	var list_if = $('#if-list').children();
	for (i = 0; i < list_if.length; i++) { 
		console.log(list_if[i].id);
		// tag
		if(list_if[i].id == 'if-tag'){
			var tag_name = $(list_if[i]).find('#tag-name').val();
			var room_name = $(list_if[i]).find('#room-name').val();
			console.log("tag-name : "+String(tag_name)+" in room-name : " + String(room_name))
		}
		// time
		else if (list_if[i].id == 'if-time'){
			var val_time = $(list_if[i]).find('#val-time').val();
			console.log("time : " + String(val_time));
		}
		// date
		else if (list_if[i].id == 'if-date'){
			var val_date = $(list_if[i]).find('#val-date').val();
			console.log("date : " + String(val_date));
		}
		// day
		else if (list_if[i].id == 'if-day'){
			var val_day = $(list_if[i]).find('#val-day').val();
			console.log("day : " + String(val_day));
		}
		else {
			console.log('error');
		}



	}
	var list_then = $('#then-list').children()
	for (i = 0; i < list_then.length; i++) { 
		console.log(list_then[i].id);
	}


	// console.log($('#if-time').val());
	// console.log($('#if-date').val());
	// console.log($('#if-day').val());
});
$('#cancel-modal').on('click',function(){
	$('#if-list').children().remove();
	$('#then-list').children().remove();
	$('#modal-add-rule').modal('toggle');
});




/*------------------------------
  End page loding
------------------------------*/
$("#preloader").fadeOut("hide");



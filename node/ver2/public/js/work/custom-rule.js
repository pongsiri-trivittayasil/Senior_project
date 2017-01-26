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
	console.log('new f');
	//do whatever
});


/*--------------------------------------------------------------------------------------------------------------------------*/


/*------------------------------
  init if choice
------------------------------*/
$('#modal-add-rule').modal('show');
var if_time = "<div class='row list'><div class='col-md-2'>Time</div><div class='col-md-6 bfh-timepicker' data-time='now' id='if-time'></div><div class='col-md-4'style='text-align:right'><i class='fa fa-times remove'aria-hidden='true'></i></div></div>";
var if_tag = "<div class='col-md-6 bfh-timepicker' data-time='now' id='if-time'></div>";
var if_date = "";
var if_day = "";
var then_line = "";
var then_control = "";


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
$('#if-button-tag').on('click',function(){
	console.log('tag');
	$('#if-list').append( $(if_tag)).slideDown("fast");
	// $(rule_tag).appendTo($('.if-list')).slideDown("slow");
});
$('#if-button-time').on('click',function(){
	console.log('time');
	// $('#if-list').append( $(if_time)).slideDown("fast");
	$(if_time).appendTo($('#if-list')).slideDown("slow");
});

/*------------------------------
  remove list
------------------------------*/
var a;
$(document).on('click', '.remove', function(e) {
	console.log('remove');
	$(this).parent().parent().remove();
	//do whatever
});

/*------------------------------
  button submit for test
------------------------------*/
$('#submit').on('click',function(){
	console.log($('#if-time').val());
	console.log($('#if-date').val());
	console.log($('#if-day').val());
});




/*------------------------------
  End page loding
------------------------------*/
$("#preloader").fadeOut("slow");



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
// choice time
// $('[id^="time"]').each(function(){
// 	$(this).on('click',function(){
// 		console.log('test');
// 		// $(this).parent().append( $("<div class='if'><p>if</p></div>"));
// 	});
// });

$(document).on('click', '#time', function(e) {
	console.log('new f');
	//do whatever
});

$('#add-rule').on('click',function(){
	console.log('ok');
	$('#modal-add-rule').modal('show');
});
$('#if-tag').on('click',function(){
	// $('#if-list').append( $(rule_tag)).slideDown("fast");
	$(rule_tag).appendTo($('.if-list')).slideDown("slow");
});
var rule_tag = "<div class='row rule-if'>test</div>"

	$('#rule-tag').remove();
	$('#modal-add-rule').modal('show');

/*------------------------------
  End page loding
------------------------------*/
$("#preloader").fadeOut("slow");


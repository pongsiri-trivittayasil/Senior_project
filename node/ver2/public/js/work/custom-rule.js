


$("#add-down").on('click', function(){
	console.log('ok');
	$( "#rule-list" ).append( $( "<div id='list'><div class='if'><p>if</p></div></div>" ) );
});


$("#add-right").on('click', function(){
	console.log('ok');
	$(this).parent().append( $("<div class='if'><p>if</p></div>"));
	$(this).remove();
	// $(this).fadeOut("slow");
});



/*------------------------------
  End page loding
------------------------------*/
$("#preloader").fadeOut("slow");


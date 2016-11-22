$("table tr").click(function(){
	console.log("selected");
	$(this).addClass('selected').siblings().removeClass('selected');    
});

$("#add_control").on('click', function(){
	var data;
	var name = prompt("Please enter your name control","");
	data = {"Control_Name":name};
    $.post("/createcontrol",data, function(data, status){
    	console.log(status);
    });
});

$("#edit_control").on('click', function(){
	var data;
	var oldname = $("#table_control tr.selected td:first").html();
	var newname = prompt("Please enter your name control","");
	data = {"oldname":oldname,"newname":newname};
    $.post("/editcontrol",data, function(data, status){
    	console.log(status);        
    });
    $("#table_control tr.selected td:first").text(newname);
});
$("#remove_control").on('click', function(){
	var data;
	var name = $("#table_control tr.selected td:first").html();
	data = {"name":name};
    $.post("/removecontrol",data, function(data, status){
    	console.log(status);        
    });
    $("#table_control tr.selected").remove();
});

$("#remove_control").on('click', function(){
	console.log($("#table_control tr.selected td:first").html());
    // $.post("/create",data, function(data, status){
        
    // });
});
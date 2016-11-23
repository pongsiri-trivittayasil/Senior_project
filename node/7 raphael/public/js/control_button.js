$("table tr").click(function(){
	console.log("selected");
	$(this).addClass('selected').siblings().removeClass('selected');    
});

//control-----------------------------------------------------------------------
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

//tag-----------------------------------------------------------------------
	$("#add_Tag").on('click', function(){
		var data;
		var name = prompt("Please enter your name control","");
		data = {"Tag_Name":name};
	    $.post("/createtag",data, function(data, status){
	    	console.log(status);
	    });
	});

	$("#edit_Tag").on('click', function(){
		var data;
		var oldname = $("#table_tag tr.selected td:first").html();
		var newname = prompt("Please enter your name Tag","");
		data = {"oldname":oldname,"newname":newname};
	    $.post("/edittag",data, function(data, status){
	    	console.log(status);        
	    });
	    $("#table_tag tr.selected td:first").text(newname);
	});
	$("#remove_Tag").on('click', function(){
		var data;
		var name = $("#table_tag tr.selected td:first").html();
		data = {"name":name};
	    $.post("/removetag",data, function(data, status){
	    	console.log(status);        
	    });
	    $("#table_tag tr.selected").remove();
	});
//room-----------------------------------------------------------------------
	$("#add_Room").on('click', function(){
		var data;
		var name = prompt("Please enter your name Room","");
		data = {"Room_Name":name};
	    $.post("/createroom",data, function(data, status){
	    	console.log(status);
	    });
	});

	$("#edit_Room").on('click', function(){
		var data;
		var oldname = $("#table_room tr.selected td:first").html();
		var newname = prompt("Please enter your name room","");
		data = {"oldname":oldname,"newname":newname};
	    $.post("/editroom",data, function(data, status){
	    	console.log(status);        
	    });
	    $("#table_room tr.selected td:first").text(newname);
	});
	$("#remove_Room").on('click', function(){
		var data;
		var name = $("#table_room tr.selected td:first").html();
		data = {"name":name};
	    $.post("/removeroom",data, function(data, status){
	    	console.log(status);        
	    });
	    $("#table_room tr.selected").remove();
	});
//ap-----------------------------------------------------------------------
	$("#add_AP").on('click', function(){
		var data;
		var name = prompt("Please enter your name AP","");
		data = {"AP_Name":name};
	    $.post("/createap",data, function(data, status){
	    	console.log(status);
	    });
	});

	$("#edit_AP").on('click', function(){
		var data;
		var oldname = $("#table_ap tr.selected td:first").html();
		var newname = prompt("Please enter your name AP","");
		data = {"oldname":oldname,"newname":newname};
	    $.post("/editap",data, function(data, status){
	    	console.log(status);        
	    });
	    $("#table_ap tr.selected td:first").text(newname);
	});
	$("#remove_AP").on('click', function(){
		var data;
		var name = $("#table_ap tr.selected td:first").html();
		data = {"name":name};
	    $.post("/removeap",data, function(data, status){
	    	console.log(status);        
	    });
	    $("#table_ap tr.selected").remove();
	});

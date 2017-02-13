/*------------------------------
	Initial Value
------------------------------*/
//image
var srcImg = "/img/"+nameMap+".jpg";
// var srcImg = "/img/{{map}}.jpg";
var pathJSON = "./map_json/"+nameMap+".json";
// var pathJSON = "./map_json/{{map}}.json";
var nameSave = nameMap;
//set grid,image,background,room,ap
var set_grid,set_background,set_room,set_ap,set_tag;
//set scale
var scale;
//set mouse
var mouseDownX=0,mouseDownY=0,mouseUpX=0,mouseUpY=0;
//save to json
var json
//set for grid
var setheight,setwidth;
// layer paper
var paper,image,paper_bg;
// create ap,room
var create_ap=false;create_room=false;
//select create
var room_selected,create_room_selected;
var ap_selected;
//new map ?
// var newmap = true;
if(newmap == 'False'){
	newmap = false;
} else {
	newmap = true;
}

// initial value
var temp_timer;
var set_init = [];


/*------------------------------
	window key up
------------------------------*/
function keyCommand(eve){
    switch(eve.key){
    	case "c":
    		json_call();
    		break
		case "h":
    		hide();
    		break
    	case "s":
    		json_save();
    		break
    	case "t":
    		toggle_create_ap();
    		break;
       case "r":
    		toggle_create_room();
    		break;
        case "Delete":
        	console.log("delete");
        	delete_room();
        	break;
	}
}
// window.addEventListener("keyup", keyCommand);

/*------------------------------
	Edit Map Option Switch
------------------------------*/
// switch image
$('#switch_image').attr('checked','checked')[0].checked = false;
$('#switch_grid').attr('checked','checked')[0].checked = false;
$('#switch_image').on('click',function(){
  var x = document.getElementById("switch_image").checked;
  if(x===true){show_background();}
  else{hide_background();}
});
// switch Grid
$('#switch_grid').on('click',function(){
  var x = document.getElementById("switch_grid").checked;
  if(x===true){show_grid();}
  else{hide_grid();}
});
// switch Room
$('#switch_room').on('click',function(){
  var x = document.getElementById("switch_room").checked;
  if(x===true){show_room();}
  else{hide_room();}
});
// switch AP
$('#switch_ap').on('click',function(){
  var x = document.getElementById("switch_ap").checked;
  if(x===true){show_ap();}
  else{hide_ap();}
});
// switch draw room
$('#switch_draw_room').on('click',function(){
	toggle_create_room();
	// $('#switch_draw_ap').attr('checked','checked')[0].checked = false;
	create_ap = false;
});
// switch draw ap
$('#switch_draw_ap').on('click',function(){
	toggle_create_ap();
	$('#switch_draw_room').attr('checked','checked')[0].checked = false;
	create_room = false;
});

/*------------------------------
	Edit Map  
------------------------------*/
$('#switch_edit_map').on('click',function(){
  var x = document.getElementById("switch_edit_map").checked;
  if(x !== true){
  	cant_draw();
  	room_deselect_all();
  	ap_deselect_all();
  }
});
//color
$('#colorselector').colorselector({
	callback: function (value, color, title) {
		if(room_selected){
			room_selected.attr({fill:color});
		}
		if(ap_selected){
			ap_selected.attr({fill:color});
		}
    }
});
// save
$('#paper_save').on('click',function(){
	save();
});
// delete
$('#delete').on('click',function(){
	if(room_selected){
		delete_room();	
	}
	if(ap_selected){
		delete_ap();
	}
});
// rename 
$('#button-rename').on('click',function(){
	if(room_selected){
		room_rename();
	}
	if(ap_selected){
		ap_rename();
	}
});
$('#button-initvalue').on('click',function(){
	if(room_selected){
		initvalue();
	}
});

/*------------------------------
	Initial Value
------------------------------*/
// $('#modal-initialvalue').modal('show'); // -------------------------------------------------- show immediately
// $('#init-choose-tag').html("<select class='selectpicker' id='choose-tag'><option value='1'>test</option><option value='3'>test</option></select>");
var initvalue = function(){
	$('#modal-initialvalue').modal('show');
	set_choose_tag();
}
$('#start-time').on('click',function(){
	$(".selectpicker").attr('disabled','disabled');
	var temp = $('#choose-tag');
	var fiveMinutes = 60*1,
	    display = $('#timer');
    microgear.chat('Server',temp.val()+',startinitValue');
    clearset();
	startTimer(fiveMinutes, display);	
});
$('#stop-time').on('click',function(){
	clearInterval(temp_timer);
	var temp = $('#choose-tag');
    microgear.chat('Server',temp.val()+',stopinitValue');
});
var set_choose_tag = function(){
	var temp = "<select class='selectpicker' id='choose-tag'>";
	$.post("/listtag",function(data,status){
		for (x in data){
			temp = temp +"<option value='"+String(data[x].Tag_id) +"''>"+String(data[x].Tag_name) +"</option>";
		}
		temp = temp + '</select>'
		$('#init-choose-tag').html(temp);
		$('.selectpicker').selectpicker();
	});
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    	temp_timer  = setInterval(function () {	// start setinterval
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + " : " + seconds);
        //start
        // done
        if (--timer < 0) {
        		clearInterval(temp_timer);
        		var temp = $('#choose-tag');
			    microgear.chat('Server',temp.val()+',stopinitValue');
        }
    }, 1000);
}
function clearset(){
	clearInterval(temp_timer);
	$('#timer').text('01 : 00');
	$('#avg-init').text('0');
	$('#set-init').text("");
	set_init = [];
}
function stopTimer(){
	clearset();
	$(".selectpicker").removeAttr('disabled');
	var temp = $('#choose-tag');
    microgear.chat('Server',temp.val()+',stopinitValue');
}
// submit init
$('#submit-init').on('click',function(){
	var data = {"Room_name":room_selected.attr('title'),"newinit":$('#avg-init').text()}
	console.log(data);
    $.post("/editroomInit",data, function(data, status){
		stopTimer();
    	console.log(status);
    	$('#modal-initialvalue').modal('hide');
    });
});
// cancel init
$('#cancel-init').on('click',function(){
	stopTimer();
    $('#modal-initialvalue').modal('hide');

});

/*------------------------------
	Save
------------------------------*/
var save = function(){
	// $('#switch_image').attr('checked','checked')[0].checked = true;
	// show_background();
	// $('#switch_grid').attr('checked','checked')[0].checked = true;
	// show_grid();
	// $('#switch_room').attr('checked','checked')[0].checked = true;
	// show_room();
	// $('#switch_ap').attr('checked','checked')[0].checked = true;
	// show_ap();

	cant_draw();
	//deselect all
	room_deselect_all();
	ap_deselect_all();
	json_save();	
	$("#saving").show();
}
var cant_draw = function(){
	$('#switch_draw_room').attr('checked','checked')[0].checked = false;
	create_ap = false;
	// $('#switch_draw_ap').attr('checked','checked')[0].checked = false;
	create_room = false;
}

/*------------------------------
	Onload
------------------------------*/
window.onload = function(){
	var newImg = new Image();
	newImg.src = srcImg;
	newImg.onload = function(){
		// console.log("done");
		//set value
		scale = getImgSize({height:newImg.height,width:newImg.width});
		// set height for grid
		setheight = Math.round(scale.height/10);
		// set width for grid
		setwidth = Math.round(scale.width/10);
		set_function_onload();
	};
}

var set_function_onload = function(){
	//set rapael
	paper = Raphael('map',scale.width,scale.height);
	mouse_room();
	mouse_ap();
	//function if no load
	set_background = paper.set();
	set_grid = paper.set();
	set_ap = paper.set();
	set_room = paper.set();
	set_tag = paper.set();
	if(newmap){
		// new client---------------------
		background();
		grid();
	} else {
		// old client------------------
		json_call();
	}
}


/*------------------------------
	Background + Image
------------------------------*/
var background = function(){
	//image
	image = paper.image(srcImg,0,0,scale.width,scale.height);
	image.toBack();
	set_background.push(image);
	//bg
	// paper_bg = paper.rect(0,0,scale.width,scale.height);
	// paper_bg.attr("stroke-width",4).attr("stroke","lightgray");
	// set_background.push(paper_bg);
	//attr
	attr_background(set_background);
}
var attr_background = function(set){
	for ( i=0;i<set.length;i++) {
    	set[i].setName ='set_background';
	}
}

//hide background
var hide_background = function(){
	set_background.hide();
}
//show grid
var show_background = function(){
	set_background.show();
}


/*------------------------------
	Grid
------------------------------*/
var grid = function(){
	for (var i=0;i<=setwidth;i++){
		for (var j=0;j<=setheight;j++){
			var point_grid = paper.circle(10*i,10*j,1.3);
			point_grid.id = String(i)+","+String(setheight-j);	
			set_grid.push(point_grid);
			//set ID
		}
	}
	attr_grid(set_grid);
}
var attr_grid = function(set){
	for ( i=0;i<set.length;i++) {
    	set[i].setName ='set_grid';
	}
	set.attr({
		fill:'red',
		stroke:'#fff',
		"stroke-width":0
	});
	// set.mouseover(function() {
 //        this.toFront();
 //        this.attr({
 //            cursor: 'pointer',
 //            fill: 'red',
 //            stroke: '#fff',
 //            'stroke-width': '0'
 //        });
 //        this.animate({
 //            transform: 's4'
 //        }, 200);
 //        //console.log(this.id);
 //    });
 //    //mouse out
 //    set.mouseout(function() {
 //        this.animate({
 //        	transform: 's1'
 //        }, 200);
 //        this.attr({
 //            fill: "red"
 //        });
 //    });
    //click
    set.click(function() {
		console.log(this.id);
        //document.getElementById("label") = c.id;
    });
}
//hide grid
var hide_grid = function(){
	create_ap = false;
	set_grid.hide();
}
//show grid
var show_grid = function(){
	set_grid.show();
}

/*------------------------------
	AP
------------------------------*/
var toggle_create_ap = function(){
	if(create_ap){
		console.log("close create ap done");
	}
	else{
		console.log("open create ap done");
	}
	create_ap = !create_ap;
}
var drawap = function(x,y){
	var ap = paper.circle(x,y,7);
	ap.id = String(x/10)+","+ String(setheight- (mouseDownY/10));
    ap.setName ='set_ap';
	ap.attr({
		fill:'#2980b9',
		cursor:'pointer',
		stroke: "#7f8c8d",
		"stroke-width":"0"
	});	
	attr_ap(ap);
	set_ap.push(ap);
	ap_save();
}
var setName_ap = function(set){
	for ( i=0;i<set.length;i++) {
    	set[i].setName ='set_ap';
	}
}
var attr_ap = function(set){
	set.click(function() {
		console.log(this.id);
		cant_draw();
		ap_selecting(this.id);
		ap_detail();
	});
}


var mouse_ap = function(){
	$("svg").mousedown(function(e){
		if(create_ap){
			console.log("mapdouwn");
			var offset = $("svg").offset();
			mouseDownX = (Math.round((e.pageX-offset.left)/10))*10;
			mouseDownY = (Math.round((e.pageY-offset.top)/10))*10;
			// console. log(setheight-(mouseDownY/10));
	        room = drawap(mouseDownX, mouseDownY, 0, 0);                
		}
	});
}

// select ap
var ap_selecting = function(this_id){
	ap_deselect_all();
	room_deselect_all();
	// console.log(this_id);
	for ( i=0;i<set_ap.length;i++) {
		if(set_ap[i].id == this_id){
				ap_selected = set_ap[i];
				// set_room[i].data('id','selected');
				set_ap[i].attr({opacity:0.4});
			}
	}
}
// deselect ap all
var ap_deselect_all = function(){
	for ( i=0;i<set_ap.length;i++) {
		ap_selected = null;
		set_ap[i].attr({opacity:0.7});
	}
}
// save ap
var ap_save = function(){
	var data;
	var min_x = mouseDownX/10;
	var max_y = setheight- (mouseDownY/10);
	// var name = prompt("Please enter your name", "Harry Potter");
	data = {"AP_name":String(min_x) + "," + String(max_y),x:min_x,y:max_y};
    $.post("/createap",data,function(data, status){
    	console.log(status);
    });
}

// show detail ap in edit map box
var ap_detail = function(){
	if(ap_selected){
		var axis = split_comma(ap_selected.id);
		// console.log(axis);
		data = {"x":axis.x,"y":axis.y};
		$.post("/selectap",data, function(data, status){
			console.log(data[0].AP_name);
			var name = data[0].AP_name;
			document.getElementById("name-selected").value = name;
			ap_selected.data('name',name);
		});
		$("#colorselector").colorselector("setColor", ap_selected.attrs.fill);
	}
}

// ap rename
var ap_rename = function(){
	if(ap_selected){
		var oldname = String(ap_selected.data('name'));
		var newname = document.getElementById("name-selected").value;
		console.log(oldname);
		console.log(newname);
		data = {"oldname":oldname,"newname":newname};
	    $.post("/editap",data, function(data, status){
			ap_selected.data('name',newname);
			console.log(status); 
		});
	}
}



// ap delete
var delete_ap = function(){
	if(ap_selected){
		var data = {"name":ap_selected.data('name')};
		$.post("/removeap",data, function(data, status){
	    	console.log(status);        
	    });
		ap_selected.remove();
		ap_selected = null;
	}
}

//check db when load
var ap_check_db = function(set){
	var i =0;
	loop();
	function loop(){
		if( i <set_ap.length){
			var axis = split_comma(set_ap[i].id);
			data = {"x":axis.x,"y":axis.y};
			$.post("/selectap",data, function(data, status){
				if(data == 'err'){
					console.log('not found');
					set_ap[i].remove();
				}
				i++;
				loop();
			});
		}
	}
}




//hide AP
var hide_ap = function(){
	set_ap.hide();
}
//show AP
var show_ap = function(){
	set_ap.show();
}
/*------------------------------
	Room
------------------------------*/
var toggle_create_room = function(){
	if(create_room){
		console.log("close create room done");
	}
	else{
		console.log("open create room done");
	}
	create_room = !create_room;
}
var drawroom = function(x,y,w,h){
	var element = paper.rect(x,y,w,h);
    element.setName ='set_room';
    element.id = String(x/10)+","+ String(setheight- (mouseDownY/10));
	attr_room(element);
	create_room_selected = element;
	element.attr({
		title:String(x/10)+","+ String(setheight- (mouseDownY/10)),
		fill:"#2980b9",
		opacity:0.7,
		stroke: "#7f8c8d",
		"stroke-width":"2",
		cursor:'pointer'
	});
	// set_room.push(element);
	return element;
}
var setName_room = function(set){
	for ( i=0;i<set.length;i++) {
    	set[i].setName ='set_room';
	}
}
var attr_room = function(set){
	set.click(function() {
		cant_draw();
		room_selecting(this.id);
		room_detail();
	});
}

var mouse_room = function(){
	$("svg").mousedown(function(e){
		if(create_room){
			console.log("mapdouwn");
			var offset = $("svg").offset();
			mouseDownX = (Math.round((e.pageX-offset.left)/10))*10;
			mouseDownY = (Math.round((e.pageY-offset.top)/10))*10;
			// console. log(setheight-(mouseDownY/10));
	        room = drawroom(mouseDownX, mouseDownY, 0, 0);                
	        //mouse move
			$("svg").mousemove(function(e){
				console.log("mousemove");
				var offset = $("svg").offset();
				var upX = e.pageX - offset.left;
			    var upY = e.pageY - offset.top;

			    var width = (Math.round((upX - mouseDownX)/10))*10;
			    var height = (Math.round((upY - mouseDownY)/10))*10;                       

			    room.attr({ "width": width > 0 ? width : 0,
			        "height": height > 0 ? height : 0 });
			});
			//-------------
		}
	});
	$("svg").mouseup(function(e){
		if(create_room){
			var offset = $("svg").offset();
			mouseUpX = (Math.round((e.pageX-offset.left)/10))*10;
			mouseUpY = (Math.round((e.pageY-offset.top)/10))*10;
			//same axis among mouse down & up :: dont do enything
			if (mouseUpX <= mouseDownX || mouseUpY <= mouseDownY){
			}
			else{
				room_save();
				set_room.push(create_room_selected);
			}
			console.log("mapup");
			$('svg').unbind('mousemove');
		}
	});
}
// select room
var room_selecting = function(this_id){
	ap_deselect_all();
	room_deselect_all();
	// console.log(this_id);
	for ( i=0;i<set_room.length;i++) {
		if(set_room[i].id == this_id){
				room_selected = set_room[i];
				// set_room[i].data('id','selected');
				set_room[i].attr({opacity:0.4});
			}
	}
}
// deselect room all
var room_deselect_all = function(){
	for ( i=0;i<set_room.length;i++) {
		room_selected = null;
		set_room[i].attr({opacity:0.7});
	}
}
var delete_room = function(){
	if(room_selected){
		var data = {"name":room_selected.attr('title')};
		// var data = {"name":room_selected.data('name')};
		$.post("/removeroom",data, function(data, status){
	    	console.log(status);        
	    });
		room_selected.remove();
		room_selected = null;
	}
}

//hide room
var hide_room = function(){
	set_room.hide();
}
//show room
var show_room = function(){
	set_room.show();
}
// show detail room in edit map box
var room_detail = function(){
	if(room_selected){
		var axis = split_comma(room_selected.id);
		// console.log(axis);
		data = {"min_x":axis.x,"max_y":axis.y};
		$.post("/selectroom",data, function(data, status){
			if(data == 'err'){
				console.log('not found');
				room_selected.remove();
				room_selected = null;
			} else {
				console.log(data[0].Room_name);
				var name = data[0].Room_name;
				document.getElementById("name-selected").value = name;
				room_selected.attr({'title':name});
				// room_selected.data('name',name);

			}
		});
		$("#colorselector").colorselector("setColor", room_selected.attrs.fill);
	}
}

var room_rename = function(){
	if(room_selected){
		// var oldname = String(room_selected.data('name'));
		var oldname = room_selected.attr('title');
		var newname = document.getElementById("name-selected").value;
		console.log(oldname);
		console.log(newname);
		data = {"oldname":oldname,"newname":newname};
	    $.post("/editroomName",data, function(data, status){
			// room_selected.data('name',newname);
			room_selected.attr({'title':newname});
			console.log(status); 
		});
	}
}

var room_check_db = function(set){
	// for ( i=0;i<set_room.length;i++) {
	var i=0;
	loop();
	function loop() {
		if(i <set_room.length){
			var axis = split_comma(set_room[i].id);
			// console.log(axis);
			data = {"min_x":axis.x,"max_y":axis.y};
			$.post("/selectroom",data, function(data, status){
				if(data == 'err'){
					console.log('not found');
					set_room[i].remove();
				}else {
					var name = data[0].Room_name;
					set_room[i].attr({'title':name});
				}
				i++;
				loop();
			});
		}
	}
}

var room_save = function(){
	var data;
	var max_x = mouseUpX/10;
	var min_x = mouseDownX/10;
	var max_y = setheight- (mouseDownY/10);
	var min_y = setheight- (mouseUpY/10);
	// var name = prompt("Please enter your name", "Harry Potter");
	data = {"Room_name":String(min_x) + "," + String(max_y),"max_x":max_x,"min_x":min_x,"max_y":max_y,"min_y":min_y};
    $.post("/createroom",data, function(data, status){
    	console.log(status);
    });
}
/*------------------------------
	Save to Json
------------------------------*/
String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
var json_save = function(){
		console.log("save");
		// Serialize the paper
		json = paper.toJSON(function(el, data) {
		    // Save the set identifier along with the other data
		    data.setName = el.setName;
		    return data;
		});
	    json = json.splice(1,0,nameSave+":::::");
	    // console.log(json);
		$.post("/savefile",json, function(data, status){
			console.log(status);
			$("#saving").fadeOut("slow");
	    });
	 console.log(typeof json);
	 // console.log(json);

	    // set_ap = [];
	    // set_grid = [];
	    // set_room = [];
	    // set_background = [];
	    
	 // paper.clear();
	    //set name file
		// $.post("/savefile","test"+"mapname"+"user1", function(data, status){
	 //    });
}
/*------------------------------
	Load Json
------------------------------*/
var json_call = function(){
	console.log("call");
	$.getJSON( pathJSON, function( recieve ) {
		var data_map = "["+recieve+"]";
		paper.fromJSON(data_map, function(el, data) {
		    // Recreate the set using the identifier
		    if ( !window[data.setName] ) {
		    	window[data.setName] = paper.set();
		    }
		    	console.log(data.setName);
		    // Place each element back into the set
		    try {
			    window[data.setName].push(el);
			}
			catch(err){
				console.log(err);
				console.log(el);
				console.log(window[data.setName]);
			}
		    return el;
		});
		if(window['set_background']){attr_background(window['set_background']);}
		if(window['set_grid']){attr_grid(window['set_grid']);}
		if(window['set_room']){
			setName_room(window['set_room']);
			attr_room(window['set_room']);
			room_check_db(window['set_room']);
		}
		if(window['set_ap']){
			setName_ap(window['set_ap']);
			attr_ap(window['set_ap'])
			ap_check_db(window['set_ap']);
		}
		$("#preloader").fadeOut("slow");
		hide_background();
		hide_grid();
	});
}
/*------------------------------
	Hide paper Raphael
------------------------------*/
var hide = function(){
	paper.clear();
}

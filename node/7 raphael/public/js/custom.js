//--------------------------------initial value------------------------------------//
//image
var srcImg = "/img/floor5.jpg";
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
//select
var select_list=[];
//----------------------------------------------------------------------------------//

//-----------------------------window key up-----------------------------------------//
function keyCommand(eve){
    switch(eve.key){
    	case "c":
    		// json_call();
    		break
    	case "s":
    		// json_save();
    		break
    	case "t":
    		toggle_create_ap();
    		break;
       case "r":
    		toggle_create_room();
    		break;
        case "Delete":
        	console.log("delete");
        	delete_select_list();
        	break;
	}
}
window.addEventListener("keyup", keyCommand);
//----------------------------------------------------------------------------------//

//------------------------------on load---------------------------------------------//

window.onload = function(){
		var newImg = new Image();
		newImg.src = srcImg;
		newImg.onload = function(){
		console.log("done");
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
	mouse();
	//function if no load
	set_background = paper.set();
	set_grid = paper.set();
	set_ap = paper.set();
	set_room = paper.set();
	set_tag = paper.set();
	background();
	grid();
}

//------------------------------------background-------------------------------------//
var background = function(){
	//image
	image = paper.image(srcImg,0,0,scale.width,scale.height);
	image.toBack();
	set_background.push(image);
	//bg
	paper_bg = paper.rect(0,0,scale.width,scale.height);
	paper_bg.attr("stroke-width",4).attr("stroke","lightgray");
	set_background.push(paper_bg);
	//attr
	attr_background(set_background);
}
var attr_background = function(set){
	for ( i in set ) {
    	set[i].setName ='set_background';
	}
}
//----------------------------------------------------------------------------------//

//--------------------------------------grid----------------------------------------//
var grid = function(){
	for (var i=0;i<=setwidth;i++){
		for (var j=0;j<=setheight;j++){
			var point_grid = paper.circle(10*i,10*j,1.5);
			point_grid.id = String(i)+","+String(setheight-j);	
			set_grid.push(point_grid);
			//set ID
		}
	}
	attr_grid(set_grid);
}
var attr_grid = function(set){
	for ( i in set ) {
    	set[i].setName ='set_grid';
	}
	set.attr({
		fill:'red',
		stroke:'#fff'
	});
	set.mouseover(function() {
        this.toFront();
        this.attr({
            cursor: 'pointer',
            fill: 'red',
            stroke: '#fff',
            'stroke-width': '1'
        });
        this.animate({
            transform: 's4'
        }, 200);
        //console.log(this.id);
    });
    //mouse out
    set.mouseout(function() {
        this.animate({
        	transform: 's1'
        }, 200);
        this.attr({
            fill: "red"
        });
    });
    //click
    set.click(function() {
    	if(create_ap){
			create_point_ap(this.id);
	    }
	    else{
			this.animate({fill: 'green',transform: 's5'},200,function(){
	       	this.animate({fill:'red',transform:'s4'},200);
	        });
	        console.log(this.id);
	    }
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

//----------------------------------------------------------------------------------//

//-----------------------------create ap--------------------------------------------//
var toggle_create_ap = function(){
	if(create_ap){
		console.log("close create ap done");
	}
	else{
		show_grid();
		console.log("open create ap done");
	}
	create_ap = !create_ap;
}
var create_point_ap = function(point_id){
	var axis = split_comma(point_id);
	var point = paper.circle(axis.x*10,(setheight-axis.y)*10,5);
	var name = String(axis.x) + "," + String(axis.y);
	point.data('axis',name);
	attr_ap(point);
	set_ap.push(point);
}
var attr_ap = function(set){
	for ( i in set ) {
    	set[i].setName ='set_ap';
	}
	set.attr({
		fill:'black',
		cursor:'pointer'
	});
	set.click(function() {
		if(this.data('id') == "selected"){
			this.attr({
				opacity:1
			});
			this.data('id',"deselected");
			// remove in list select_list
			var this_id = this.id;
			select_list = _.reject(select_list, function(el) { return el.id === this_id; });
			console.log("deselected");
		}
		else{
			this.attr({
				opacity:0.5
			});
			this.data('id',"selected");
			console.log("selected");
			console.log(this.data('axis'));
			// add to list select_list
			select_list.push(this);
		}
	});
}
var delete_ap = function(){
	set_ap.remove();
}
// clear list in select_list
var delete_select_list = function(){
	for (n in select_list){
		select_list[n].remove();
	}
	select_list = [];
}
//----------------------------------------------------------------------------------//

//-----------------------------draw room-----------------------------------------------//
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
	attr_room(element);
	set_room.push(element);
	return element;
}
var setName_room = function(set){
	for ( i in set ) {
    	set[i].setName ='set_room';
	}
}
var attr_room = function(set){
	set.attr({
		fill:"blue",
		opacity:0.7,
		stroke: "#F00"
	});
	set.click(function() {
		if(this.data('id') == "selected"){
			this.attr({
				opacity:0.7
			});
			this.data('id',"deselected");
			// remove in list select_list
			var this_id = this.id;
			select_list = _.reject(select_list, function(el) { return el.id === this_id; });
			console.log("deselected");
		}
		else{
			this.attr({
				opacity:0.5
			});
			this.data('id',"selected");
			console.log("selected");
			select_list.push(this);
		}
	});
}
var mouse = function(){
	$("svg").mousedown(function(e){
		if(create_room){
			console.log("mapdouwn");
			var offset = $("svg").offset();
			mouseDownX = (Math.round((e.pageX-offset.left)/10))*10;
			mouseDownY = (Math.round((e.pageY-offset.top)/10))*10;
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
				// console.log("modal");
				modal_name_room();
			}
			console.log("mapup");
			$('svg').unbind('mousemove');
		}
	});
}
//----------------------------------------------------------------------------------//
//---------------------------------------modal--------------------------------------//
var modal_name_room = function(){
	var data;
	var nameroom = prompt("Please enter your name room","");
	data = {"Room_Name":nameroom,"max_x":mouseUpX,"min_x":mouseDownX,"max_y":mouseUpY,"min_y":mouseDownY};
    $.post("/createroom",data, function(data, status){
    	console.log(status);
    });
}
//----------------------------------------------------------------------------------//
//------------------------------save to json----------------------------------------//
var json_save = function(){
		console.log("save");
		// Serialize the paper
		json = paper.toJSON(function(el, data) {
	    // Save the set identifier along with the other data
	    data.setName = el.setName;
	    return data;
	});
		console.log(json);
	    paper.clear();
	    set_ap = null;
	    set_grid = null;
	    set_room = null;
	    set_background = null;
		$.ajax({
		    type: "POST",
		    url: "/savefile",
		    data: sd,
		    contentType: "application/json; charset=utf-8",
		    dataType: "json",
		    success: function(data){alert(data);},
		    failure: function(errMsg) {
		        alert(errMsg);
		    }
		});
		// $.post("/savefile",json, function(data, status){
	 //    });	    


	    	console.log(json);
	    // console.log(typeof JSON.parse(json));
	    // console.log(JSON.parse(json));
	    // console.log(typeof JSON.stringify(json));
}
//----------------------------------------------------------------------------------//
//------------------------------call json-------------------------------------------//
var json_call = function(){
	console.log("call");
	readTextFile("./text.json");
	// $.getJSON( "./text.json", function( data ) {
	// 	console.log(typeof data);
	// 	// console.log((data));
	// 	// console.log(JSON.stringify(data));
	// 	var a = JSON.stringify(data);
	// 	var a = a.replace(/\\n/g, "\\n")
 //              .replace(/\\'/g, "\\'")
 //              .replace(/\\"/g, '\\"')
 //              .replace(/\\&/g, "\\&")
 //              .replace(/\\r/g, "\\r")
 //              .replace(/\\t/g, "\\t")
 //              .replace(/\\b/g, "\\b")
 //              .replace(/\\f/g, "\\f");
	// 	console.log(a);
		// console.log(JSON.parse(data));
		// paper.fromJSON(data, function(el, data) {
		//     // Recreate the set using the identifier
		//     if ( !window[data.setName] ) {
		//     	window[data.setName] = paper.set();
		//     }
		//     	console.log(data.setName);
		//     // Place each element back into the set
		//     window[data.setName].push(el);
		//     return el;
		// });
		// if(window['set_background']){attr_background(window['set_background']);}
		// if(window['set_grid']){attr_grid(window['set_grid']);}
		// if(window['set_room']){setName_room(window['set_room']);attr_room(window['set_room']);}
		// if(window['set_ap']){attr_ap(window['set_ap']);}
	// });
}
//----------------------------------------------------------------------------------//
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                str = JSON.stringify(allText);
                console.log(str.length);

                for (var i = 0, len = str.length; i < len; i++) {
				  // alert(str[i]);
				  if(str[i] == '\\'){console.log("found");delete str[i];}
				}
				alert(str);
            }
        }
    }
    rawFile.send(null);
}


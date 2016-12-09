//--------------------------------initial value------------------------------------//
// scale paper
var srcImg = "/img/floor5.jpg";
var scale = {height: 500,width: 707.2405929304447};

/*realsize*/
//var test = getImgSize(srcImg);
//console.log(test.width);

// grid
var z = [];

// point
var people = [];

// paper - Raphael
var paper = Raphael('map',scale.width,scale.height);

// use create ap
var create_ap = false;
var ap_list =[];

// select list
var select_list = [];


// set height for grid
var setheight = Math.round(scale.height/10);
// set width for grid
var setwidth = Math.round(scale.width/10);


// for create rect : room
var create_room = false;
var mouseDownX = 0;
var mouseDownY = 0;
var mouseUpX = 0;
var mouseUpY = 0;
var room;


// save to JSON
var json;

//----------------------------------------------------------------------------------//




//------------------------------------background-------------------------------------//
//image
var image = paper.image(srcImg,0,0,scale.width,scale.height);
	image.toBack();

//bg
var paeper_bg = paper.rect(0,0,scale.width,scale.height);
	paeper_bg.attr("stroke-width",4).attr("stroke","lightgray");

//----------------------------------------------------------------------------------//




//--------------------------------------grid----------------------------------------//
for (var i=0;i<=setwidth;i++){
	for (var j=0;j<=setheight;j++){
		var c = paper.circle(10*i,10*j,1.5);
			c.attr({
				fill:'red',
				stroke:'#fff',
				//cursor:'pointer'
			});
		//set ID
		c.id = String(i)+","+String(setheight-j);	
		//mouse over
	    c.mouseover(function() {
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
	    c.mouseout(function() {
	        this.animate({
	        	transform: 's1'
	        }, 200);
	        this.attr({
	            fill: "red"
	        });
	    });
	    //click
	    c.click(function() {
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
	    //c.drag(movePath,startPath,upPath);
	    z.push(c);
	}
}

// hide grid
function hide_grid(){
	create_ap = false;
	for (n in z){
		z[n].hide();
	}
}
// show grid
function show_grid(){
	for (n in z){
		z[n].show();
	}
}

//----------------------------------------------------------------------------------//


//-----------------------------create ap--------------------------------------------//
function toggle_create_ap(){
	if(create_ap){
		create_ap = false;
		console.log("close create ap done");
	}
	else{
		create_ap = true;
		show_grid();
		console.log("open create ap done");
	}
}

function create_point_ap(point_id){
	var axis = split_comma(point_id);
	var point = paper.circle(axis.x*10,(setheight-axis.y)*10,5);
	point.attr({
		fill:'black',
		cursor:'pointer'
	});
	var name = String(axis.x) + "," + String(axis.y);
	point.data('axis',name);

	// add to ap list
	ap_list.push(point);

	point.click(function() {
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

// clear list in ap_list
function delete_ap(){
	for (n in ap_list){
		ap_list[n].remove();
	}
	ap_list = [];
}

// clear list in select_list
function delete_select_list(){
	for (n in select_list){
		select_list[n].remove();
	}
	select_list = [];
}


//----------------------------------------------------------------------------------//


//-----------------------------window key up--------------------------------------------//



function keyCommand(eve){
	//console.log(eve);
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


//-----------------------------draw room-----------------------------------------------//

function toggle_create_room(){
	if(create_room){
		create_room = false;
		console.log("close create room done");
	}
	else{
		create_room = true;
		console.log("open create room done");
	}
}

function DrawRectangle(x,y,w,h){
	var element = paper.rect(x,y,w,h);
	element.attr({
		fill:"blue",
		opacity:0.7,
		stroke: "#F00"
	});

	element.click(function() {
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
			// add to list select_list
			select_list.push(this);
		}
	});
	return element;
}


$("svg").mousedown(function(e){
	if(create_room){
		console.log("mapdouwn");
		var offset = $("svg").offset();
		mouseDownX = (Math.round((e.pageX-offset.left)/10))*10;
		mouseDownY = (Math.round((e.pageY-offset.top)/10))*10;
        room = DrawRectangle(mouseDownX, mouseDownY, 0, 0);                
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



//----------------------------------------------------------------------------------//


//---------------------------------------modal--------------------------------------//

function modal_name_room(){
	var data;
	var nameroom = prompt("Please enter your name room","");
	data = {"Room_Name":nameroom,"max_x":mouseUpX,"min_x":mouseDownX,"max_y":mouseUpY,"min_y":mouseDownY};
    $.post("/createroom",data, function(data, status){
    	console.log(status);
    });
}
//----------------------------------------------------------------------------------//



//------------------------------save to json----------------------------------------//
function json_save(){
	console.log("save to JSON");
	/*json = paper.toJSON();
	console.log(json);
	paper.clear();*/
		// Save
	json = paper.toJSON(function(el, data) {
    // data.ft = {};

    // if ( el.freeTransform != null ) {
    //     data.ft.attrs = el.freeTransform.attrs;
    //     data.ft.click = el.freeTransform.click;

    //     paper.freeTransform(el).unplug();
    // }
    data.id = el.node.id;
    return data;
	});
	paper.clear();

	console.log(json);
}
//----------------------------------------------------------------------------------//


//------------------------------call json-------------------------------------------//
function json_call(){
	console.log("call JSON");
	//paper = Raphael('map',scale.width,scale.height);
	//paper.fromJSON(json);

	// Load
	paper.fromJSON(json, function(el, data) {
	    // if ( data.ft && data.ft.attrs ) {
	    //     paper.freeTransform(el);

	    //     el.freeTransform.attrs = data.ft.attrs;

	    //     el.freeTransform.apply();
	    // }
	    el.node.id = data.id;
	    return el;
	});
}
//----------------------------------------------------------------------------------//

var paper2 = Raphael('map',scale.width,scale.height);

var exampleSet = paper2.set();
var set = paper2.rect(200,200,20,20).attr({fill:'red'});
var set2 = paper2.rect(100,100,20,20).attr({fill:'red'});
exampleSet.push(set);
exampleSet.push(set2);
exampleSet.click(function() {
	console.log("click");
	this.animate({fill:'blue',transform:'s4'},200);
});

// Store a unique identifier in each of the set's elements
for ( i in exampleSet ) {
    exampleSet[i].setName = 'exampleSet';
}

// Serialize the paper
var json = paper2.toJSON(function(el, data) {
    // Save the set identifier along with the other data
    data.setName = el.setName;

    return data;
});

// Start over
paper2.clear();

exampleSet = null;

// Restore the paper to the previous state using serialized data
paper2.fromJSON(json, function(el, data) {
    // Recreate the set using the identifier
    if ( !window[data.setName] ) {
    	console.log(data.setName);
    	window[data.setName] = paper2.set();
    }
    // Place each element back into the set
    window[data.setName].push(el);

    return el;
});
exampleSet.click(function() {
	console.log("click");
	this.animate({fill:'blue',transform:'s2'},200);
	this.remove();
});
// The set is restored
console.log(exampleSet);

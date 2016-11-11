
//--------------------------------initial value------------------------------------//
// scale paper
var srcImg = "/img/floor5.jpg";
var scale = {width: 500,height: 707.2405929304447};

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
var ap_create = false;
var ap_list =[];

// select list
var select_ap = [];

// for y axis
var loop_j = Math.round(scale.height/10);

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
for (var i=0;i<=50;i++){
	for (var j=0;j<=loop_j;j++){
		var c = paper.circle(10*i,10*j,1.5);
			c.attr({
				fill:'red',
				stroke:'#fff',
				//cursor:'pointer'
			});
		//set ID
		c.id = String(i)+","+String(loop_j-j);	
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
	    	if(ap_create){
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
	ap_create = false;
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
	if(ap_create){
		ap_create = false;
		console.log("close create ap done");
	}
	else{
		ap_create = true;
		show_grid();
		console.log("open create ap done");
	}
}

function create_point_ap(point_id){
	var axis = split_comma(point_id);
	var point = paper.circle(axis.x*10,(loop_j-axis.y)*10,5);
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
			// remove in list select_ap
			var this_axis = this.data('axis');
			select_ap = _.reject(select_ap, function(el) { return el.data('axis') === this_axis; });
			console.log("deselected");
		}
		else{
			this.attr({
				opacity:0.5
			});
			this.data('id',"selected");
			console.log("selected");
			// add to list select_ap
			select_ap.push(this);
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

// clear list in select_ap
function delete_select_ap(){
	for (n in select_ap){
		select_ap[n].remove();
	}
	select_ap = [];
}


//----------------------------------------------------------------------------------//

//---------------------------Point From NetPie--------------------------------------//

//draw point
function draw_point(x,y){
	var point = paper.circle(x*10,(setheight-y)*10,8);
	point.attr({
		fill:'green',
		stroke:'#fff'
	})

	point.animate({
		transform: 's1'
	},200);
	set_tag.push(point);
}


function remove_point(){
	set_tag.remove();
}
//show point
function showpoint(msg){
	set_tag.remove();
	remove_point();
	var axis = split_comma(msg);
	draw_point(axis.x,axis.y);
}

//----------------------------------------------------------------------------------//



//---------------------------Point From NetPie--------------------------------------//

//draw point
function draw_point(x,y){
	var point = paper.circle(x*10,(loop_j-y)*10,8);
	point.attr({
		fill:'green',
		stroke:'#fff'
	})

	point.animate({
		transform: 's1'
	},200);

	people.push(point);
}

function remove_point(){
	for (n in people){
		people[n].remove();
	}
}
//show point
function showpoint(msg){
	var axis = split_comma(msg);
	draw_point(axis.x,axis.y);
}

//----------------------------------------------------------------------------------//

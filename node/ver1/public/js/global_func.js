//split comma
function split_comma(msg){
	var axis = msg.split(',');
	return {x:axis[0],y:axis[1]};
}
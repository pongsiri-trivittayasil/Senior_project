var list = "<div id='history'><span style='font-size:20px;margin-right:10px;'>Tag</span><select class='selectpicker' onchange='find()' id='tag-id'> <option value='null'>Not Select</option>";
var list2 = "</select></div>"
// var list2 = "</select></div><div>room</div><div><select class='selectpicker'id='room-name'>";
// var list3 = "</select></div></div>";
var list_room_name = [];
var list_room_id = [];
window.onload = function(){
	var temp = list;
	$.post("/listtag",function(data,status){
		for (x in data){
			temp = temp +"<option value='"+ String(data[x].Tag_id) +"'>"+String(data[x].Tag_name) +"</option>";
		}
		temp = temp + list2;
		$('#list-tag-room').append( $(temp)).slideDown("fast");
		$('.selectpicker').selectpicker();
	})
	$.post("/listroom",function(data,status){
		if(data.length > 0){
			for( n in data){
				if(data[n].Room_id != undefined){
					console.log(data[n]);
					list_room_name.push(data[n].Room_name);
					list_room_id.push(String(data[n].Room_id));
				}
			}
		}
	})

	$('.selectpicker').selectpicker();
	endpreload();
}
var find = function(){
	$('#table-history').children().remove();
	var tag_id = $('#history').find('#tag-id').val();
	console.log(tag_id);
	if(tag_id != "null"){
		console.log('ok');
		var data = {tagid:tag_id};
		$.post("/tag_history",data,function(data,status){
			console.log(data);
			if(data.length > 0){
				data.reverse();
				for (n in data){
					console.log(data[n]);
					var index = list_room_id.indexOf(data[n].room);
					console.log(index);
					if(index != -1){
						var temp = "<tr><td>"+data[n].day+"</td><td>"+data[n].time+"</td><td>"+list_room_name[index]+"</td></tr>"
						$('#table-history').append(temp);
					} else {
						var temp = "<tr><td>"+data[n].day+"</td><td>"+data[n].time+"</td><td>"+"Out of room"+"</td></tr>"
						$('#table-history').append(temp);						
					}
				}
			}
		});
	}
}
/*------------------------------
  End page loding
------------------------------*/
function endpreload(){
	$("#preloader").fadeOut("hide");
}
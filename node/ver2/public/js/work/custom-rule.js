/*------------------------------
  init if choice
------------------------------*/
var if_time = "<div class='row list' id='if-time'><div class='col-md-2'>Time</div><div class='col-md-6'id='if-time'><input class='form-control timepicker'type='text' id='val-time'></div><div class='col-md-4'style='text-align:right'><i class='fa fa-times remove'aria-hidden='true'></i></div></div>";
var if_tag = "<div class='row list'id='if-tag'><div class='col-md-1'>Tag</div><div class='col-md-4' ><select class='selectpicker' id='tag-name'>"
var if_tag2 = "</select></div><div class='col-md-1'>in</div><div class='col-md-4' ><select class='selectpicker'id='room-name'>"
var if_tag3 = "</select></div><div class='col-md-2' style='text-align:right'><i class='fa fa-times remove' aria-hidden='true'></i></div></div>";
var if_date = "<div class='row list' id='if-date'><div class='col-md-2' >Date</div><div class='col-md-6 '><input class='form-control datepicker' type='text' id='val-date'></div><div class='col-md-4' style='text-align:right'><i class='fa fa-times remove' aria-hidden='true'></i></div></div>";
var if_day = "<div class='row list' id='if-day'><div class='col-md-2' >Day</div><div class='col-md-6'><select class='selectpicker' id='val-day'><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option><option>Sunday</option></select></div><div class='col-md-4' style='text-align:right'><i class='fa fa-times remove' aria-hidden='true'></i></div></div>";
var then_line = "<div class='row list' id='then-line'><div class='col-md-1' >Line</div><div class='col-md-4' ><select class='selectpicker' id='val-token'>"
var then_line2 = "</select></div><div class='col-md-2'>Message</div><div class='col-md-4'><input type='text' class='form-control' id='val-message' placeholder='Example input'></div><div class='col-md-1' style='text-align:right'><i class='fa fa-times remove' aria-hidden='true'></i></div></div>";
var then_control = "<div class='row list' id='then-control'><div class='col-md-2'>Control</div><div class='col-md-4' ><select class='selectpicker' id='val-control'>"
var then_control2 = "</select></div><div class='col-md-4' ><select class='selectpicker' id='val-status'><option>on</option><option>off</option></select></div><div class='col-md-2' style='text-align:right'><i class='fa fa-times remove' aria-hidden='true'></i></div></div>";

/*------------------------------
  button add new rule
------------------------------*/
// show modal
$('#add-rule').on('click',function(){
	// console.log('ok');
	$('#modal-add-rule').modal('show');
});

/*------------------------------
  button choose if choice
------------------------------*/
// if tag
$('#if-button-tag').on('click',function(){
	console.log('tag');
	// $('#if-list').append( $(if_tag)).slideDown("fast");
	// $(rule_tag).appendTo($('.if-list')).slideDown("slow");
	var temp = if_tag;
	$.post("/listtag",function(data,status){
		for (x in data){
			console.log(data[x].Tag_name);
			temp = temp +"<option>"+String(data[x].Tag_name) + "," + String(data[x].Tag_id) +"</option>";
		}
		temp = temp + if_tag2;
		$.post("/listroom",function(data,status){
			for (x in data){
				// console.log(data[x]);
				temp = temp + "<option>"+String(data[x].Room_name)+ "," + String(data[x].Room_id)+"</option>";
			}
		temp = temp + if_tag3;
		$('#if-list').append( $(temp)).slideDown("fast");
		$('.selectpicker').selectpicker();
		})
	})
	$(this).hide()
});
//  if time
$('#if-button-time').on('click',function(){
	console.log('time');
	// $('#if-list').append( $(if_time)).slideDown("fast");
	$(if_time).appendTo($('#if-list')).slideDown("slow");
	// set attp 
	$( ".timepicker" ).timepicker({
		showMeridian:false,
		minuteStep:1
	});
	$(this).hide()
});
// if date
$('#if-button-date').on('click',function(){
	console.log('date');
	// $('#if-list').append( $(if_time)).slideDown("fast");
	$(if_date).appendTo($('#if-list')).slideDown("slow");
	// set attp
	$('.datepicker').datepicker({
		autoclose:true,
		calendarWeeks:true,
	    format: "dd/mm/yyyy",
	    todayHighlight: true,
	});
	$(this).hide()
});
// if day
$('#if-button-day').on('click',function(){
	console.log('day');
	$(if_day).appendTo($('#if-list')).slideDown("slow");
	$('.selectpicker').selectpicker();
	$(this).hide()
});

/*------------------------------
  button choose then choice
------------------------------*/
$('#then-button-line').on('click',function(){
	console.log('line');
	$.post("/listline",function(data,status){
		var temp = then_line;
		for (x in data){
			temp = temp + "<option>"+String(data[x].Line_name)+","+String(data[x].Line_token)+"</option>";
		}
	temp = temp + then_line2;
	$(temp).appendTo($('#then-list')).slideDown("slow");
	$('.selectpicker').selectpicker();
	});
});
$('#then-button-control').on('click',function(){
	console.log('control');
	$.post("/listControl",function(data,status){
		var temp = then_control;
		for (x in data){
			temp = temp + "<option>"+String(data[x].Control_name)+","+ String(data[x].Control_id)+"</option>";
		}
	temp = temp + then_control2;
	$(temp).appendTo($('#then-list')).slideDown("slow");
	$('.selectpicker').selectpicker();
	});
});


/*------------------------------
  remove list in modal
------------------------------*/
$(document).on('click', '.remove', function(e) {
	console.log('remove');
	var temp = $(this).parent().parent();
	if(temp[0].id == 'if-tag'){
		$('#if-button-tag').show();
	}
	else if(temp[0].id == 'if-time'){
		$('#if-button-time').show();
	}
	else if(temp[0].id == 'if-date'){
		$('#if-button-date').show();
	}
	else if(temp[0].id == 'if-day'){
		$('#if-button-day').show();
	}
	// console.log(temp[0].id);
	$(this).parent().parent().remove();
	//do whatever
});

/*------------------------------
  button submit and cancel
------------------------------*/
$('#submit-modal').on('click',function(){
	var random_id = String(Math.random());
	var data_status = {IfID:random_id,IfTime:'-',IfDay:'-',IfDate:'-',IfTag:'-'}
	var list_if = $('#if-list').children();
	for (i = 0; i < list_if.length; i++) { 
		console.log(list_if[i].id);
		// tag
		if(list_if[i].id == 'if-tag'){
			var tag_name = $(list_if[i]).find('#tag-name').val();
			var room_name = $(list_if[i]).find('#room-name').val();
			console.log("tag-name : "+String(tag_name)+" in room-name : " + String(room_name))
			tag_name = tag_name.split(',');
			room_name = room_name.split(',');
			var data = {IfTag_id:random_id,IfTag_name:tag_name[1],IfTag_room:room_name[1]};
			console.log(data);
			$.post("/createIfTag",data, function(data, status){
				console.log(status);
			});
			data_status['IfTag'] = '0';
		}
		// time
		else if (list_if[i].id == 'if-time'){
			var val_time = $(list_if[i]).find('#val-time').val();
			console.log("time : " + String(val_time));
			var data = {IfTime_id:random_id,IfTime_time:val_time};
			console.log(data);
			$.post("/createIfTime",data, function(data, status){
				console.log(status);
			});
			data_status['IfTime'] = '0';
		}
		// date
		else if (list_if[i].id == 'if-date'){
			var val_date = $(list_if[i]).find('#val-date').val();
			console.log("date : " + String(val_date));
			var data = {IfDate_id:random_id,IfDate_date:val_date};
			console.log(data);
			$.post("/createIfDate",data, function(data, status){
				console.log(status);
			});
			data_status['IfDate'] = '0';
		}
		// day
		else if (list_if[i].id == 'if-day'){
			var val_day = $(list_if[i]).find('#val-day').val();
			console.log("day : " + String(val_day));
			var data = {IfDay_id:random_id,IfDay_day:val_day};
			console.log(data);
			$.post("/createIfDay",data, function(data, status){
				console.log(status);
			});
			data_status['IfDay'] = '0';
		}
		else {
			console.log('error');
		}
	}	// end for loop
	// status
	if(list_if.length > 0){
		console.log(data_status);
		$.post("/createIfStatus",data_status, function(data, status){
			console.log(status);
		});		
	}
	var list_then = $('#then-list').children()
	for (i = 0; i < list_then.length; i++) { 
		console.log(list_then[i].id);
		// then line
		if (list_then[i].id == 'then-line'){
			console.log('line');
			var val_token = $(list_then[i]).find('#val-token').val();
			var val_message = $(list_then[i]).find('#val-message').val();
			val_token = val_token.split(',');
			var data = {ThenLine_id:random_id,ThenLine_token:val_token[1],ThenLine_message:val_message};
			$.post("/createThenLine",data, function(data, status){
				console.log(status);
			});
		}
		else if (list_then[i].id == 'then-control'){
			console.log('control');
			var val_control = $(list_then[i]).find('#val-control').val();
			var val_status = $(list_then[i]).find('#val-status').val();
			val_control = val_control.split(',');
			var data = {ThenControl_id:random_id,ThenControl_Control_id:val_control[1],ThenControl_status:val_status}
			$.post("/createThenControl",data, function(data, status){
				console.log(status);
			});
		}
		else {
			console.log('error');
		}
		// then control
	}

	$('#if-list').children().remove();
	$('#then-list').children().remove();
	$('#if-button-day').show();
	$('#if-button-date').show();
	$('#if-button-tag').show();
	$('#if-button-time').show();
	$('#modal-add-rule').modal('toggle');
	location.reload();
	// console.log($('#if-time').val());
	// console.log($('#if-date').val());
	// console.log($('#if-day').val());
});
$('#cancel-modal').on('click',function(){
	$('#if-list').children().remove();
	$('#then-list').children().remove();
	$('#modal-add-rule').modal('toggle');
});

/*------------------------------
  window onload
  pull rule list
------------------------------*/
var rule_list = "<div class='row rule'><div class='col-md-11'>";
var rule_list_None = "<div class='row rule-None'><div class='col-md-11'>"
var rule_list2 = "</div><div class='col-md-1' style='text-align:right'><i class='fa fa-times removelist' aria-hidden='true'></i></div></div>";
var aa;
window.onload = function(){
	$.post("/listRule",function(data,status){
		aa = data;
		console.log(data);
		if(data != 'None'){
			// sort by num
			data.sort(function (a, b) {
				return a.num - b.num;
			});
			console.log('list');
			for (n in data){
				var temp = rule_list;
				// id
				temp = temp + "<span style='display:none' id='rule-id'>"+data[n].id+"</span>"
				// if
				temp = temp + "<span>if</span>"
				// if time
				if(data[n].IfTime != undefined){
					temp = temp + "<span> Time :" + data[n].IfTime + "</span>";
				}
				// if Date
				if(data[n].IfDate != undefined){
					temp = temp + "<span> Date :" + data[n].IfDate + "</span>";
				}
				// if Day
				if(data[n].IfDay != undefined){
					temp = temp + "<span> Day :" + data[n].IfDay + "</span>";
				}
				// if Tag
				if(data[n].IfTag != undefined){
					temp = temp + "<span> Tag : " + data[n].IfTag.IfTag_name + " In room : " + data[n].IfTag.IfTag_room+ "</span>";
				}
				// then
				temp = temp + "<span> Then </span>";
				// then line
				if(data[n].Line != undefined){
					for (m in data[n].Line){
						temp = temp + "<span> Line : " + data[n].Line[m].Line_name + " message : " + '"' + data[n].Line[m].message + '"';
					}
				}
				// then Control
				if(data[n].Control != undefined){
					for (m in data[n].Control){
						temp = temp + "<span> Control : " + data[n].Control[m].Control_name + " status : " + data[n].Control[m].status;
					}
				}


				temp = temp + rule_list2;
				$('#rule-list').append(temp);
			}
		} 
		endpreload();
	})
	// add rule list
	// var rule_list = 	"<div class='row rule'><div class='col-md-11'>test</div><div class='col-md-1' style='text-align:right'><i class='fa fa-times removelist' aria-hidden='true'></i></div></div>";
	// $('#rule-list').append(rule_list);
}

/*------------------------------
  remove rule list
------------------------------*/
$(document).on('click', '.removelist', function(e) {
	var rule_id = $(this).parent().parent().find('#rule-id').html();
	var data = {id:rule_id}
	$.post("/ruleremove",data,function(data,status){
		console.log(status);
		location.reload();
	});
	// $(this).parent().parent().remove();
	console.log('remove');
});


/*------------------------------
  End page loding
------------------------------*/
function endpreload(){
	$("#preloader").fadeOut("hide");
}



var IfTime = require('mongoose').model('IfTime');
var IfTag = require('mongoose').model('IfTag');
var IfOut = require('mongoose').model('IfOut');
var IfDay = require('mongoose').model('IfDay');
var IfDate = require('mongoose').model('IfDate');
var IfStatus = require('mongoose').model('IfStatus');
var ThenLine = require('mongoose').model('ThenLine');
var ThenControl = require('mongoose').model('ThenControl');
var async = require('async');
var Room = require('mongoose').model('Room');
var Tag = require('mongoose').model('Tag');
var Control = require('mongoose').model('Control');
var Line = require('mongoose').model('Line');

exports.Rule_list = function(req,res,next){
	async.parallel({
		list:Rule_temp.bind(null,req),
	},function(err,result){
		if(result.list == 'None'){
			res.send('None');
		} else {
			res.send(result.list);
		}
	});
}

// function main temp ^^^
var Main_temp = function(){
	async.parallel({
		list:Rule_temp.bind(null,'test'),
	},function(err,result){
		console.log('fuck done');
		console.log(result.list);
	});
}

/*-------------------------------
	Rule find db
--------------------------------*/
var Rule_temp = function(req,callback){
	var temp_rule_list = [];  // big list ** send to front end
	var count = 0;
	try {
		IfStatus.find({User:req.user.Username,Map:req.session.map},function(err,ids){
		// IfStatus.find({},function(err,ids){
			if(err){
				return next(err);
			}else{
				if(ids.length > 0){
					for( n in ids){
						// console.log(ids[n].IfID);
						async.parallel({
							id:id.bind(null,ids[n].IfID),
							num:num.bind(null,n),
							time:Time_list.bind(null,ids[n].IfID,ids[n].IfTime),
							date:Date_list.bind(null,ids[n].IfID,ids[n].IfDate),
							day:Day_list.bind(null,ids[n].IfID,ids[n].IfDay),
							tag:Tag_list.bind(null,ids[n].IfID,ids[n].IfTag),
							out:Out_list.bind(null,ids[n].IfID,ids[n].IfOut),
							tagtime:Tag_Time_list.bind(null,ids[n].IfID,ids[n].IfTagTime),
							line:Line_list.bind(null,ids[n].IfID),
							control:Control_list.bind(null,ids[n].IfID),
						},function(err,result){
							console.log('fucking shit');
							// console.log(ids.length);
							// console.log('result ::::: ', result);
							var temp_rule_list_id = {};
							count++; // count for max
							temp_rule_list_id['id'] = result.id;
							temp_rule_list_id['num'] = result.num;
							// time
							if(result.time != 'None'){
								temp_rule_list_id['IfTime'] = result.time; 
							}
							// date
							if(result.date != 'None'){
								temp_rule_list_id['IfDate'] = result.date; 
							}
							// day
							if(result.day != 'None'){
								temp_rule_list_id['IfDay'] = result.day;
							}
							// tag
							if(result.tag != 'None'){
								temp_rule_list_id['IfTag'] = result.tag;
							}
							// out
							if(result.out != 'None'){
								temp_rule_list_id['IfOut'] = result.out;
							}
							// tag + time
							if(result.tagtime != 'None'){
								temp_rule_list_id['IfTagTime'] = result.tagtime;
							}
							// line
							if(result.line != 'None'){
								temp_rule_list_id['Line'] = result.line;
							}
							// control
							if(result.control != 'None'){
								temp_rule_list_id['Control'] = result.control;
							}
							temp_rule_list.push(temp_rule_list_id);
							// console.log(temp_rule_list);
							if(count == ids.length){
								callback(null,temp_rule_list);
							}
						});
					}  // end for
				} else {
					callback(null,'None');
				}
			}  // end if else
		});  // end find
	} catch(err){
		console.log(err);
	} // end catch
}  // end function

// id
var id = function(id,callback){
	callback(null,id);
}
// num count rule
var num = function(num,callback){
	callback(null,num);
}

var Time_list = function(id,status,callback){
	if(status == '0' || status == '1'){
		try{
			IfTime.find({IfTime_id:id},function(err,documents){
				if(err){
					return next(err);
				} else {
					for (n in documents){
						// console.log(times[n].IfTime_time);
						// return times[n].IfTime_time;
						callback(null,documents[n].IfTime_time); // callback time
					}
				}
			});
		} catch(err){
			console.log(err);
		}
	} // end if
	else {
		callback(null,'None');
	} // end else
} // end func
var Date_list = function(id,status,callback){
	if(status == '0' || status == '1'){
		try{
			IfDate.find({IfDate_id:id},function(err,documents){
				if(err){
					return next(err);
				} else {
					for (n in documents){
						callback(null,documents[n].IfDate_date); 
					}
				}
			});
		} catch(err){
			console.log(err);
		}
	} // end if
	else {
		callback(null,'None');
	} // end else
} // end func

var Day_list = function(id,status,callback){
	if(status == '0' || status == '1'){
		try{
			IfDay.find({IfDay_id:id},function(err,documents){
				if(err){
					return next(err);
				} else {
					for (n in documents){
						callback(null,documents[n].IfDay_day); 
					}
				}
			});
		} catch(err){
			console.log(err);
		}
	} // end if
	else {
		callback(null,'None');
	} // end else
} // end func

var Tag_list = function(id,status,callback){
	if(status == '0' || status == '1'){
		try{
			// find id if tag
			IfTag.find({IfTag_id:id},function(err,documents){
				if(err){
					return next(err);
				} else {
					for (n in documents){
						if(documents[n].For_Time == "0"){
						var data;
						// find name tag and name room
							Tag.findOne({Tag_id:documents[n].IfTag_name},function(err,tags){
								if(err){
									console.log(err);
								} else {
									if(tags != null){   // found tag
										Room.findOne({Room_id:documents[n].IfTag_room},function(err,rooms){
											if(err){
												console.log(err);
											} else {
												if(rooms != null ){  // found room
													data = {IfTag_name:tags.Tag_name,IfTag_room:rooms.Room_name};
													callback(null,data);

												} else {  // not found rooms
													data = {IfTag_name:tags.Tag_name,IfTag_room:'None'};
													callback(null,data);
												}
											}
										})
									} else {   // not found tag
										Room.findOne({Room_id:documents[n].IfTag_room},function(err,rooms){
											if(err){
												console.log(err);
											} else {
												if(rooms != null ){  // found room
													data = {IfTag_name:'None',IfTag_room:rooms.Room_name};
													callback(null,data);

												} else {  // not found rooms
													data = {IfTag_name:'None',IfTag_room:'None'};
													callback(null,data);
												}
											}
										})	//end room.findOne
									}	// end else
								}	// end else
							});	// end tag.findone
						} // end if
					}
				}
			});
		} catch(err){
			console.log(err);
		}
	} // end if
	else {
		callback(null,'None');
	} // end else
} // end func

var Out_list = function(id,status,callback){
	if(status == '0' || status == '1'){
		try{
			// find id if tag
			IfOut.find({IfOut_id:id},function(err,documents){
				if(err){
					return next(err);
				} else {
					for (n in documents){
						var data;
						// find name tag and name room
						Tag.findOne({Tag_id:documents[n].IfOut_name},function(err,tags){
							if(err){
								console.log(err);
							} else {
								if(tags != null){   // found tag
									Room.findOne({Room_id:documents[n].IfOut_room},function(err,rooms){
										if(err){
											console.log(err);
										} else {
											if(rooms != null ){  // found room
												data = {IfTag_name:tags.Tag_name,IfTag_room:rooms.Room_name};
												callback(null,data);

											} else {  // not found rooms
												data = {IfTag_name:tags.Tag_name,IfTag_room:'None'};
												callback(null,data);
											}
										}
									})
								} else {   // not found tag
									Room.findOne({Room_id:documents[n].IfOut_room},function(err,rooms){
										if(err){
											console.log(err);
										} else {
											if(rooms != null ){  // found room
												data = {IfTag_name:'None',IfTag_room:rooms.Room_name};
												callback(null,data);

											} else {  // not found rooms
												data = {IfTag_name:'None',IfTag_room:'None'};
												callback(null,data);
											}
										}
									})	//end room.findOne
								}	// end else
							}	// end else
						});	// end tag.findone
					}
				}
			});
		} catch(err){
			console.log(err);
		}
	} // end if
	else {
		callback(null,'None');
	} // end else
} // end func

var Tag_Time_list = function(id,status,callback){
	// console.log(id,'::::',status);
	if(status == '0' || status == '1'){
		try{
			// find id if tag
			IfTag.find({IfTag_id:id},function(err,documents){
				if(err){
					return next(err);
				} else {
					for (n in documents){
						// console.log('find',documents[n]);
						if(documents[n].For_Time != "0"){
							// console.log('in');
						var data;
						// find name tag and name room
							Tag.findOne({Tag_id:documents[n].IfTag_name},function(err,tags){
								if(err){
									console.log(err);
								} else {
									if(tags != null){   // found tag
										Room.findOne({Room_id:documents[n].IfTag_room},function(err,rooms){
											if(err){
												console.log(err);
											} else {
												if(rooms != null ){  // found room
													data = {IfTag_name:tags.Tag_name,IfTag_room:rooms.Room_name,For_Time:documents[n].For_Time};
													callback(null,data);

												} else {  // not found rooms
													data = {IfTag_name:tags.Tag_name,IfTag_room:'None',For_Time:documents[n].For_Time};
													callback(null,data);
												}
											}
										})
									} else {   // not found tag
										Room.findOne({Room_id:documents[n].IfTag_room},function(err,rooms){
											if(err){
												console.log(err);
											} else {
												if(rooms != null ){  // found room
													data = {IfTag_name:'None',IfTag_room:rooms.Room_name,For_Time:documents[n].For_Time};
													callback(null,data);

												} else {  // not found rooms
													data = {IfTag_name:'None',IfTag_room:'None',For_Time:documents[n].For_Time};
													callback(null,data);
												}
											}
										})	//end room.findOne
									}	// end else
								}	// end else
							});	// end tag.findone
						} else { // end if 
							callback(null,'None');
						}
					}
				}
			});
		} catch(err){
			console.log(err);
		}
	} // end if
	else {
		callback(null,'None');
	} // end else
} // end func


var Line_list = function(id,callback){
	var count_line = 0;
		try{
			// find id if tag
			ThenLine.find({ThenLine_id:id},function(err,documents){
				if(err){
					return next(err);
				} else {
					if(documents.length > 0){
						for (j in documents){
							var data = [];
							// find name line
							Line.findOne({Line_token:documents[j].ThenLine_token},function(err,lines){
								count_line++;
								if(err){
									console.log(err);
								} else {
									if(lines != null){ // found line
										data.push({Line_name:lines.Line_name,message:documents[count_line-1].ThenLine_message});
									} else {  // not found line
										data.push({Line_name:'None',message:documents[count_line-1].ThenLine_message});
									}
								}
								if(count_line == documents.length){
									console.log('pls');
									callback(null,data);
								}
							});
						}
					} else {
						callback(null,'None');
					}
				}
			});
		} catch(err){
			console.log(err);
		}
} // end func



var Control_list = function(id,callback){
	var count_control = 0;
		try{
			// find id if tag
			ThenControl.find({ThenControl_id:id},function(err,documents){
				if(err){
					return next(err);
				} else {
					// console.log('test', documents)
					if(documents.length > 0){
						for (j in documents){
							var data = [];
							// console.log(documents[j]);
							// find name control
							Control.findOne({Control_id:documents[j].ThenControl_Control_id},function(err,controls){
								count_control++;
								if(err){
									console.log(err);
								} else {
									if(controls != null){ // found controls
										data.push({Control_name:controls.Control_name,status:documents[count_control-1].ThenControl_status});
									} else {  // not found line
										data.push({Control_name:'None',status:documents[count_control-1].ThenControl_status});
									}
								}
								if(count_control == documents.length){
									callback(null,data);
								}
							});
						}
					} else {
						callback(null,'None');
					}
				}
			});
		} catch(err){
			console.log(err);
		}
} // end func




/*-------------------------------
	Main run
--------------------------------*/
// Main_temp();
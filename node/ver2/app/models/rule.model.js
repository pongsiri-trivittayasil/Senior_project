var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// if tag
var IfTagSchema = new Schema({
	IfTag_id : {type:String,unique:true},
	IfTag_name : String,
	IfTag_room : String,
	User:String,
	Map:String
}) 
// if time
var IfTimeSchema = new Schema({
	IfTime_id : {type:String,unique:true},
	IfTime_time : String,
	User:String,
	Map:String
});
// If Day
var IfDaySchema = new Schema({
	IfDay_id : {type:String,unique:true},
	IfDay_day : String,
	User:String,
	Map:String
});
// If Date
var IfDateSchema = new Schema({
	IfDate_id : {type:String,unique:true},
	IfDate_date : String,
	User:String,
	Map:String
});
// If Status
var IfStatusSchema = new Schema({
	IfID : {type:String,unique:true},
	IfTime : String,
	IfDay : String,
	IfDate : String,
	IfTag : String,
	User:String,
	Map:String
});
// Then Line
var ThenLineSchema = new Schema({
	ThenLine_id : String,
	ThenLine_token : String,
	ThenLine_message : String,
	User:String,
	Map:String
});
// Then Control
var ThenControlSchema = new Schema({
	ThenControl_id : String,
	ThenControl_Control_id : String,
	ThenControl_status : String,
	User:String,
	Map:String
});

mongoose.model('IfTime',IfTimeSchema);
mongoose.model('IfDay',IfDaySchema);
mongoose.model('IfDate',IfDateSchema);
mongoose.model('IfTag',IfTagSchema);
mongoose.model('IfStatus',IfStatusSchema);
mongoose.model('ThenLine',ThenLineSchema);
mongoose.model('ThenControl',ThenControlSchema);
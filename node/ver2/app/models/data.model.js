var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//control
var ControlSchema = new Schema({
	Control_name: {type:String,unique:false,index:true,trim:true,require:true},
	Status: Boolean,
	User: String,
	Map: String
});
//Tag
var TagSchema = new Schema({
	Tag_name: {type:String,unique:false,index:true,trim:true,require:true},
	x: Number,
	y: Number,
	room: String,
	User: String,
	Map: String
});
//Room
var RoomSchema = new Schema({
	Room_name: {type:String,unique:false,index:true,trim:true,require:true},
	max_x: Number,
	min_x: Number,
	max_y: Number,
	min_y: Number,
	User: String,
	Map: String
});
//AP
var APointSchema = new Schema({
	AP_name: {type:String,unique:false,index:true,trim:true,require:true},
	x: Number,
	y: Number,
	User: String,
	Map: String
});
//Rule
var RuleSchema = new Schema({
	Time: Date,
	Notify:String,
	Line:String
});
mongoose.model('Control',ControlSchema);
mongoose.model('Tag',TagSchema);
mongoose.model('Room',RoomSchema);
mongoose.model('AP',APointSchema);
mongoose.model('Rule',RuleSchema);

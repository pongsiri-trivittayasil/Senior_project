var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//control
var ControlSchema = new Schema({
	Control_name: {type:String,unique:true,index:true,trim:true,require:true},
	Control_id: {type:Number,unique:true,trim:true},
	Status: Boolean,
	User: String,
	Map: String
});
//Tag
var TagSchema = new Schema({
	Tag_name: {type:String,unique:true,index:true,trim:true,require:true},
	Tag_id: {type:Number,trim:true},
	room: String,
	User: String,
	Map: String
});
//Room
var RoomSchema = new Schema({
	Room_name: {type:String,unique:true,index:true,trim:true,require:true},
	Room_id:{type:Number,unique:true,trim:true},
	Room_mac:String,
	IntitialValue:Number,
	max_x: Number,
	min_x: Number,
	max_y: Number,
	min_y: Number,
	User: String,
	Map: String
});
//AP
var APointSchema = new Schema({
	AP_name: {type:String,unique:true,index:true,trim:true,require:true},
	x: Number,
	y: Number,
	User: String,
	Map: String
});
var LineSchema = new Schema({
	Line_name: {type:String,unique:true,index:true,trim:true,require:true},
	Line_token: {type:String,unique:true,trim:true},
	User: String,
	Map: String
});
mongoose.model('Control',ControlSchema);
mongoose.model('Tag',TagSchema);
mongoose.model('Room',RoomSchema);
mongoose.model('AP',APointSchema);
mongoose.model('Line',LineSchema);
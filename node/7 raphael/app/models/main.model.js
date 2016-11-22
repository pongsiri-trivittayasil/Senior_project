var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ControlSchema = new Schema({
	Control_name: {type:String,unique:false,index:true},
	Status: Boolean
});
var TagSchema = new Schema({
	Tag_name: {type:String,unique:false,index:true},
	x: Number,
	y: Number,
	room: String
});
var RoomSchema = new Schema({
	Room_name: {type:String,unique:false,index:true},
	max_x: Number,
	min_x: Number,
	max_y: Number,
	min_y: Number
});
var APointSchema = new Schema({
	AP_name: {type:String,unique:false,index:true},
	x: Number,
	y: Number
});

mongoose.model('Control',ControlSchema);
mongoose.model('Tag',TagSchema);
mongoose.model('Room',RoomSchema);
mongoose.model('AP',APointSchema);
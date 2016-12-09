var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MapSchema = new Schema({
	Mapname:{type:String,unique:true,index:true,trim:true,require:true},
	User:String
});

mongoose.model('Map',MapSchema);
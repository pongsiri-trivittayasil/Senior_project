var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// history
var historySchema = new Schema({
	time: String,
	tagid:String,
	roomid:String
})

mongoose.model('History',historySchema);
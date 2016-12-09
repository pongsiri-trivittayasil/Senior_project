var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
//User
var UserSchema = new Schema({
	Username:{type:String,unique:true,index:true,trim:true,require:true},
	Password: String,
	salt:{
		type: String		
	},
	provider:{
		type:String,
		required:'Provider is required'
	},
	providerID:String,
	providerData:{}
})
UserSchema.pre('save',function(next){
	console.log('im in');
	if (this.Password){
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
		this.Password = this.hashPassword(this.Password);
		console.log(this.Password);
	}
	next();
});
UserSchema.methods.hashPassword = function(password){
	return crypto.pbkdf2Sync(password,this.salt,10000,64).toString('base64');
};
UserSchema.methods.authenticate = function(password){
	return this.Password === this.hashPassword(password);
};
mongoose.model('User',UserSchema);
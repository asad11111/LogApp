var mongoose= require('mongoose');

module.exports=mongoose.model('Pic', {
	description:"String",
	url:"String",
	date:{type: Date, default:Date.now},
	username:"String"
})
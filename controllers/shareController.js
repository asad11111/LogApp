var cloudinary= require('cloudinary');
var Pic = require('../datasets/pics.js');
var user= require('../models/account.js');
var fs= require('fs');
module.exports.shareNewPicture= function(req,res)
{
	var fileName=req.files.file.path;
	var fileData= req.body.data
	console.log(' body'+ req.body);
	console.log('response '+ req);
	cloudinary.uploader.upload(fileName, function(response)
		{
			var picture=new Pic();
			var usern=new user();
			usern.username=req.username;
			picture.description=fileData.description;
			picture.url=response.secure_url;
			console.log('secure_url is   '+ response.secure_url);
			picture.save();
			res.status(200).end();
			console.log('This the response '+ res);
		});
}
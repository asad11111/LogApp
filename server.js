var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator=require('express-validator');
var multer= require('multer');
var fs=require('fs');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var upload = multer({dest: "./uploads"});
var session= require('express-session');
var fs = require('fs');
var cors= require('cors');
var multiparty= require('connect-multiparty');
var multipartMiddleware= multiparty();
var viewController=require('./controllers/viewController');
var shareController=require('./controllers/shareController');
var configs = require('./configs/config.js');
var cloudinary= require('cloudinary');
if(env=='development')
{
mongoose.connect('mongodb://localhost/traveldb');
}
else{
mongoose.connect('mongodb://asad:maidaaaa1@ds161162.mlab.com:61162/heroku_54txt9cj');
}
var configs = require('./configs/config.js');
process.env.GLOBAL_PATH= __dirname;
configs.setConfigs();
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var con= mongoose.connection;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', index);
app.use('/users', users);
app.use(express.static("public"));
//Passport Auth
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
app.use(multipartMiddleware);
app.use(cors());
app.use('/app', express.static(__dirname+ '/app'));
app.get('/',function(req,res){
  res.sendFile(__dirname +'/index.html');
});
//mongoose authenticate
app.get('/login', function(req, res) 
{
    res.render('login');   
});
console.log('This is shareController'+ shareController.getNewPhoto);
app.get('/nextPage', function(req, res)  {
    res.render('nextPage');
  });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.post('/', function(req, res) {
  req.redirect('share');
});
app.get('www/index.html',function(req,res){
  res.render('index');
})
app.post('/share', multipartMiddleware, shareController.shareNewPicture);
app.get('/getNewPhoto', viewController.getNewPhoto);
var env=process.env.NODE_ENV=process.env.NODE_ENV||'development';

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.set('port', process.env.PORT || 3000)

var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port)
})
module.exports = app;
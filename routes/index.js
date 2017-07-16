var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var viewController=require('../controllers/viewController');
var shareController=require('../controllers/shareController');

var multiparty= require('connect-multiparty');
var multipartMiddleware= multiparty();
router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username, email:req.body.email,birthday:req.body.birthday }), req.body.password, function(err, account) {
    if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});
router.get('/share', function(req, res) {
    res.render('share', { user : req.user });
});
router.get('/view',function(req,res){
    res.render('view',{user:req.user});
});
router.post('/')
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('nextPage');
});
router.get('www/index.html', function(req,res){
    res.render('index');
})
router.post('/share', multipartMiddleware, shareController.shareNewPicture);
router.get('/getNewPhoto', viewController.getNewPhoto);
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
    






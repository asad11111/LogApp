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
router.get('/api/reviews', function(req, res) {
 
        console.log("fetching reviews");
 
        // use mongoose to get all reviews in the database
        Review.find(function(err, reviews) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
 
            res.json(reviews); // return all reviews in JSON format
        });
    });
 
    // create review and send back all reviews after creation
    router.post('/api/reviews', function(req, res) {
 
        console.log("creating review");
 
        // create a review, information comes from request from Ionic
        Review.create({
            title : req.body.title,
            description : req.body.description,
            rating: req.body.rating,
            done : false
        }, function(err, review) {
            if (err)
                res.send(err);
 
            // get and return all the reviews after you create another
            Review.find(function(err, reviews) {
                if (err)
                    res.send(err)
                res.json(reviews);
            });
        });
 
    });
 
    // delete a review
    router.delete('/api/reviews/:review_id', function(req, res) {
        Review.remove({
            _id : req.params.review_id
        }, function(err, review) {
 
        });
    });

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});
router.get('/share', function(req, res) {
    res.render('share', { user : req.user });
});
router.get('/view',function(req,res){
    res.render('view',{  username: req.user});
});
router.get('/nextPage', function(req,res){
    res.render('nextPage',{user:req.user});

})
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('nextPage');
});
router.get('/live', function(req,res){
    res.render('live');
});
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
    






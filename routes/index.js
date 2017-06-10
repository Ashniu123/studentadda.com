var express = require('express');
var path = require('path');
var User = require('../models/userSchema');
var Image=require('../models/imageSchema');
var Event=require('../models/eventSchema');
var passport=require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    /*Not working*/
    if (req.session.username)
        res.redirect('/dashboard');
    else
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/signup', function (req, res) {
    console.log(req.body);
    User.register(new User({username: req.body.email}), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).json({err: err});
        }
        if (req.body.firstName) {
            user.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            user.lastName = req.body.lastName;
        }
        user.tutorial=true;
        user.save(function (err, user) {
            if(err) throw err;
            else {
                Event.create({username:req.body.email,events:[]},function(err,event){
                    if(err) throw err;
                    else{
                        console.log(event);
                    }
                });
                console.log(user);
                return res.status(200).json({status:true});
            }
        });
    });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    success:false
                });
            }else{
                req.session.username=req.body.username;
                if(req.body.rememberme){
                    req.session.cookie.maxAge=null;
                }
                res.status(200).json({
                    status: 'Login successful!',
                    success: true
                });
            }
        });
    })(req,res,next);
});

router.post('/forgot',function(req,res,next){
    //send mail to email in req.body.email
});
module.exports = router;

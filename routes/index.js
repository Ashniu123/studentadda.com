var express = require('express');
var path = require('path');
var User = require('../models/userSchema');
// var bodyParser=require('body-parser');
var passport=require('passport');

var Verify=require('./Verify');

var router = express.Router();
// router.use(bodyParser.json());

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
router.get('/index',function(req,res){
   res.redirect('/');
});

router.post('/signup', function (req, res) {
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
        user.save(function (err, user) {
            if(err) throw err;
            else {
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
                var token = Verify.getToken(user);
                req.session.token=token;
                req.session.username=req.body.username;
                res.status(200).json({
                    status: 'Login successful!',
                    success: true,
                    token: token
                });
            }
        });
    })(req,res,next);
});

router.post('/forgot',function(req,res,next){
    //send mail to email in req.body.email
});
module.exports = router;

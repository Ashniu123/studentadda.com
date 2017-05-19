var express = require('express');
var path = require('path');
var User = require('../models/userSchema');
var bodyParser=require('body-parser');
var passport=require('passport');

var router = express.Router();
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/signup', function (req, res, next) {

    User.register(new User({email: req.query.email}), req.query.password, function (err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        if (req.query.firstname) {
            user.firstname = req.query.firstname;
        }
        if (req.query.lastname) {
            user.lastname = req.query.lastname;
        }
        user.save(function (err, user) {
            if(err) throw err;
            else {
                passport.authenticate('local')(req, res, function () {
                    return res.status(200).json({status: 'true'});
                });
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
                    err: 'Could not log in user'
                });
            }else{
                //Set session and redirect
                res.redirect('/dashboard');
            }
        });
    })(req,res,next);
});

router.post('/forgot',function(req,res,next){
    //send mail to email in req.body.email
});
module.exports = router;

var express = require('express');
var path = require('path');
var User = require('../models/userSchema');
var Image = require('../models/imageSchema');
var Event = require('../models/eventSchema');
var passport = require('passport');
var mongoose = require('mongoose');

var Verify = require('./Verify');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (localStorage.token)
        res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
    else
        res.redirect('/index');
});

router.route('user/info/:id')
    .post(Verify.verifyUser, function (req, res) {
        var id = req.params.id;
        User.findOneAndUpdate({_id: id}, {
            $set: {
                gender: req.body.gender,
                dob: req.body.dob,
                country: req.body.country,
                college: req.body.college,
                stream: req.body.stream,
                current: req.body.current,
                branch: req.body.branch
            }
        }, {upsert: true}, function (err, user) {
            console.log(user);
            res.status(200).json({
                status: true
            });
        });
    })
    .get(Verify.verifyUser,function (req,res){
        var id=req.params.id;
        User.findOne({_id:id},function(err,user){
            if(err) throw err;
            else {
                console.log(user);
                res.status(200).json(user);
            }
        });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({
        status: true
    });
});

module.exports = router;

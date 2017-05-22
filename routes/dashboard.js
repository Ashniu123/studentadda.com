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
    if (req.session.user_id)
        res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
    else
        res.redirect('/');
});

router.route('/user')
    .get(Verify.verifyUser, function (req, res) {
        var id = req.session.user_id;
        User.findOne({_id: id}, function (err, user) {
            if (err) throw err;
            else {
                console.log(user);
                res.status(200).json(user);
            }
        });
    })
    .post(Verify.verifyUser, function (req, res) {
        var id = req.session.user_id;
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
    });

router.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy(function (err) {
        console.log(err);
    });
    res.status(200).json({
        status: true
    });
});

module.exports = router;

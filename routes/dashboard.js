var express = require('express');
var path = require('path');
var User = require('../models/userSchema');
var Image = require('../models/imageSchema');
var Event = require('../models/eventSchema');
var passport = require('passport');
var mongoose = require('mongoose');
var moment = require('moment');

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
        var id = req.decoded._doc._id;
        User.findOne({_id: id}, function (err, user) {
            if (err) throw err;
            else {
                res.status(200).json(user);
            }
        });
    })
    .post(Verify.verifyUser, function (req, res) {
        var id = req.decoded._doc._id;
        User.findOneAndUpdate({_id: id}, {
            $set: {
                gender: req.body.gender,
                dob: new Date(req.body.dob),
                // country: req.body.country,
                college: req.body.college,
                stream: req.body.stream,
                current: req.body.current,
                branch: req.body.branch
            }
        }, {upsert: true, new: true}, function (err, user) {
            if (err) throw err;
            else {
                res.status(200).json(user);
            }
        });
    });

router.route('/user/events')
    .get(Verify.verifyUser, function (req, res) {
        var username = req.decoded._doc.username;
        Event.findOne({username: username}, {events: 1, _id: 0}, function (err, event) {
            if (err) {
                throw err;
            } else {
                console.log("Get Event:", event);
                res.status(200).send(event.events);
            }
        });
    })
    .post(Verify.verifyUser, Verify.verifyEventsUser, function (req, res) {
        var username = req.decoded._doc.username;
        // console.log("Body:",req.body);
        Event.findOneAndUpdate({username: username}, {
            $push: {
                events: req.body
            }
        }, {new: true}, function (err, event) {
            if (err) {
                throw err;
            } else {
                console.log("Post Event", event);
                res.status(200).send(event);
            }
        });
    })
    .put(Verify.verifyUser, function (req, res) {
        var username = req.decoded._doc.username;
        Event.update({username:username,'events.id':req.body.id.toString()},{
            $set:{
                'events.$.allDay':req.body.allDay,
                'events.$.textColor':req.body.textColor,
                'events.$.color':req.body.color,
                'events.$.description':req.body.description,
                'events.$.start':req.body.start,
                'events.$.end':req.body.end
            }
        },function(err,response){
            if(err) throw err;
            else{
                res.status(200).send(response);
            }
        });
    })
    .delete(Verify.verifyUser, function (req, res) {
        console.log("DELETE body:",req.body);
        var username = req.decoded._doc.username;
        Event.update({username: username},{$pull:{events:{id:req.body.id}}}, function (err, response) {
            if (err) throw err;
            else {
                console.log(response);
                res.status(200).send(response)
            }
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

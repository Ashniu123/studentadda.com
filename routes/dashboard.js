var express = require('express');
var path = require('path');
var User = require('../models/userSchema');
var Image = require('../models/imageSchema');
var Event = require('../models/eventSchema');
var passport = require('passport');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();

/* GET dashboard page. */
router.get('/', function (req, res) {
    if (req.session.username)
        res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
    else
        res.redirect('/');
});

/*For User Details*/
router.route('/user')
    .get(function (req, res) {
        var username = req.session.username;
        User.findOne({username: username}, function (err, user) {
            if (err) throw err;
            else {
                res.status(200).json(user);
                if(user.tutorial===true) {
                    user.tutorial = false;
                    user.save(function (err, response) {
                        if(err) throw err;
                        else{
                            console.log("Changed Tutorial!");
                        }
                    });
                }
            }
        });
    })
    .post(function (req, res) {
        var username = req.session.username;
        User.findOneAndUpdate({username: username}, {
            $set: {
                gender: req.body.gender,
                dob: new Date(req.body.dob),
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
    })
    .put(function (req,res) {
        if(req.body.tutorial) {
            User.update({username: req.session.username}, {$set: {tutorial: false}}, function (err, response) {
                if(err) throw err;
                console.log("Tutorial Response", response);
                res.status(200).send(response);
            });
        }
    });

/*To Update the Avatar of User*/
router.post('/user/avatar', function (req, res) {
    console.log("Avatar Body:", req.body);
    var username = req.session.username;
    User.update({username: username}, {$set: {avatar: req.body.avatar}}, function (err, response) {
        if (err) throw err;
        else {
            console.log(response);
            res.status(200).send(response);
        }
    });
});

/*For User Events*/
router.route('/user/events')
    .get(function (req, res) {
        var username = req.session.username;
        Event.findOne({username: username}, {events: 1, _id: 0}, function (err, events) {
            if (err) {
                throw err;
            } else {
                console.log("GET events:",events);
                res.status(200).send(events.events);
            }
        });
    })
    .post(function (req, res) {
        var username = req.session.username;
        // console.log("Body:",req.body);
        Event.findOneAndUpdate({username: username}, {
            $push: {
                events: req.body
            }
        }, {new: true}, function (err, event) {
            if (err) {
                throw err;
            } else {
                console.log("POST event",event);
                res.status(200).send(event);
            }
        });
    })
    .put(function (req, res) {
        var username = req.session.username;
        Event.update({username: username, 'events.id': req.body.id.toString()}, {
            $set: {
                'events.$.allDay': req.body.allDay,
                'events.$.textColor': req.body.textColor,
                'events.$.color': req.body.color,
                'events.$.description': req.body.description,
                'events.$.start': req.body.start,
                'events.$.end': req.body.end
            }
        }, function (err, response) {
            if (err) throw err;
            else {
                console.log("PUT events",response);
                res.status(200).send(response);
            }
        });
    })
    .delete(function (req, res) {
        var username = req.session.username;
        Event.update({username: username}, {$pull: {events: {id: req.body.id}}}, function (err, response) {
            if (err) throw err;
            else {
                console.log(response);
                res.status(200).send(response)
            }
        });
    });

/*For User Notes*/
router.route('/user/notes')
    .get(function (req, res) { //get subject data
        Image.find({username: req.session.username}, function (err, notes) {
            if (err) throw err;
            else {
                console.log("Get Notes", notes);
                res.status(200).send(notes);
            }
        });
    })
    .post(function (req, res) {//add a subject
        Image.create({
            username: req.session.username,
            subject: req.body.subject,
            color:req.body.color,
            orderno: req.body.orderno
        }, function (err, response) {
            if (err) throw err;
            else {
                console.log("Post Notes", req.body);
                console.log(response);
                res.status(200).send(response);
            }
        });
    })
    .put(function (req, res) {//add&delete a note
        if(req.body.remove){
            Image.findOne({
                username: req.session.username, subject: req.body.subject
            }, function (err, notes) {
                console.log("Query Notes", notes);
                console.log("Delete Notes Body",req.body);
                notes.data.splice(req.body.index,1);
                var pgno=req.body.pgno;
                for(var i=req.body.index;i<notes.data.length;i++){
                    var obj=notes.data[i];
                    obj.pgno=pgno++;
                    console.log(pgno+" Object:\n"+obj.pgno);
                }
                notes.save(function(err,response){
                   if(err) throw err;
                   else{
                       console.log("Note Delete Save:",response);
                       res.status(200).send(response);
                   }
                });
            });
        }else{
            Image.findOne({
                username: req.session.username,
                subject: req.body.subject
            }, function (err, notes) {
                if (err) throw err;
                else {
                    console.log("Query Notes", notes);
                    console.log("Add Notes Body", req.body);
                    notes.data.push({
                        "pgno": req.body.pgno,
                        "note": req.body.note
                    });
                    notes.save(function (err, response) {
                        if (err) throw err;
                        console.log(response);
                        res.status(200).send(response);
                    });
                }
            });
        }
    })
    .delete(function (req, res) {//delete a subject
        Image.findOneAndRemove({
            username: req.session.username, subject: req.body.subject
        }, function (err, result) {
            if (err) throw err;
            else {
                console.log("Delete Notes", req.body);
                console.log(result);
                var order=result.orderno,sendResponse={ok:1};
                /*To update Orderno*/
                Image.find({username: req.session.username, orderno: {$gt: order}}).sort({orderno:1}).exec(function (err, notes) {
                    if(err) throw err;
                    else {
                        console.log("UPDATE DELETE:",notes);
                        console.log("Order Start:",order);
                        if(notes.length>0) {
                            for (var i = 0; i < notes.length;i++) {
                                var obj = notes[i];
                                obj.orderno = order++;
                                obj.save(function (err, response) {
                                    if (err) throw err;
                                    else {
                                        sendResponse = response;
                                    }
                                });
                            }
                        }
                        res.status(200).send(sendResponse);
                    }
                });
            }
        });
    });

/*Logout and Destroy Session*/
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

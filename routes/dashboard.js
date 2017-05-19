var express = require('express');
var path=require('path');
var User=require('../models/userSchema');
var Image=require('../models/imageSchema');
var Event=require('../models/eventSchema');
var passport=require('passport');
var mongoose=require('mongoose');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../public','dashboard.html'));
});

router.get('user/addInfo/:email',function(req,res){
    var email=req.params.email;
    User.findOneAndUpdate({email:email},{$set:{
        gender:req.query.gender,
        dob:req.query.dob,
        country:req.query.country,
        college:req.query.college,
        stream:req.query.stream,
        current:req.query.current,
        branch:req.query.branch
    }},{upsert:true},function(err,user){
        console.log(user);
        //send status and refresh page
        //refresh page
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'true'
    });
});

module.exports = router;

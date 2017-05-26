var User = require('../models/userSchema');
var Event = require('../models/eventSchema');
var Image = require('../models/imageSchema');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var secretKey = "12345-67890-09876-54321";

exports.getToken = function (user) {
    return jwt.sign(user, secretKey, {
        expiresIn: 86400
    });
};

exports.verifyUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('unauthenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyEventsUser=function(req,res,next){
    var username=req.decoded._doc.username;
    //If there is no event document for this user, create one
    Event.findOne({username:username},function(err,event){
        if(err) throw err;
        else{
            if(event===undefined){
                Event.create({username:username,events:[]},function(err,event){
                    if(err) throw err;
                    else{
                        console.log(event);
                    }
                });
            }
            next();
        }
    });
};

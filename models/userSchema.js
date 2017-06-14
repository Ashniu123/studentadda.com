var mongoose = require('mongoose') ;
var passportlocalmongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var User = new Schema(
    {
        firstName : String,
        lastName : String,
        password : String,
        username : String,//emailId
        avatar: String,
        gender: String,
        dob:Date,
        college:String,
        stream:String,
        current:String,
        branch:String,
        tutorial:Boolean,
        verified:Boolean
    },
    {
        timestamps : true
    }
);

User.plugin(passportlocalmongoose);

module.exports = mongoose.model('user',User);

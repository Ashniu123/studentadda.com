var mongoose = require('mongoose') ;
var passportlocalmongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;


var User = new Schema(
    {
        firstName : String,
        lastName : String,
        password : String,
        email : String,
        avatar: Buffer,
        gender: String,
        dob:Date,
        country:String,
        college:String,
        stream:String,
        current:String,
        branch:String
    },
    {
        timestamps : true
    }
);

User.plugin(passportlocalmongoose);
module.exports = mongoose.model('user',User);

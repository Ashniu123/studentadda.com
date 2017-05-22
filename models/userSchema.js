var mongoose = require('mongoose') ;
var passportlocalmongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
require('mongoose-moment')(mongoose);

var User = new Schema(
    {
        firstName : String,
        lastName : String,
        password : String,
        username : String,//emailId
        avatar: Buffer,
        gender: String,
        dob:'Moment',
        // country:String,
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

var mongoose = require('mongoose') ;
var Schema = mongoose.Schema;

var image = new Schema(
    {
        email : String,
        subject:String,
        binary: Buffer,
        contentType:String
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model('userImage',image);

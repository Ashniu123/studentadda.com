var mongoose = require('mongoose') ;
var Schema = mongoose.Schema;

var image = new Schema(
    {
        username : String,//EmailId
        subject:String,
        binary: Buffer
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model('userImage',image);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var image = new Schema(
    {
        username: String,//EmailId
        subject: String,
        orderno: Number,
        color:String,
        data: []
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('userImage', image);
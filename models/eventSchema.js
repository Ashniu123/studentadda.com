var mongoose = require('mongoose') ;
var Schema = mongoose.Schema;

var event = new Schema(
    {
        username:String,//EmailId
        events:[]
    },
    {
        timestamps : true
    });

module.exports = mongoose.model('userEvent',event);

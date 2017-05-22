var mongoose = require('mongoose') ;
var Schema = mongoose.Schema;
require('mongoose-moment')(mongoose);

var event = new Schema(
    {
        id:Number,
        username:String,//EmailId
        title:String,
        start:'Moment',
        end:'Moment',
        description:String,
        color:String,
        dow:[Number],
        allDay:Boolean,
        textColor:String
    },
    {
        timestamps : true
    });

module.exports = mongoose.model('userEvent',event);

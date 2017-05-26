var mongoose = require('mongoose') ;
var Schema = mongoose.Schema;

var event = new Schema(
    {
        username:String,//EmailId
        events:[
            // {
            //     id: Number,
            //     title: String,
            //     start: 'Moment',
            //     end: 'Moment',
            //     description: String,
            //     color: String,
            //     dow: [Number],
            //     allDay: Boolean,
            //     textColor: String
            // }
        ]
    },
    {
        timestamps : true
    });

module.exports = mongoose.model('userEvent',event);

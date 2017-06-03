var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var image = new Schema(
    {
        username: String,//EmailId
        subject: String,
        orderno: Number,
        data: []
        /*
         {
         id:666,
         orderno:1,
         subject:"WP",
         data:[
         {
         id:123,
         pgno:1,
         note:'img/WP1.jpeg'
         },
         {
         id:124,
         pgno:2,
         note:'img/WP2.jpeg'
         },
         {
         id:124,
         pgno:3,
         note:'img/WP3.jpeg'
         }
         ]
         }
         */

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('userImage', image);
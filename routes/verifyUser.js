var express = require('express');
var path = require('path');
var User = require('../models/userSchema');
var crypto=require('crypto');

var cryptoKey="ABCDE-ZYXWV-ZYXWV-ABCDE",cryptoAlgo='aes-256-ctr';
var router = express.Router();

router.get('/', function (req, res) {
    /**
     * Get Query URL and decode it then verify user if not already verified
     */
    // console.log("Query URL", req.query);
    var queryId=req.query.q;
    var decipher=crypto.createDecipher(cryptoAlgo,cryptoKey);
    var plainId=decipher.update(queryId,'hex','utf8');
    plainId+=decipher.final('utf8');
    console.log("PlainID", plainId);
    if (plainId) {
        User.findOne({_id: plainId}, function (err, user) {
            if (err){
                console.log("Invalid URL");
                res.sendFile(path.join(__dirname, '../public', 'verify.html'));
            }
            else {
                console.log("User Verified");
                user.verified = true;
                user.save(function (err, user) {
                    if (err) throw err;
                    else {
                        res.setHeader('verified', 'true');
                        res.sendFile(path.join(__dirname, '../public', 'verify.html'));
                    }
                });
            }
        });
    }
});

module.exports = router;

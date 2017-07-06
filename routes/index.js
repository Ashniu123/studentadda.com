var express = require('express');
var path = require('path');
var User = require('../models/userSchema');
var Image=require('../models/imageSchema');
var Event=require('../models/eventSchema');
var passport=require('passport');
var nodemailer=require('nodemailer');
var crypto=require('crypto');

var cryptoKey="ABCDE-ZYXWV-ZYXWV-ABCDE",cryptoAlgo='aes-256-ctr';

var router = express.Router();

/*Initialize NodeMailer*/
var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers:'SSLv3'
    },
    auth: {
        user: process.env.OUTLOOK_UID,
        pass: process.env.OUTLOOK_PWD
    }
});


/* GET home page. */
router.get('/', function (req, res) {
    if (req.session.username)
        res.redirect('/dashboard');
    else
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/signup', function (req, res) {
    /**
     * Register User
     * Send a email to verify the user
     * Add an empty event [] his event's table
     */
    User.register(new User({username: req.body.email}), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).json({err: err});
        }
        if (req.body.firstName) {
            user.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            user.lastName = req.body.lastName;
        }
        user.tutorial=true;
        user.verified=false;
        user.save(function (err, user) {
            if(err) throw err;
            else {
                /*Sending Mail*/
                var cipher=crypto.createCipher(cryptoAlgo,cryptoKey);
                var cipherId=cipher.update(user._id.toString(),'utf8','hex');
                cipherId+=cipher.final('hex');
                console.log("CipherId",cipherId);
                var urlToSendTo=req.protocol + '://' + req.get('host') + '/verify?q='+cipherId;

                // setup e-mail data, even with unicode symbols
                var mailOptions = {
                    from: '"Studentadda" <studentadda@outlook.com>', // sender address (who sends)
                    to: req.body.email, // list of receivers (who receives)
                    subject: 'Welcome to Studentadda', // Subject line
                    html: 'Hi '+user.firstName+',<br>To <strong>Verify</strong> your email address, Please goto <a href="'+urlToSendTo+'">' + urlToSendTo + '</a>' // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function(err, info){
                    if(err) throw err;
                    console.log('Message sent: ' + info.response);
                });

                /*Creating Empty Event object*/
                Event.create({username:req.body.email,events:[]},function(err,event){
                    if(err) throw err;
                    else{
                        console.log(event);
                    }
                });
                console.log(user);
                return res.status(200).json({status:true});
            }
        });
    });
});

router.post('/login', function(req, res, next) {
    /**
     * Authenticate User Credentials and if valid then redirect to dashboard page(done on client side)
     */
    passport.authenticate('local', function(err, user, info) {
        console.log("Login err:",err);
        console.log("Login user:",user);
        console.log("Login info:",info);
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        if(!user.verified){
            return res.status(200).json({
                verified:false,
                success:true
            });
        }else {
            req.logIn(user, function (err) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        verified:true
                    });
                } else {
                    console.log("Logged in Successfully");
                    req.session.username=req.body.username;
                    if (req.body.rememberme) {
                        req.sessionOptions.maxAge = req.sessionOptions.maxAge*10;//10 Days
                    }
                    res.status(200).json({
                        status: 'Login successful!',
                        success: true,
                        verified:true
                    });
                }
            });
        }
    })(req,res,next);
});

module.exports = router;

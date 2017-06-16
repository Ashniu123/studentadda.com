var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session=require('express-session');

var index = require('./routes/index');
var dashboard=require('./routes/dashboard');
var verifyUser=require('./routes/verifyUser');

var app = express();

var mongoUrl=process.env.MONGOLAB_URI||"mongodb://localhost:27017/studentadda";
var sessionKey="abcde-ABCDE-uvxyz-UVXYZ";

mongoose.connect(mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected to server Successfully!");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({limit:'5mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport config
var User=require('./models/userSchema');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Session Config
app.use(session({
    secret:sessionKey,
    saveUninitialized:true,
    resave:false,
    rolling:true,
    cookie:{
        maxAge:8640000
    }
}));

app.use('/', index);
app.use('/dashboard',dashboard);
app.use('/verify',verifyUser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

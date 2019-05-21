var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
require('./config/passport')(passport);
app.use(cookieParser());
app.use(bodyParser());
app.set('view engine', 'ejs');
app.use(session({
    secret: 'phanminh'
}));
app.use(passport.initialize());
app.use(passport.session());
require('./app/routes.js')(app, passport);
app.listen(port);
console.log('Server listened in port ' + port);
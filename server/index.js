function run(userModel){
	var express = require("express");
	var app = express();
	var router = require("./router");
	var passport = require('passport');
	var flash    = require('connect-flash');

	var morgan       = require('morgan');
	var cookieParser = require('cookie-parser');
	var bodyParser   = require('body-parser');
	var session      = require('express-session');
	app.set('view engine', 'ejs');

	app.use(express.static('public'));
	var session   = require('express-session');
  
	require('../config/passport')(passport, userModel); // pass passport for configuration

	// set up our express application
	app.use(morgan('dev')); // log every request to the console
	app.use(cookieParser()); // read cookies (needed for auth)
	app.use(bodyParser.json()); // get information from html forms
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(session({
	    secret: 'ilovescotchscotchyscotchscotch', // session secret
	    resave: true,
	    saveUninitialized: true
	}));
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

	app.listen(8080, function(){
		router(app, userModel, passport);
		console.log("listening 8080 port");
	})

}

module.exports = run;

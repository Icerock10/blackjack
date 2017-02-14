function run(userModel){
	var express = require("express");
	var app = express();
	var router = require("./router");

	app.set('view engine', 'ejs');

	app.use(express.static('public'));


	app.listen(3000, function(){
		router(app, userModel);
		console.log("listening 3000 port");
	})

}

module.exports = run;

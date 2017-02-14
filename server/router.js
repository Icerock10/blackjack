function run(app, userModel){

	app.get("/", function(req, res){
		res.render('template', {page:"main"} );
	})

	app.get("/users", function(req, res){
    userModel.find({},{"fname" : true}, function(err,users){
            if(err) {
							res.send(err);
						} if(users) {
						console.log(users);
        		res.render('template', {page:"users", users: users} );
           } else {
             res.send("No users found with that ID")
           }
			 });

	})

	app.get("/about", function(req, res){
		res.render('template', {page:"about"} );
	})
	app.get("/registration", function(req, res){
		res.render('template', {page:"registration"} );
	})

	app.get("/profile", function(req, res){
		var userTemplate = {
			fname: '',
			lname: '',
			email: '',
			passwd: '',
		};
		console.log(req.query);
		var userId = req.query.id;
		if (userId) {
			userModel.findOne({_id:userId}, function(err,user){
							if(err) {
								 return res.send(err);
							}
							if(user) {
							console.log(user);
							res.render('template', {page:"profile", user: user} );
							} else {
								console.log('privet')
								res.render('template', {page:"profile", user: userTemplate} );
							}
				 });
		} else {
			res.render('template', {page:"profile", user:userTemplate} );
		}
   	})
	app.get("/game", function(req, res){
	res.render('template', {page:"game"} );
	})
	app.get("/autorization", function(req, res){
	res.render('template', {page:"autorization"} );
	})

	//404
	app.use(function(req, res){

		res.status(404);
		res.render('template', {page:"404"} );
	})

	//500
	app.use(function(err, req, res, next){
    console.log(err);
		res.status(500);
		res.render('template', {page:"500"} );
	})
}

module.exports = run;

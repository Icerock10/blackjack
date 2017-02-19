function run(app, userModel, passport){

	app.get("/", function(req, res){
		res.render('template', {page:"index"} );
	})



	app.get("/about", function(req, res){
		res.render('template', {page:"about"} );
	})


	app.get("/game", function(req, res){
	res.render('template', {page:"game"} );
	})
	app.get('/profile', isLoggedIn, function(req, res) {

		res.render('template', {page:"profile",
					user : req.user
			});
	});

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
			req.logout();
			res.redirect('/');
	});

			app.get('/login', function(req, res) {
					res.render('template', {page:"login", message: req.flash('loginMessage') });
			});


			app.post('/login', passport.authenticate('local-login', {
					successRedirect : '/profile',
					failureRedirect : '/login',
					failureFlash : true
			}));



			app.get('/signup', function(req, res) {
					res.render('template', {page:"signup", message: req.flash('signupMessage') });
			});


			app.post('/signup', passport.authenticate('local-signup', {
					successRedirect : '/profile',
					failureRedirect : '/signup',
					failureFlash : true
			}));




			app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));


			app.get('/auth/facebook/callback',
					passport.authenticate('facebook', {
							successRedirect : '/profile',
							failureRedirect : '/'
					}));


			app.get('/connect/local', function(req, res) {
					res.render('template', {page:"connect-local", message: req.flash('loginMessage') });
			});
			app.post('/connect/local', passport.authenticate('local-signup', {
					successRedirect : '/profile',
					failureRedirect : '/connect/local',
					failureFlash : true
			}));




			app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));


			app.get('/connect/facebook/callback',
					passport.authorize('facebook', {
							successRedirect : '/profile',
							failureRedirect : '/'
					}));

	app.get('/unlink/local', isLoggedIn, function(req, res) {
			var user            = req.user;
			user.local.email    = undefined;
			user.local.password = undefined;
			user.save(function(err) {
					res.redirect('/profile');
			});
	});

	app.get('/unlink/facebook', isLoggedIn, function(req, res) {
			var user            = req.user;
			user.facebook.token = undefined;
			user.save(function(err) {
					res.redirect('/profile');
			});
	});



function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
			return next();

	res.redirect('/');
}


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

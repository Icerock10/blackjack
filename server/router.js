function run(app, passport, userModel){
	var formidable = require("formidable");
	var fs = require('fs');
	var im = require('imagemagick');
  var multiparty = require('multiparty');

	var dataToTemplate = {

	};
	app.use(function(req, res, next){
		dataToTemplate = {
			auth:req.isAuthenticated()
		}
		next();
	});


	app.get("/", function(req, res){
		dataToTemplate.page = "index";
		dataToTemplate.message = req.flash('loginMessage');
		res.render('template', dataToTemplate);
	})

app.post('/upload', function(req, res, next) {
    var form = new multiparty.Form();
		var uploadFile = {uploadPath: '', type: '', size: 0};
    var maxSize = 2 * 1024 * 1024;
		var supportMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];

		var errors = [];
		form.on('error', function(err){
			 if(fs.existsSync(uploadFile.path)) {
					 //если загружаемый файл существует удаляем его
					 fs.unlinkSync(uploadFile.path);
					 console.log('error');
			 }
	 });
	 form.on('close', function() {
			//если нет ошибок и все хорошо
			if(errors.length == 0) {


					//, передать с клиента айди юзера , в монго дб найти юзера ,
				 // запихнуть урлу в поле аватар (модель юзера) .
				 	var filePath = 'http://localhost:8080/files/' + uploadFile.name;
					res.send({status: 'ok', fileurl: filePath});

					userModel.findById(req.user._id, function(err, user){
																	console.log(req.user._id);
								 if (err) return handleError(err);
									user.local.avatar = 'http://localhost:8080/files/' + uploadFile.name;
									user.save(function (err){
										if (err) return handleError(err);


								});
					})

			}
			else {
					if(fs.existsSync(uploadFile.path)) {
							//если загружаемый файл существует удаляем его
							fs.unlinkSync(uploadFile.path);
					}
					//сообщаем что все плохо и какие произошли ошибки
					res.send({status: 'bad', errors: errors});
			}
	});

	// при поступление файла
	form.on('part', function(part) {
			//читаем его размер в байтах
			uploadFile.name = part.filename;
			uploadFile.size = part.byteCount;
			//читаем его тип
			uploadFile.type = part.headers['content-type'];
			//путь для сохранения файла
			uploadFile.path = './public/files/' + part.filename;

			//проверяем размер файла, он не должен быть больше максимального размера
			if(uploadFile.size > maxSize) {
					errors.push('File size is ' + uploadFile.size + '. Limit is' + (maxSize / 1024 / 1024) + 'MB.');
			}

			//проверяем является ли тип поддерживаемым
			if(supportMimeTypes.indexOf(uploadFile.type) == -1) {
					errors.push('Unsupported mimetype ' + uploadFile.type);
			}

			//если нет ошибок то создаем поток для записи файла
			if(errors.length == 0) {
					var out = fs.createWriteStream(uploadFile.path);
					part.pipe(out);
			}
			else {
					//пропускаем
					//вообще здесь нужно как-то остановить загрузку и перейти к onclose
					part.resume();
			}
	});

	// парсим форму
	form.parse(req);

});

	app.get("/about", function(req, res){
		dataToTemplate.page = "about";
		res.render('template', dataToTemplate);
	})


	app.get("/game", isLoggedIn, function(req, res){
	dataToTemplate.page = "game";
	res.render('template', dataToTemplate);
	})

	app.get('/profile', isLoggedIn, function(req, res) {
		req.session.user = req.user;
		dataToTemplate.page = "profile";
		dataToTemplate.user = req.user;
		res.render('template', dataToTemplate );
	});

	app.post('/editprofile', function(req, res){


	 userModel.findById(req.user._id, function (err, user) {
				if (err) return handleError(err);

				user.local.email = req.body.email;
				user.local.fname = req.body.fname;
				user.local.lname = req.body.lname;
				user.save(function (err) {

					if (err) return handleError(err);
					if(user) {
						res.redirect('/profile');
			   	 }
				});
		});
});

 app.post('/editfacebookprofile', function(req, res){
      userModel.findById(req.user._id, function(err, user){
				 if(err) return handleError(err);

				 user.facebook.email = req.body.email;
				 user.facebook.name  = req.body.fname;
				 user.facebook.lname  = req.body.lname;
					user.save(function (err){

						if (err) return handleError(err);
						if(user) res.redirect('/profile');

					});
			});
	 });



	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
			req.logout();
			res.redirect('/');
	});

			app.get('/login', function(req, res) {
					dataToTemplate.page = "login";
					dataToTemplate.message = req.flash('loginMessage');
					res.render('template', dataToTemplate);
			});


			app.post('/login', passport.authenticate('local-login', {
					successRedirect : '/profile',
					failureRedirect : '/login',
					failureFlash : true
			}));



			app.get('/signup', function(req, res) {
					dataToTemplate.page = "signup";
					dataToTemplate.message = req.flash('signupMessage');
					res.render('template', dataToTemplate);
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
					dataToTemplate.page = "connect-local";
					dataToTemplate.message = req.flash('loginMessage');
					res.render('template', dataToTemplate);
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






function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
			return next();

	res.redirect('/');
}



	//404
	app.use(function(req, res){
		dataToTemplate.page = "404";
		res.status(404);
		res.render('template', dataToTemplate );

	});

	//500
	app.use(function(err, req, res, next){
		if(err) console.log(err);
		dataToTemplate.page = "500";
		res.status(500);
		res.render('template', dataToTemplate );
	})
}

module.exports = run;

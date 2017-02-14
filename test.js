var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/blackjack');

var db = mongoose.connection;

db.once('open', function() {
	    var userSchema = new mongoose.Schema({
            fname : String,
            lname : String,
            email : String,
            passwd : String
      });
         var userModel = mongoose.model("userModel", userSchema);
         var user = new userModel({
            fname : "andrey",
            lname : "andr",
            email : "vasya@gmail.com",
            passwd : "12323"
         });

    userModel.find( {'email' : user.email},
                    'email',
            function(err, userEmail){

              if (userEmail.length) {
               console.log("This user already been!");
              } else {
                 user.save(function(err){
                     if(err) {
                       console.log(err);
                       return;}
                       console.log("User Saved!");
                     });
               }
           });
})

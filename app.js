var server = require("./server");
var mongoose = require("mongoose");
var passport = require("passport");
mongoose.connect('mongodb://localhost/blackjack');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  var userModel = require("./models/user.js")(mongoose);

  server(userModel);
})

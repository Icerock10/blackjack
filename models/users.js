function run(mongoose){
var userSchema = new mongoose.Schema({
      fname : String,
      lname : String,
      email : String,
      passwd : String
});

return mongoose.model("userModel", userSchema);
}
module.exports = run;

function initUserModel(mongoose){
  var bcrypt   = require('bcrypt-nodejs');

  // define the schema for our user model
  var userSchema = mongoose.Schema({

      local            : {
          email        : String,
          fname        : String,
          lname        : String,
          password     : String,
          avatar       : String
      },
      facebook         : {
          id           : String,
          token        : String,
          email        : String,
          name         : String,
          lname        : String,
          password     : String
      }

  });

  // generating a hash
  userSchema.methods.generateHash = function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // checking if password is valid
  userSchema.methods.validPassword = function(password) {
      return bcrypt.compareSync(password, this.local.password);
  };

return mongoose.model("userModel", userSchema);
}
module.exports = initUserModel;

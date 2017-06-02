module.exports = function(io, User){
	var Table = require("../models/table.js");
	require("./lobby.js")(io , User);
//	require("./table.js")(io);
};

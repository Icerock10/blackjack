module.exports = function(io){

	io.on("connection", function(socket){
		console.log("socket " + socket.id + " connected");



})
};

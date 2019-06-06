var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
 //  socket.on("greeting",data => {
	// console.log(data)
	// socket.emit("broadcast",{name:"ccc"});
 //  })
  socket.on("boy", () => {
  	socket.broadcast.emit("createPerson", "createBoy");
  })
  socket.on("girl", () => {
  	socket.broadcast.emit("createPerson", "createGirl");
  })
  socket.on("behavier", (data) => {
  	socket.broadcast.emit("receivedBehavier", data);
  })
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
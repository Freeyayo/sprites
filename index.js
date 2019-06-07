var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let online = {
	boy : false,
	girl : false
}

let boyData = {
	gender: "boy",
	i: 0,
	ll: 25,
	m: 0,
	rl: 0,
	x: 0,
	y: 0
};
let girlData = {
	gender: "girl",
	i: 0,
	ll: 25,
	m: 0,
	rl: 0,
	x: 0,
	y: 0
};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  let addedUser = false;
  console.log('a user connected');
  socket.emit("createPerson", online);

  socket.on("boy talking", data => {
  	socket.broadcast.emit("boy message",data);
  })

  socket.on("girl talking", data => {
  	socket.broadcast.emit("girl message",data);
  })

  socket.on("chosen",() => {
  	socket.emit("position", {boyData,girlData})
  })

  socket.on("boy", () => {
  	socket.gender = "boy";
  	addedUser = true;
  	online.boy = true;
  	socket.broadcast.emit("createPerson", online);
  })
  socket.on("girl", () => {
  	socket.gender = "girl";
  	addedUser = true;
  	online.girl = true;
  	socket.broadcast.emit("createPerson", online);
  })
  socket.on("behavier", (data) => {
  	if(data.gender === "boy"){
  		boyData = {...data};
  		socket.broadcast.emit("receivedBehavier", boyData);
  	}else if(data.gender === "girl"){
  		girlData = {...data};
  		socket.broadcast.emit("receivedBehavier", girlData);
  	}
  })

  socket.on("boy disconnected",(data)=>{
  	online.boy = false;
  	console.log(online,data);
  	socket.emit("createPerson", online);
  })

  socket.on("girl disconnected",()=>{
  	online.girl = false;
  	socket.emit("createPerson", online);
  })

  socket.on('disconnect', () => {
    if (addedUser) {
      online[socket.gender] = false;
    }
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
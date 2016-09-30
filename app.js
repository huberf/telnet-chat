var net = require('net');

var sockets = [];

function cleanInput(data) {
	return data.toString().replace(/(\r\n|\n|\r)/gm,"");
}

function receiveData(data, id) {
  var cleanData = cleanInput(data);
  for( var i = 0; i < sockets.length; i++) {
    if( cleanData != "@quit") {
      if( sockets[i].id != id) {
        sockets[i].socket.write(data);
      }
    } else {
			if( sockets[i].id == id) {
				console.log('Quit command sent');
				sockets[i].socket.end();
        sockets.splice(i, 1)
			}
    }
  }
}

function closeSocket(socket) {
  var i = sockets.indexOf(socket);
  if (i != -1) {
    sockets.splie(i, 1);
  }
}

var nextId = 0;
function newSocket(socket) {
  sockets.push({socket: socket, id: nextId});
  var id = nextId;
  nextId = nextId + 1;
  socket.write('Welcome to the Land of Haon!\n');
  socket.on('data', function(data) {
    receiveData(data, id);
  });
  socket.on('end', function() {
    closeSocket(socket);
  })
}

var server = net.createServer( newSocket )

server.listen(8888);

console.log('Service started on port 8888');

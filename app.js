var net = require('net');

var sockets = [];

function receiveData(data, id) {
  for( var i = 0; i < sockets.length; i++) {
    if( data != "@quit") {
      if( sockets[i].id != id) {
        sockets[i].socket.write(data);
      }
    } else {

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

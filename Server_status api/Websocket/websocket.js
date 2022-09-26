var WebSocketServer = require('websocket').server;
var http = require('http');

const server = http.createServer((req, res) => {
    console.log((new Date()) + ' Requested request for ' + req.url);
    res.writeHead(404);
    res.end();
})

server.listen(8081, () => {
    console.log((new Date()) + ' server is listening on port 8081')
})

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
  }

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
})

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
module.exports = wsServer

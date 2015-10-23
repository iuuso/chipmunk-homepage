var http = require('http');


// HTTP-server
var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');
console.log(server);



// WebSocket implementation
var WebSocketServer = require('websocket').server;
var wsServer = new WebSocketServer({
    httpServer: server
});


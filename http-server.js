// HTTP Server creation
var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    os = require('os');

// Create dynamic http-server
var server = http.createServer(function(request,response){
    console.log(new Date() + ' Received request for ' + request.url);
    var my_path = url.parse(request.url).pathname;
    var full_path = path.join(process.cwd(),my_path);

    fs.exists(full_path,function(exists){
        if(!exists){
            response.writeHeader(404, {"Content-Type": "text/plain"});  
            response.write("404 Not Found\n");  
            response.end();
        }
        else{
            fs.readFile(full_path, "binary", function(err, file) {  
                 if(err) {  
                     response.writeHeader(500, {"Content-Type": "text/plain"});  
                     response.write(err + "\n");  
                     response.end();  
               
                 }  
                 else{
                    response.writeHeader(200);  
                    response.write(file, "binary");  
                    response.end();
                }
                     
            });
        }
    });
})  

//Set server to listen port 1337
server.listen(1337, function(err) {
        console.log('Server listening port '+'1337')
});

// Implement WebSocket connection for connectivity
var WebSocketServer = require('websocket').server;

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

// function whitelistMessage(message) {
//     if (message.utf8Data == "")
// } 

function collectInfo() {
    var infoarray = {hostname: os.hostname(), uptime: os.uptime()};
    console.log(infoarray);
    return infoarray
}

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
            //connection.sendUTF(message.utf8Data);
            connection.send(JSON.stringify(collectInfo()));
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


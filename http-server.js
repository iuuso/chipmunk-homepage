// HTTP Server creation
var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

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
    autoAcceptConnections: true
});

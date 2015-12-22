chipmunk - a simple status page for server
================

### Includes a landing page that displays the hostname and uptime

![chipmunk on hab.ddns.net](https://raw.githubusercontent.com/iuuso/chipmunk-homepage/master/screenshots/screenshot-1.png "Screenshot")

Info
--------------

Chipmunk is a simple landing page for personal home servers. Node.js is used as a backend server to serve content for the landing page that displays the hostname and uptime of the server. It uses WebSockets to transfer the content to the landing page, so you may need to open additional port (port 3000) from your router to succesfully establish a working connection. 

Requirements
--------------
 - Node.js (tested on v5.3.0)
 - Node.js modules
    - [websocket](https://github.com/theturtle32/WebSocket-Node)

TODO
--------------

 - Responsive design for different display sizes.
 - FIx the server to automatically serve index.html
 - Add Content-type header to server
 - Tweet-button
 - Favicon
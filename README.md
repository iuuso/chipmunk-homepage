chipmunk - a simple status page for server
================

### Landing page with a HTTP server that displays the hostname and uptime

![chipmunk on hab.ddns.net](https://raw.githubusercontent.com/iuuso/chipmunk-homepage/master/screenshots/screenshot-1.png "Screenshot")

## Info

Chipmunk is a simple landing page for personal home servers. Node.js is used as a backend server to serve content for the landing page that displays the hostname and uptime of the server. It uses WebSockets to transfer the content to the landing page, so you may need to open additional port (port 3000) from your router to succesfully establish a working connection. 

## Requirements

 - [Node.js](https://nodejs.org/en/) (tested on v5.3.0)
 - Node.js modules
    - Core modules: http, url, path, fs, os (should come with your Node.js installation)
    - [websocket](https://github.com/theturtle32/WebSocket-Node)
 - Linux (tested and developed on Arch Linux)

## Installation

1. Install Node.js
2. Clone this repository 
> git clone https://github.com/iuuso/chipmunk-homepage.git
3. Edit the following line in file 'scripts.js' in 'assets/js/'
 > var wsSocket = new WebSocket('ws://xx.xxx.xxx.xxx:3000', 'echo-protocol');

 Replace the x's with the IP address of your server. 
 
   **Please note**: Atleast with noip there seems to be a problem when attempting to route WebSocket traffic through the service. At the moment, please use your real IP address rather than DDNS address for successfully establishing a WebSocket connection.

4. 

## TOD
O
 - Responsive design for different display sizes.
 - FIx the server to automatically serve index.html
 - Add Content-type header to server
 - Tweet-button
 - Favicon
 - Add error event when the address for the WebSocket connections isn't changed
chipmunk - a simple status page for server
================

### Landing page with a HTTP server that displays the hostname and uptime

** Please note: chipmunk is in Beta-stage at the moment and its not properly tested yet. **

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

1. Install Node.js and npm
2. Clone this repository to a location of your choice

    git clone https://github.com/iuuso/chipmunk-homepage.git

3. Edit the following line in file 'scripts.js' in 'assets/js/'
    var wsSocket = new WebSocket('ws://xx.xxx.xxx.xxx:3000', 'echo-protocol');

 Replace the x's with the IP address of your server. 
 
   **Please note**: Atleast with noip there seems to be a problem when attempting to route WebSocket traffic through the service. At the moment, please use your real IP address rather than DDNS address for successfully establishing a WebSocket connection.

4. Install the [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node.git) module

    npm install websocket

5. Open the port 3000 in your router for the WebSocket connection
6. In order for getting the Node.js-server to run in the default HTTP port 80, run the following command in your server.

    sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000

This command maps your port 80 traffic to port 3000. This might cause errors, if you have another server instances running at the same time. Make sure of the network interface you're setting up, e.g. eth0, wlan0.

7. Run

    node http-server.js

8. Point your browser to: 'http://yourserveraddress.net/'

## TODO

 - Responsive design for different display sizes.
 - FIx the server to automatically serve index.html
 - Add Content-type header to server
 - Tweet-button
 - Favicon
 - Add error event when the address for the WebSocket connections isn't changed
var uptimeSpan = document.getElementById("uptime");

window.onload = function() {
    var wsAddress = 'ws://' + window.location.hostname + ':3000';
    //var wsSocket = new WebSocket(wsAddress, 'echo-protocol');
    var wsSocket = new WebSocket('ws://localhost:3000', 'echo-protocol');
    //var wsSocket = new WebSocket('ws://localhost:3000', 'echo-protocol');

    wsSocket.onopen = function () {
        wsSocket.send("Hello!");
        console.log("Socket opened");
    }

    wsSocket.onmessage = function (e) {
        var data = JSON.parse(e.data);
        setHostname(data.hostname);
        calculateDaysFromSeconds(data.uptime);

        input_data_to_table(data);
    }

    wsSocket.onerror = function (error) {
        console.log("WebSocket error: " + error);
    }

    wsSocket.onclose = function () {
        console.log("WebSocket connection closed");
        wsSocket.close();
    }

    // Function for getting the hostname
    function setHostname(name) {
        var hostspan = document.getElementById("hostname");
        hostspan.innerHTML = name;
    }

    // Function to set uptime
    function setUptime(time) {
        var uptime = document.createTextNode(time);
        uptimeSpan.appendChild(uptime);
    }

    // Function to set the proper time format
    function setTimeFormat(info) {
        //var format = document.getElementById("timeformat");
        //format.innerHTML = info;
        var format = document.createTextNode(info);

        uptimeSpan.appendChild(format);
    }

    // Function for calculating days from seconds.
    function calculateDaysFromSeconds(seconds) {
        var minutes = parseInt(seconds / 60);
        var hours = parseInt(minutes / 60);
        var days = parseInt(hours / 24);

        if (days >= 1) { 
            setUptime(days);
            if (days == 1) {
                setTimeFormat(" day.");
            } else {
                setTimeFormat(" days.");
            }
        }

        else if (hours >= 1) { 
            setUptime(hours);
            if (hours == 1) {
                setTimeFormat(" hour.");
            } else {
                setTimeFormat(" hours.");
            }
        }

        else if (minutes >= 1) {
            setUptime(minutes);
            if (minutes == 1) {
                setTimeFormat(" minute.");
            } else {
                setTimeFormat(" minutes.");
            }
        }

        else { setUptime(seconds); }
    }

    var table = document.getElementById("tablespan");
    function input_data_to_table(data) {
        console.log(data);
        var rowCounter = 0;
        for (var i in data) {
            var row = table.insertRow(rowCounter);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell1.innerHTML = i;
            cell2.innerHTML = data[i];
            rowCounter++
        }
    }
}
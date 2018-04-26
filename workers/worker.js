let connections = 0; // count active connections
self.addEventListener("connect", function (e) {
    var port = e.ports[0];
    connections++;
    console.info(`Logger Clients : ${connections}`);
    port.addEventListener("message", function (e) {
        port.postMessage("Welcome to " + e.data +	" (On port #" + connections + ")");
    }, false);
    port.start();
}, false);

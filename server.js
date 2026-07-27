const const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

console.log("Chat server running on port", PORT);

wss.on("connection", (ws) => {

    ws.on("message", (message) => {

        let data;

        try{
            data = JSON.parse(message);
        }catch{
            return;
        }

        // Send the received message to everyone connected
        wss.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify(data));
            }
        });

    });

    ws.on("close", () => {
        console.log("A user disconnected.");
    });

}); = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", ws => {
    ws.on("message", message => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
});

console.log("Server running on port 8080");
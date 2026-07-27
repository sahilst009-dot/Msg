const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

console.log("Chat server running on port", PORT);

wss.on("connection", (ws) => {

    ws.on("message", (message) => {

        let data;

        try {
            data = JSON.parse(message);
        } catch {
            return;
        }

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });

    });

    ws.on("close", () => {
        console.log("A user disconnected.");
    });

});

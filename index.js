const express = require("express");
const http = require("http");

let app = express();
const server = http.createServer(app);

const WebSocket = require("ws");

const PORT = 8080;

const wss = new WebSocket.Server({ server });

app.use(express.static("./"));

let port = process.env.PORT || PORT;

server.listen(port, function () {
  console.log(`listening on port ${port}`);
});

console.warn("WebSocket Server Started");

wss.on("connection", function connection(ws) {
  console.warn("connection!");
  ws.on("message", function incoming(message) {
    console.warn(message);
    wss.clients.forEach((client) => {
      client.send(message);
    });
  });
});

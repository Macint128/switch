const WebSocket = require("ws");
const PORT = process.env.PORT || 10000;

const server = new WebSocket.Server({ port: PORT });

let clients = [];

server.on("connection", (ws) => {
  clients.push(ws);
  console.log("클라이언트 연결됨");

  ws.on("message", (msg) => {
    console.log("받은 메시지:", msg);
    // 모든 클라이언트에게 브로드캐스트
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
    console.log("클라이언트 연결 종료");
  });
});

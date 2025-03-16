const express = require("express");
const WebSocket = require("ws");

// 创建一个 Express HTTP 服务器
const app = express();
const httpServer = app.listen(3000, () => {
    console.log("HTTP Server is running on port 3000");
});

// 创建一个 WebSocket 服务器，并绑定到 HTTP 服务器
const wss = new WebSocket.Server({ server: httpServer });

// WebSocket 连接事件处理
wss.on("connection", (ws) => {
    console.log("New WebSocket connection");

    // 向客户端发送消息
    ws.send("Hello from WebSocket server!");

    // 监听客户端发送的消息
    ws.on("message", (message) => {
        console.log("Received: " + message);
        // 回应客户端的消息
        ws.send("Received: " + message);
    });
});

// 设置 HTTP 路由
app.get("/", (req, res) => {
    res.send("Hello, this is a basic HTTP and WebSocket server!");
});

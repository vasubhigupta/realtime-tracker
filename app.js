const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app)
const io = socketio(server);
const path = require("path");


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));

io.on("connection", (socket) => {
    console.log("connection");
    socket.on("send-location",function(data){
        io.emit("receive-location", {id: socket.id, ...data});
    })
    console.log("Connected")
    socket.on("disconnect", () => {
        io.emit("user-disconnect", socket.id)
    })
});

app.get("/",function(req,res){
    res.render("index");
});

server.listen(3000);

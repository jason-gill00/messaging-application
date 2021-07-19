const express = require("express")
const http = require("http")
const app = express();
const server = http.createServer(app)
const socket = require("socket.io")
const io = socket(server)


let users = [];

const messages = {
  general: [],
  soccer: [],
  basketball: [],
  formula1: []
}


io.on('connection', socket => {
    console.log("CONNECTED")
    socket.on("join server", (username) => {
        const user = {
            username,
            id: socket.id
        }
        users.push(user)
        console.log(users)
        io.emit("new user", users)
    })

    socket.on("join room", (roomName, cb) => {
        socket.join(roomName)
        console.log("Joined room" + roomName)
        cb(messages[roomName])
    })
    // socket.on("join room", (roomName) => {
    //     socket.join(roomName)
    //     console.log("Joined room" + roomName)
    //     // cb(messages[roomName])
    // })

    socket.on("send message", ({content, to, sender}) => {
        console.log("MESSAGE -> "+ to + ": " +  content)
        const payload = {
            content, 
            chatName:to,
            sender
        }
        console.log(payload)
        socket.to(to).emit("new message", payload)
        if (messages[to]){
            messages[to].push({sender, content})
        }
        console.log(messages)
    })
})



server.listen(1337, () => console.log("server is running on 1337"))
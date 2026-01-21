import { WebSocketServer } from "ws";
const wss = new WebSocketServer({port: 8080})

wss.on("connection",(socket)=>{
    socket.send("AAAAAA");
    socket.on("Message",(msg)=>{
        console.log(`A kliens üzenete: ${msg.toString()}`)
        socket.send(`Megjött az üzenet: ${msg.toString()}`)
    })
})


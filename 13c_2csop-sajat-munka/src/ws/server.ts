import { WebSocketServer } from "ws";
import { verifySocketToken } from "../middleware/auth";

const wss = new WebSocketServer({ port: 8080 });
const clients = new Set();

wss.on("connection", (socket, req: any) => {
  console.log(req);
  const isValid = verifySocketToken(socket, req);
  if (!isValid) {
    return;
  }

  if (isValid) {
    clients.add(socket);
    socket.send("Csatlakoztál!");
  }

  socket.on("message", (msg) => {
    handleMessage(socket, msg.toString());
  });
  socket.on("close", () => {
    clients.delete(socket);
  });

  function handleMessage(socket: any, rawMessage: string) {
    let data;

    try {
      data = JSON.parse(rawMessage);
    } catch {
      socket.send("Rossz az üzenet formátuma");
    }

    if (!data.message || data.message.trim() === "") {
      socket.send("Üres az üzenet mező");
      return;
    }

    const fromUserEmail = socket.user.email;

    if (data.type === "broadcast") {
      broadcast(`${fromUserEmail}: ${data.message}`);
    }
    if (data.type === "private") {
      sendPrivate(fromUserEmail, data.toEmail, data.message);
    }
  }
  const broadcast = (message: any) => {
    clients.forEach((client: any) => {
      client.send(message);
    });
  };

  const sendPrivate = (fromEmail: string, toEmail: string, message: string) => {
    let sender: any = null;
    let found = false;

    clients.forEach((client: any) => {
     if (client.user.email === fromEmail){
    sender = client;
} 
if (client.user.email === toEmail) {
    client.send(`${fromEmail}: ${message}`);
    found = true;
}   
    });

    if (!found && sender) {
      sender.send("A címzett nem található");
    }
  };
});

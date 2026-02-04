import { WebSocketServer, WebSocket } from "ws";
import { verifySocketToken } from "../middleware/auth";
import mysql from "mysql2/promise";
import config from "../config/config";

interface AuthenticatedWebSocket extends WebSocket {
  user: {
    userId: number;
    email: string;
    avatar?: string | null;
  };
  roomId: number;
}

const wss = new WebSocketServer({ port: 8080 });
const clients = new Set<AuthenticatedWebSocket>();


const broadcastToRoom = (roomId: number, message: string) => {
  for (const client of clients) {
    if (client.roomId === roomId) {
      client.send(message);
    }
  }
};

const sendPrivate = (fromEmail: string, toEmail: string, message: string) => {
  let sender: AuthenticatedWebSocket | null = null;
  let found = false;

  for (const client of clients) {
    if (client.user.email === fromEmail) sender = client;
    if (client.user.email === toEmail) {
      const payload = JSON.stringify({
        type: "private",
        email: fromEmail,
        avatar: sender?.user.avatar ?? null,
        message: message,
      });
      client.send(payload);
      found = true;
    }
  }

  if (!found && sender) {
    const payload = JSON.stringify({
      type: "system",
      email: "Rendszer",
      message: "A címzett nem található",
      avatar: null,
    });
    sender.send(payload);
  }
};

async function saveMessage(senderId: number,receiverId: number | null,content: string,isPrivate: boolean,roomId: number) {
  const connection = await mysql.createConnection(config.database);

  await connection.query(
    `INSERT INTO messages (senderId, receiverId, content, isPrivate, roomId) 
    VALUES (?, ?, ?, ?, ?)`,[senderId, receiverId, content, isPrivate, roomId]
  );

  await connection.end();
}

wss.on("connection",async  (socket: AuthenticatedWebSocket, req: any) => {
  const isValid = verifySocketToken(socket, req);
  if (!isValid) return;

   const connection = await mysql.createConnection(config.database);
  const [rows]: any = await connection.query(
    "SELECT avatar FROM users WHERE userId = ?",
    [socket.user.userId]
  );
  await connection.end();

  socket.user.avatar = rows[0]?.avatar ?? null;

  clients.add(socket);

  socket.on("message", async (msg) => {
    let data;
    try {
      data = JSON.parse(msg.toString());
    } catch {
      socket.send("Rossz az üzenet formátuma");
      return;
    }

    if (!data.message || data.message.trim() === "") {
      socket.send("Üres az üzenet mező");
      return;
    }

    const fromUserEmail = socket.user.email;

    if (data.type === "broadcast") {
  const payload = JSON.stringify({
    type: "broadcast",
    email: socket.user.email,
    avatar: socket.user.avatar,
    message: data.message
  });

  broadcastToRoom(socket.roomId, payload);

  await saveMessage(
    socket.user.userId,
    null,
    data.message,
    false,
    socket.roomId
  );
}

    if (data.type === "private") {
      const toEmail = data.toEmail.trim().toLowerCase();
      const receiverSocket = Array.from(clients).find((c: AuthenticatedWebSocket) => c.user.email === toEmail) as AuthenticatedWebSocket | undefined;

      sendPrivate(fromUserEmail, toEmail, data.message);

      const receiverId = receiverSocket ? receiverSocket.user.userId : null;
      await saveMessage(socket.user.userId,receiverId,data.message,true,socket.roomId);
    }
  });

  socket.on("close", () => {
    clients.delete(socket);
  });

  socket.on("error", () => {
    clients.delete(socket);
  });
});

console.log("WebSocket server fut a 8080 porton...");
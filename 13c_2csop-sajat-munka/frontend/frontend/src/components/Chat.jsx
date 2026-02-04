import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [currentRoomId, setCurrentRoomId] = useState(null);

  const messageInput = useRef("");
  const fileInput = useRef(null);
  const roomIdInput = useRef("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Hibás vagy nem létező token");
      navigate("/login");
    }
  }, [token, navigate]);

  async function getAvatar(id) {
    if (!id) return null;
    try {
      const res = await fetch(`http://localhost:3000/file/${id}`, {
        headers: { "x-access-token": token },
      });
      if (!res.ok) return null;
      const blob = await res.blob();
      return URL.createObjectURL(blob);
    } catch {
      return null;
    }
  }

  async function addMessage(email, message, avatarId, isFile = false, fileId = null) {
    const avatarUrl = avatarId ? await getAvatar(avatarId) : null;

    const newMessage = {
      email,
      message,
      avatarUrl,
      isFile,
      fileId,
      id: Date.now() + Math.random(),
    };

    setMessages((prev) => [...prev, newMessage]);
  }

  async function loadMessages(roomId) {
    try {
      const res = await fetch(`http://localhost:3000/messages?roomId=${roomId}`, {
        headers: { "x-access-token": token },
      });

      if (!res.ok) {
        const errorData = await res.json();
        addMessage("Rendszer", errorData.error || "Ismeretlen hiba", null);
        return;
      }

      const messagesData = await res.json();
      setMessages([]);

      for (const m of messagesData) {
        await addMessage(m.senderEmail, m.content, m.avatar);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function enterRoom() {
    const roomId = roomIdInput.current.value;
    if (!roomId) {
      alert("Add meg a szoba ID-t!");
      return;
    }
    startSocket(roomId);
  }

  function startSocket(roomId) {
    if (socket) socket.close();

    const newSocket = new WebSocket(
      `ws://localhost:8080?token=${token}&roomId=${roomId}`
    );

    newSocket.onopen = () => {
      addMessage("Rendszer", `Beléptél a(z) ${roomId} szobába`);
      loadMessages(roomId);
      setCurrentRoomId(roomId);
    };

    newSocket.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        await addMessage(data.email, data.message, data.avatar, data.isFile, data.fileId);
      } catch {
        await addMessage("Rendszer", event.data, null);
      }
    };

    newSocket.onerror = () => addMessage("Rendszer", "Szerver hiba", null);
    newSocket.onclose = () => addMessage("Rendszer", "A kapcsolat megszakadt", null);

    setSocket(newSocket);
  }

  async function sendBroadCast() {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    const message = messageInput.current.value.trim();
    const file = fileInput.current?.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("http://localhost:3000/file/upload", {
          method: "POST",
          headers: { "x-access-token": token },
          body: formData,
        });
        const data = await res.json();

        socket.send(
          JSON.stringify({
            type: "broadcast",
            message: file.name,
            isFile: true,
            fileId: data.fileId,
          })
        );

       
      } catch (err) {
        console.error(err);
      } finally {
        fileInput.current.value = "";
        messageInput.current.value = "";
      }
      return;
    }

    if (!message) return;

    socket.send(
      JSON.stringify({
        type: "broadcast",
        message: message,
        isFile: false,
      })
    );
   
    messageInput.current.value = "";
  }

  async function sendPrivateMessage() {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    const toEmail = prompt("Adja meg a címzett email-jét:");
    if (!toEmail) return;

    const message = messageInput.current.value.trim();
    const file = fileInput.current?.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("http://localhost:3000/file/upload", {
          method: "POST",
          headers: { "x-access-token": token },
          body: formData,
        });
        const data = await res.json();

        socket.send(
          JSON.stringify({
            type: "private",
            toEmail: toEmail.trim().toLowerCase(),
            message: file.name,
            isFile: true,
            fileId: data.fileId,
          })
        );

        
      } catch (err) {
        console.error(err);
      } finally {
        fileInput.current.value = "";
        messageInput.current.value = "";
      }
      return;
    }

    if (!message) return;

    socket.send(
      JSON.stringify({
        type: "private",
        toEmail: toEmail.trim().toLowerCase(),
        message: message,
        isFile: false,
      })
    );
    messageInput.current.value = "";
  }

  return (
    <div className="login-body">
      <h1>Üzenetek</h1>

      <ul id="messages">
        {messages.map((msg) => (
          <li key={msg.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {msg.avatarUrl && (
              <img
                src={msg.avatarUrl}
                alt="avatar"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
            <span>{msg.email}: </span>
            {msg.isFile && msg.fileId ? (
              <a
                href={`http://localhost:3000/file/${msg.fileId}`}
                target="_blank"
                rel="noopener noreferrer"
                download={msg.message}
              >
                {msg.message.replace(/"/g, "")}
              </a>
            ) : (
              <span>{msg.message}</span>
            )}
          </li>
        ))}
      </ul>

      <input ref={messageInput} type="text" name="uzenet" id="uzenet" />
      <br />
      <br />

      <div>
        <button id="public-btn" onClick={sendBroadCast}>
          Publikus üzenet
        </button>
        <button id="private-btn" onClick={sendPrivateMessage}>
          Privát üzenet
        </button>
        <input ref={fileInput} type="file" id="fileInput" />
      </div>

      <div id="room-panel">
        <h3>Chat szoba</h3>
        <input
          ref={roomIdInput}
          type="number"
          id="roomIdInput"
          placeholder="Szoba ID"
        />
        <br />
        <br />
        <button id="chatroom-btn" onClick={enterRoom}>
          Belépés a szobába
        </button>
      </div>
    </div>
  );
}

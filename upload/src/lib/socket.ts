import { Server as HTTPServer } from "node:http";
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | null = null;

export const initializeSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`😊 Novo cliente conectado: ${socket.id}`);

    socket.on("message", (data) => {
      console.log("📩 Mensagem recebida:", data);
      socket.emit("message", "Mensagem recebida no servidor!");
    });

    socket.on("disconnect", () => {
      console.log(`🙁 Cliente desconectado: ${socket.id}`);
    });
  });
};

export const getSocketInstance = () => {
  if (!io) {
    throw new Error("Socket.IO is not initialized");
  }
  return io;
};

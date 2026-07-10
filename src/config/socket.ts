import { Server as HttpServer } from "http";
import { Server } from "socket.io";


let io: Server;

export const initSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_URL, credentials: true },
  });

  io.on("connection", (socket) => {
    console.log("Client Connected", socket.id);

    socket.on("joinTable", (tableId: string) => {
      socket.join(`table-${tableId}`);
    });

    socket.on("joinStaffDashboard", () => {
      socket.join("staff-dashboard");
    });

    socket.on("disconnect", () => {
      console.log("Client Disconnected", socket.id);
    });
  });

  return io
};


export const getIO = () => {
    if(!io) {
        throw new Error('Socket.io belum di inisialisasi')
    }

    return io
}
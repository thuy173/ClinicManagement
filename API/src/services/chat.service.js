import { ChatModel } from "~/models/chat.model";

class SocketService {
  constructor(io) {
    this.io = io;
    this.connectedUsers = new Map();
  }

  initialize() {
    this.io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      // Xử lý event user join room
      socket.on("join_room", (data) => {
        const { userId, room, targetUserId } = data;
        const roomId = targetUserId
          ? [userId, targetUserId].sort().join("_")
          : room;

        socket.join(roomId);

        this.connectedUsers.set(socket.id, { userId, room: roomId });

        this.io.to(room).emit("user_joined", {
          userId,
          message: `User ${userId} joined ${room}`,
        });
      });

      // Xử lý messages
      socket.on("send_message", async (data) => {
        const { content, room, target } = data;
        const user = this.connectedUsers.get(socket.id);

        if (user) {
          const messageData = {
            sender: user.userId,
            content,
            timestamp: new Date(),
            room,
            target: target || null,
          };
          await ChatModel.createMessage(messageData);
          this.io.to(room).emit("new_message", messageData);
        }
      });

      // Xử lý disconnect
      socket.on("disconnect", () => {
        const user = this.connectedUsers.get(socket.id);
        if (user) {
          this.io.to(user.room).emit("user_left", {
            userId: user.userId,
            message: `User ${user.userId} left ${user.room}`,
          });
          this.connectedUsers.delete(socket.id);
        }
      });
    });
  }
}

export default SocketService;

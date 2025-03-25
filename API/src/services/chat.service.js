class SocketService {
    constructor(io) {
        this.io = io;
        this.connectedUsers = new Map();
    }

    initialize() {
        this.io.on('connection', (socket) => {
            console.log('New client connected:', socket.id);

            // Xử lý user join room
            socket.on('join_room', (data) => {
                const { userId, room } = data;
                socket.join(room);
                this.connectedUsers.set(socket.id, { userId, room });
                
                this.io.to(room).emit('user_joined', {
                    userId,
                    message: `User ${userId} joined ${room}`
                });
            });

            // Xử lý messages
            socket.on('send_message', (data) => {
                const { content, room } = data;
                const user = this.connectedUsers.get(socket.id);
                
                if (user) {
                    this.io.to(room).emit('new_message', {
                        sender: user.userId,
                        content,
                        timestamp: new Date(),
                        room
                    });
                }
            });

            // Xử lý disconnect
            socket.on('disconnect', () => {
                const user = this.connectedUsers.get(socket.id);
                if (user) {
                    this.io.to(user.room).emit('user_left', {
                        userId: user.userId,
                        message: `User ${user.userId} left ${user.room}`
                    });
                    this.connectedUsers.delete(socket.id);
                }
            });
        });
    }
}

export default SocketService;
import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";

// Define the collection name
const CHAT_MESSAGE_COLLECTION_NAME = "chat_messages";

// Define the schema for chat messages
const CHAT_MESSAGE_COLLECTION_SCHEMA = Joi.object({
  sender: Joi.string().required(),
  content: Joi.string().required(),
  room: Joi.string().required(),
  timestamp: Joi.date().default(Date.now),
});

// Fields that cannot be updated
const INVALID_UPDATE_FIELDS = ["_id", "timestamp"];

// Socket service class
class SocketService {
  constructor(io) {
    this.io = io;
    this.connectedUsers = new Map();
  }

  initialize() {
    this.io.on("connection", (socket) => {
      // eslint-disable-next-line no-undef
      console.log("New client connected:", socket.id);

      socket.on("join_room", (data) => {
        const { userId, room } = data;
        socket.join(room);
        this.connectedUsers.set(socket.id, { userId, room });

        this.io.to(room).emit("user_joined", {
          userId,
          message: `User ${userId} joined ${room}`,
        });
      });

      socket.on("send_message", async (data) => {
        const { content, room } = data;
        const user = this.connectedUsers.get(socket.id);

        if (user) {
          const messageData = {
            sender: user.userId,
            content,
            room,
            timestamp: new Date(),
          };

          // Save message to database
          await ChatModel.createMessage(messageData);

          // Emit to all users in the room
          this.io.to(room).emit("new_message", messageData);
        }
      });

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

// Validation function
const validateBeforeCreate = async (data) => {
  return await CHAT_MESSAGE_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// Create a new message
const createMessage = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    const result = await GET_DB()
      .collection(CHAT_MESSAGE_COLLECTION_NAME)
      .insertOne(validData);

    return result.insertedId;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all messages for a specific room
const getMessagesByRoom = async (room) => {
  try {
    const results = await GET_DB()
      .collection(CHAT_MESSAGE_COLLECTION_NAME)
      .find({ room })
      .sort({ timestamp: 1 })
      .toArray();

    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get message by ID
const findOneById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(CHAT_MESSAGE_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update message by ID
const updateById = async (id, data) => {
  try {
    // Filter out invalid update fields
    Object.keys(data).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete data[fieldName];
      }
    });

    const validData = await validateBeforeCreate(data);

    const result = await GET_DB()
      .collection(CHAT_MESSAGE_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: validData },
        { returnDocument: "after" }
      );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete message by ID
const deleteById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(CHAT_MESSAGE_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get recent messages from a room with pagination
const getRecentMessages = async (room, page = 1, limit = 50) => {
  try {
    const skip = (page - 1) * limit;
    const results = await GET_DB()
      .collection(CHAT_MESSAGE_COLLECTION_NAME)
      .find({ room })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const ChatModel = {
  SocketService,
  createMessage,
  getMessagesByRoom,
  findOneById,
  updateById,
  deleteById,
  getRecentMessages,
};
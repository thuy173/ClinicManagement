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
  target: Joi.string().allow(null).optional(),
  timestamp: Joi.date().default(Date.now),
});

// Fields that cannot be updated
const INVALID_UPDATE_FIELDS = ["_id", "timestamp"];

// Validation function
const validateBeforeCreate = async (data) => {
  return await CHAT_MESSAGE_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// để lọc tin nhắn giữa 2 user
const getPrivateMessages = async (userId1, userId2) => {
  const roomId = [userId1, userId2].sort().join('_');
  return await GET_DB()
    .collection(CHAT_MESSAGE_COLLECTION_NAME)
    .find({ room: roomId })
    .sort({ timestamp: 1 })
    .toArray();
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
  createMessage,
  getMessagesByRoom,
  getPrivateMessages,
  findOneById,
  updateById,
  deleteById,
  getRecentMessages,
};
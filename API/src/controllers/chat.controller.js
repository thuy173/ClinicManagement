import { StatusCodes } from "http-status-codes";
import Message from "~/models/chat.model";

const getMessages = async (req, res, next) => {
  try {
    const { room } = req.params;
    const messages = await Message.find({ room })
      .sort({ timestamp: -1 })
      .limit(50);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

const saveMessage = async (req, res, next) => {
  try {
    const { sender, content, room } = req.body;
    const message = new Message({ sender, content, room });
    await message.save();
    res.status(StatusCodes.OK).json(message);
  } catch (error) {
    next(error);
  }
};

export const ChatController = {
  getMessages,
  saveMessage,
};

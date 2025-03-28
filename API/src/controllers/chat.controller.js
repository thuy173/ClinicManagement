import { ChatModel } from "~/models/chat.model";

const getMessages = async (req, res, next) => {
  try {
    const { room } = req.params;
    const messages = await ChatModel.getMessagesByRoom(room);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};


export const ChatController = {
  getMessages,
};

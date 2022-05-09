
import Message from '../models/messagesModel.js';

export const createMessage = async (messages) => {
    console.log("New mess :", message);
    const { room_id, message, sender } = messages;
    if (!room_id || !message || !sender) {
        return null;
    } else {
        const new_message = new Message(message);
        await new_message.save();
        return new_message;
    }
};
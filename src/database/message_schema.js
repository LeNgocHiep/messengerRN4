import { realm } from "./database_manager";
import { CONVERSATION } from "./conversation_schema";

export const MESSAGE = "MESSAGE";

export const MessageSchema = {
  name: MESSAGE,
  primaryKey: "messageId",
  properties: {
    messageId: "string",
    conversation: {
      type: "linkingObjects",
      objectType: CONVERSATION,
      property: "messages",
    },
    content: "string?",
    type: "string",
    image: "string?",
    sentAt: "date",
    readAt: "date?",
  },
};

export const getMessageById = (messageId) =>realm =>
  realm.objectForPrimaryKey(MESSAGE, messageId);

export const insertMessage = (message) => {
  return realm => realm.write(() => realm.create(MESSAGE, message));
};

export const updateMessage = (messageId, newMessage) => {
  const message = getMessageById(messageId);
  return realm => realm.write(() => {
    if (newMessage.content != null) message.content = newMessage.content;
    if (newMessage.type != null) message.type = newMessage.type;
    if (newMessage.image != null) message.image = newMessage.image;
    if (newMessage.sentAt != null) message.sentAt = newMessage.sentAt;
    if (newMessage.readAt != null) message.readAt = newMessage.readAt;
  });
};

export const deleteMessage = (messageId) => {
  const message = getMessageById(messageId);
  return realm => realm.write(() => {
    realm.delete(message);
    message = null;
  });
};

export const getAllMessage = () => realm => realm.objects(MESSAGE);

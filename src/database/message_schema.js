import { getRealm } from "./database_manager";
import { CONVERSATION } from "./conversation_schema";

export const MESSAGE = "MESSAGE";

export class Message {
  constructor({ messageId, conversation, content, type, image, senderId }) {
    this.messageId = messageId;
    this.conversation = conversation;
    this.content = content;
    this.type = type;
    this.image = image;
    this.sendAt = new Date();
    this.senderId = senderId;
  }

  static schema = {
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
      senderId: "string",
    },
  };
}

export const updateReadAt = async (messageId, dateTime) => {
  const realm = await getRealm();
  const message = realm.objectForPrimaryKey(MESSAGE, messageId);
  return realm.write(() => {
    message.readAt = dateTime;
  });
};

export const getMessageById = async (messageId) => {
  const realm = await getRealm();
  return realm.objectForPrimaryKey(MESSAGE, messageId);
};

export const insertMessage = async (message) => {
  const realm = await getRealm();
  return realm.write(() => realm.create(MESSAGE, message));
};

export const updateMessage = async (messageId, newMessage) => {
  const realm = await getRealm();
  const message = realm.objectForPrimaryKey(MESSAGE, messageId);
  return realm.write(() => {
    if (newMessage.content != null) message.content = newMessage.content;
    if (newMessage.type != null) message.type = newMessage.type;
    if (newMessage.image != null) message.image = newMessage.image;
    if (newMessage.sentAt != null) message.sentAt = newMessage.sentAt;
    if (newMessage.readAt != null) message.readAt = newMessage.readAt;
  });
};

export const deleteMessage = async (messageId) => {
  const realm = await getRealm();
  const message = realm.objectForPrimaryKey(MESSAGE, messageId);
  return realm.write(() => {
    realm.delete(message);
    message = null;
  });
};

export const getAllMessage = async () => {
  const realm = await getRealm();
  return realm.objects(MESSAGE);
};

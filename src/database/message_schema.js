import { getRealm } from "./database_manager";
import { CONVERSATION } from "./conversation_schema";

export const MESSAGE = "MESSAGE";

export class Message {
  constructor({
    messageId,
    conversation,
    content,
    type,
    image,
    senderId,
    sendAt,
  }) {
    this.messageId = messageId;
    this.conversation = conversation;
    this.content = content;
    this.type = type;
    this.image = image;
    this.sendAt = sendAt;
    this.senderId = senderId;
  }

  static schema = {
    name: MESSAGE,
    primaryKey: "messageId",
    properties: {
      messageId: "string",
      conversation: {
        type: "linkingObjects",
        objectType: "CONVERSATION",
        property: "messages",
      },
      content: "string?",
      type: "string",
      image: "string?",
      sentAt: "int",
      readAt: "int?",
      senderId: "string",
    },
  };
}

export const updateReadAtDB = async (messageId, dateTime) => {
  let realm = await getRealm();
  let message = realm.objectForPrimaryKey(MESSAGE, messageId);
  let result = realm.write(() => {
    message.readAt = dateTime;
  });
  return result;
};

export const getMessageByIdDB = async (messageId) => {
  let realm = await getRealm();
  let result = realm.objectForPrimaryKey(MESSAGE, messageId);
  return result;
};

export const insertMessageDB = async (message, conversationId) => {
  let realm = await getRealm();
  let conversation = realm.objectForPrimaryKey(
    CONVERSATION,
    conversationId
  );
  return realm.write(() => {
    let messageResult = realm.create(MESSAGE, message);
    conversation.messages.push(messageResult);
    return messageResult;
  });
};

export const updateMessageDB = async (messageId, newMessage) => {
  let realm = await getRealm();
  let message = realm.objectForPrimaryKey(MESSAGE, messageId);
  return realm.write(() => {
    if (newMessage.content != null) message.content = newMessage.content;
    if (newMessage.type != null) message.type = newMessage.type;
    if (newMessage.image != null) message.image = newMessage.image;
    if (newMessage.sentAt != null) message.sentAt = newMessage.sentAt;
    if (newMessage.readAt != null) message.readAt = newMessage.readAt;
  });
};

export const deleteMessageDB = async (messageId) => {
  let realm = await getRealm();
  let message = realm.objectForPrimaryKey(MESSAGE, messageId);
  return realm.write(() => {
    realm.delete(message);
    message = null;
  });
};

export const getAllMessageDB = async () => {
  let realm = await getRealm();
  return realm.objects(MESSAGE);
};

export const deleteMultiMessageDB = async (messagesDB) => {
  let realm = await getRealm();
  return realm.write(() => {
    realm.delete(messagesDB);
  });
};

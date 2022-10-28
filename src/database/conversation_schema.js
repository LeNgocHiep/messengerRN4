import { getRealm } from "./database_manager";
import { MESSAGE, MessageSchema } from "./message_schema";
import { USER } from "./user_schema";

export const CONVERSATION = "CONVERSATION";

export class Conversation {
  constructor({ conversationId, name, avatar, users }) {
    //   this.userId = userId;
    //   this.name = name;
    //   this.email = email;
    //   this.avatar = avatar;
    //   this.createAt = new Date();
    this.conversationId = conversationId;
    this.name = name;
    this.avatar = avatar;
    this.users = users;
    this.createAt = new Date();
  }

  static schema = {
    name: CONVERSATION,
    primaryKey: "conversationId",
    properties: {
      conversationId: "string",
      name: "string",
      avatar: "string",
      createAt: "date",
      messages: `${MESSAGE}[]`,
      users: `${USER}[]`,
    },
  };
}

export const getConversationById = async (conversationId) => {
  const realm = await getRealm();
  return realm.objectForPrimaryKey(CONVERSATION, conversationId);
};

export const insertConversation = async (conversation) => {
  const realm = await getRealm();
  return realm.write(() => realm.create(CONVERSATION, conversation));
};

export const updateConversation = async (conversationId, newConversation) => {
  const realm = await getRealm();
  const conversation = realm.objectForPrimaryKey(CONVERSATION, conversationId);
  return realm.write(() => {
    if (newConversation.name != null) conversation.name = newConversation.name;
    if (newConversation.avatar != null)
      conversation.avatar = newConversation.avatar;
    if (newConversation.createAt != null)
      conversation.createAt = newConversation.createAt;
    if (newConversation.users != null)
      conversation.users = newConversation.users;
  });
};

export const deleteConversation = async (conversationId) => {
  const realm = await getRealm();
  const conversation = realm.objectForPrimaryKey(CONVERSATION, conversationId);
  return realm.write(() => {
    realm.delete(conversation);
    conversation = null;
  });
};

export const getAllConversation = async () => {
  const realm = await getRealm();
  return realm.objects(CONVERSATION);
};

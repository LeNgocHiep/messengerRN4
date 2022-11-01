import { getRealm } from "./database_manager";
import { MESSAGE, MessageSchema } from "./message_schema";
import { USER } from "./user_schema";

export const CONVERSATION = "CONVERSATION";

export class Conversation {
  constructor({ conversationId, name, avatar, users, createAt }) {
    //   this.userId = userId;
    //   this.name = name;
    //   this.email = email;
    //   this.avatar = avatar;
    //   this.createAt = new Date();
    this.conversationId = conversationId;
    this.name = name;
    this.avatar = avatar;
    this.users = users;
    this.createAt = createAt;
  }

  static schema = {
    name: CONVERSATION,
    primaryKey: "conversationId",
    properties: {
      conversationId: "string",
      name: "string",
      avatar: "string",
      createAt: "int",
      messages: `${MESSAGE}[]`,
      users: `${USER}[]`,
    },
  };
}

export const getConversationByIdDB = async (conversationId) => {
  const realm = await getRealm();
  return realm.objectForPrimaryKey(CONVERSATION, conversationId);
};

export const getConversationByUserIdDB = async (userId) => {
  try {
    const realm = await getRealm();
    const conversations = realm.objects(CONVERSATION);
    // projects.filtered("ANY tasks.priority == 10").length
    const con = conversations[0];
    const con1 = conversations[1];
    const conversation = conversations.filtered(
      `ANY users.userId == '${userId}'`
    );
    return conversation;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const insertConversationDB = async (conversation) => {
  const realm = await getRealm();
  return realm.write(() => realm.create(CONVERSATION, conversation));
};

export const updateConversationDB = async (conversationId, newConversation) => {
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

export const deleteConversationDB = async (conversationId) => {
  const realm = await getRealm();
  const conversation = realm.objectForPrimaryKey(CONVERSATION, conversationId);
  return realm.write(() => {
    realm.delete(conversation);
    conversation = null;
  });
};

export const getAllConversationDB = async () => {
  const realm = await getRealm();
  return realm.objects(CONVERSATION);
};

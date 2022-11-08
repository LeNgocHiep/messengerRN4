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
  try {
    let realm = await getRealm();
    let result = realm.objectForPrimaryKey(CONVERSATION, conversationId);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getConversationByUserIdDB = async (userId) => {
  try {
    let realm = await getRealm();
    let conversations = realm.objects(CONVERSATION);
    // let conversation = conversations.filtered(
    //   `ALL users.userId == '${userId}'`
    // );
    let conversationsResult = [];
    conversations.forEach((conversation) => {
      conversation.users.forEach((user) => {
        if (user.userId == userId && conversation.users.length == 2) {
          conversationsResult.push(conversation);
        }
      });
    });
    return conversationsResult;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const insertConversationDB = async (conversation) => {
  let realm = await getRealm();
  let result = realm.write(() => realm.create(CONVERSATION, conversation));
  return result;
};

export const updateConversationDB = async (conversationId, newConversation) => {
  let realm = await getRealm();
  let conversation = realm.objectForPrimaryKey(CONVERSATION, conversationId);
  let result = realm.write(() => {
    if (newConversation.name != null) conversation.name = newConversation.name;
    if (newConversation.avatar != null)
      conversation.avatar = newConversation.avatar;
    if (newConversation.createAt != null)
      conversation.createAt = newConversation.createAt;
    if (newConversation.users != null)
      conversation.users = newConversation.users;
  });
  return result;
};

export const deleteConversationDB = async (conversationId) => {
  try {
    let realm = await getRealm();
    let conversation = realm.objectForPrimaryKey(CONVERSATION, conversationId);
    return realm.write(() => {
      realm.delete(conversation);
      conversation = null;
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllConversationDB = async () => {
  let realm = await getRealm();
  realm.write(() => {
    realm.delete(realm.objects(CONVERSATION));
  });
};

export const getAllConversationDB = async () => {
  let realm = await getRealm();
  let result = realm.objects(CONVERSATION);
  return result;
};

export const getAllConversationHaveMessageDB = async () => {
  let realm = await getRealm();
  let conversations = realm.objects(CONVERSATION);
  // let conversationsHaveMessage = conversations.filtered(
  //   "ALL messages.messageId != ''"
  // );

  let conversationHaveMessage = [];
  conversations.forEach((conversation) => {
    if (conversation.messages.length > 0) {
      conversationHaveMessage.push(conversation);
    }
  });
  return conversationHaveMessage;
};

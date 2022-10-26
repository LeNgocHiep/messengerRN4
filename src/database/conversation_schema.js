import { realm } from "./database_manager";
import { MESSAGE, MessageSchema } from "./message_schema";
import { USER } from "./user_schema";

export const CONVERSATION = "CONVERSATION";

export const ConversationSchema = {
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

export const getConversationById = (conversationId) => {
  return realm.objectForPrimaryKey(CONVERSATION, conversationId);
};

export const insertConversation = (conversation) => {
  return realm.write(() => realm.create(CONVERSATION, conversation));
};

export const updateConversation = (conversationId, newConversation) => {
  const conversation = getConversationById(conversationId);
  return realm.write(() => {
    if (newConversation.name != null) conversation.name = newConversation.name;
    if (newConversation.avatar != null)
      conversation.avatar = newConversation.avatar;
    if (newConversation.createAt != null)
      conversation.createAt = newConversation.createAt;
    if (newConversation.users != null && newConversation.users.length > 0)
      conversation.users = newConversation.users;
  });
};

export const deleteConversation = (conversationId) => {
  const conversation = getConversationById(conversationId);
  realm.write(() => {
    realm.delete(conversation);
    conversation = null;
  });
};

export const getAllConversation = () => realm.objects(CONVERSATION);
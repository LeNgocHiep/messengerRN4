import Realm from "realm";
import {
  getAllUserDB,
  getUserByIdDB,
  insertUserIfNeededDB,
  User,
} from "../database/user_schema";
import EncryptedStorage from "react-native-encrypted-storage";
import { getUserFB } from "../firebase/firebase_user";
import "react-native-get-random-values";
import { v1 as uuidv1 } from "uuid";
import {
  insertConversationDB,
  getConversationByIdDB,
  Conversation,
  getConversationByUserIdDB,
  getAllConversationHaveMessageDB,
} from "./conversation_schema";
import {
  deleteMultiMessageDB,
  getAllMessageDB,
  insertMessageDB,
  Message,
} from "./message_schema";

const databaseConfig = {
  path: "database.realm",
  schema: [User.schema, Conversation.schema, Message.schema],
};

export const getRealm = async () => {
  return await Realm.open(databaseConfig);
};

//user start
export const getListUser = async () => {
  const users = await getAllUserDB();
  return users;
};

export const getMainUser = async () => {
  const userId = await EncryptedStorage.getItem("UID");
  const user = await getUserByIdDB(userId);
  return user;
};

export const getUserByIdApi = async (userId) => {
  let user = await getUserByIdDB(userId);
  if (user === undefined) {
    user = await getUserFB(userId);
    user = await insertUserIfNeededDB(user);
  }
  return user;
};
//user end
//message
export const createMessage = async (content, conversationId) => {
  // let conversation = await getConversationById(conversationId);
  let mainUser = await getMainUser();
  let messageId = uuidv1();
  let createAt = new Date().getTime();
  let message = {
    messageId: messageId,
    // conversation: conversation,
    content: content,
    type: "text",
    image: "",
    senderId: mainUser.userId,
    sentAt: createAt,
  };

  return await insertMessageDB(message, conversationId);
};

export const getAllMessageByConversationId = async (conversationId) => {
  let conversation = await getConversationById(conversationId);
  // let all = await getAllMessageDB();
  return conversation.messages;
  // return all;
};
//message

//conversation start
export const createConversation = async (userId) => {
  let user = await getUserByIdApi(userId);
  let mainUser = await getMainUser();
  let name = `${user.name}, ${mainUser.name}`;
  let conversationId = uuidv1();
  let createAt = new Date().getTime();
  let conversation = {
    conversationId: conversationId,
    name: name,
    avatar: user.avatar,
    users: [user, mainUser],
    createAt: createAt,
    // messages: [],
  };
  return await insertConversationDB(conversation);
};

export const getConversationById = async (conversationId) => {
  let conversation = await getConversationByIdDB(conversationId);
  return conversation;
};

export const getConversationByUserId = async (userId) => {
  let conversation = await getConversationByUserIdDB(userId);
  if (conversation.length > 0) return conversation[0];
  return null;
};

export const getConversationsHaveMessage = async () => {
  let conversations = await getAllConversationHaveMessageDB();
  return conversations;
};
//conversation end

export const deleteMessagesOfConversation = async (conversationId) => {
  let conversation = await getConversationByIdDB(conversationId);
  await deleteMultiMessageDB(conversation);
};

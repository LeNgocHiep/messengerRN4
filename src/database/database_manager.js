import Realm from "realm";
import { getAllUserDB, getUserByIdDB, User } from "../database/user_schema";
import EncryptedStorage from "react-native-encrypted-storage";
import { getUserFB } from "../firebase/firebase_user";
import "react-native-get-random-values";
import { v1 as uuidv1 } from "uuid";
import {
  insertConversationDB,
  getConversationByIdDB,
  Conversation,
  getConversationByUserIdDB,
  getAllConversationDB,
} from "./conversation_schema";
import { Message } from "./message_schema";

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
  const result = {
    avatar: user.avatar,
    createAt: user.createAt,
    email: user.email,
    name: user.name,
    userId: user.userId
  }
  return result;
};

export const getUserByIdApi = async (userId) => {
  let user = await getUserByIdDB(userId);
  if (user === undefined) {
     user = await getUserFB(userId);
  }
  const result = {
    avatar: user.avatar,
    createAt: user.createAt,
    email: user.email,
    name: user.name,
    userId: user.userId
  }
  return result;
};
//user end

//conversation start
export const createConversation = async (userId) => {
  const user = await getUserByIdApi(userId);
  const mainUser = await getMainUser();
  const name = `${user.name}, ${mainUser.name}`;
  const conversationId = uuidv1();
  const createAt = new Date().getTime();
  const conversation = {
    conversationId: conversationId,
    name: name,
    avatar: user.avatar,
    users: [user, mainUser],
    createAt: createAt,
    messages:[]
  };
  return await insertConversationDB(conversation);
};

export const getConversationById = async (conversationId) => {
  const conversation = await getConversationByIdDB(conversationId);
  return conversation;
};

export const getConversationByUserId = async (userId) => {
  const conversation = await getConversationByUserIdDB(userId);
  if (conversation.length > 0) return conversation[0];
  return null;
};

export const getConversations = async() => {
  const conversations = await getAllConversationDB();
  return conversations;
}
//conversation end

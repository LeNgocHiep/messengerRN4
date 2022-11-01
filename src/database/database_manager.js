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
  return user;
};

export const getUserByIdApi = async (userId) => {
  const userLocal = await getUserByIdDB(userId);
  if (userLocal === undefined) {
    const userApi = await getUserFB(userId);
    return userApi;
  }
  return userLocal;
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
    // messages:[]
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
//conversation end

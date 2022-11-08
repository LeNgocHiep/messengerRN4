import * as ActionTypes from "../utils/action_type";
import isLoading from "./loading_action";
import {
  createConversation,
  deleteMessagesOfConversation,
  getConversationByUserId,
  getConversationsHaveMessage,
  getUserByIdApi,
} from "../database/database_manager";
import { AsyncStorage } from 'react-native';
import {
  addConversationFB,
  onListenRealTimeConversationFB,
} from "../firebase/firebase_conversation";
import {
  insertConversationDB,
} from "../database/conversation_schema";

const getConversation = (conversations) => {
  return {
    type: ActionTypes.LIST_CONVERSATION,
    conversations: conversations,
  };
};

export const createConversationAction =
  (userId, navigation) => async (dispatch) => {
    dispatch(isLoading(true));
    getConversationByUserId(userId).then(async (conversation) => {
      let mainUserId = await AsyncStorage.getItem("UID");
      if (conversation === null) {
        createConversation(userId).then((conversation) => {
          getConversationsHaveMessage().then((conversations) => {
            if (conversations?.length > 0)
              dispatch(getConversation(conversations));
          });
          navigation.navigate("ChatScreen", {
            conversation: conversation,
            mainUserId: mainUserId,
          });
          dispatch(isLoading(false));

          const userIds = conversation.users.map((user) => user.userId);
          addConversationFB(
            conversation.conversationId,
            conversation.name,
            conversation.avatar,
            conversation.createAt,
            userIds,
            mainUserId
          );
        });
      } else {
        navigation.navigate("ChatScreen", {
          conversation: conversation,
          mainUserId: mainUserId,
        });
        dispatch(isLoading(false));
        const userIds = conversation.users.map(({user}) => user.userId);
        addConversationFB(
          conversation.conversationId,
          conversation.name,
          conversation.avatar,
          conversation.createAt,
          userIds,
          mainUserId
        );
      }
    });
  };

export const getListConversationAction = () => async (dispatch) => {
  getConversationsHaveMessage().then((conversations) => {
    if (conversations?.length > 0) dispatch(getConversation(conversations));
  });
};

export const onTouchConversationAction =
  (conversation, navigation) => async (dispatch) => {
    let mainUserId = await AsyncStorage.getItem("UID");
    navigation.navigate("ChatScreen", {
      conversation: conversation,
      mainUserId: mainUserId,
    });
  };

export const onListenConversationsAction = () => async (dispatch) => {
  let mainUserId = await AsyncStorage.getItem("UID");
  onListenRealTimeConversationFB(async (data) => {
    // const newUsers = data.userIds.map(
    //   async (userId) => await getUserByIdApi(userId)
    // );

    const newUsers = await Promise.all(
      data.userIds.map(async (userId) => {
        return await getUserByIdApi(userId);
      })
    );
    const conversation = {
      conversationId: data.conversationId,
      name: data.name,
      avatar: data.avatar,
      users: newUsers,
      createAt: data.createAt,
      // createBy: data.createBy,
      messages: [],
    };
    await insertConversationDB(conversation);
    getConversationsHaveMessage().then((conversations) => {
      if (conversations?.length > 0) dispatch(getConversation(conversations));
    });
  }, mainUserId);
};
export const onDeleteConversationAction =
  (conversation) => async (dispatch) => {
    try {
      await deleteMessagesOfConversation(conversation.conversationId);
    } catch (error) {
      console.log(error);
    }
    getConversationsHaveMessage().then((conversations) => {
      if (conversations?.length > 0) dispatch(getConversation(conversations));
    });
  };

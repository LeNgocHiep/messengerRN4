import {
  createMessage,
  getAllMessageByConversationId,
  getConversationById,
} from "../database/database_manager";
import {
  getAllMessageDB,
  getMessageByIdDB,
  insertMessageDB,
} from "../database/message_schema";
import {
  addMessageFB,
  onListenRealTimeMessageFB,
} from "../firebase/firebase_message";
import * as ActionTypes from "../utils/action_type";
import isLoading from "./loading_action";
import { getListConversationAction } from "./conversation_action";

const getMessages = (messages) => {
  return {
    type: ActionTypes.LIST_MESSAGE,
    messages: messages,
  };
};

export const createMessageAction =
  (content, conversationId, navigation) => async (dispatch) => {
    dispatch(isLoading(true));
    let message = await createMessage(content, conversationId);

    await addMessageFB(
      message.messageId,
      conversationId,
      message.content,
      message.type,
      message.image,
      message.senderId,
      message.sentAt
    );
    let messages = await getAllMessageByConversationId(conversationId);
    if (messages?.length > 0) dispatch(getMessages(messages));
    dispatch(isLoading(false));
  };

export const onListenMessagesAction = (conversationId) => async (dispatch) => {
  onListenRealTimeMessageFB(async (data) => {
    let message = {
      messageId: data.messageId,
      content: data.content,
      type: data.content,
      image: data.image,
      senderId: data.senderId,
      sentAt: data.sentAt,
    };
    let check = await getMessageByIdDB(data.messageId);
    if (!check) {
      await insertMessageDB(message, conversationId);
      let messages = await getAllMessageByConversationId(conversationId);
      if (messages?.length > 0) dispatch(getMessages(messages));
    }
  }, conversationId);
};
export const getListMessageAction = (conversationId) => async (dispatch) => {
  let messages = await getAllMessageByConversationId(conversationId);
  if (messages?.length > 0) dispatch(getMessages(messages));
};

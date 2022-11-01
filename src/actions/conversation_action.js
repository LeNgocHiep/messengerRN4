import * as ActionTypes from "../utils/action_type";
import {
  createConversation,
  getConversationByUserId,
} from "../database/database_manager";

const createConversationIsLoading = (bool) => {
  return {
    type: ActionTypes.CREATE_CONVERSATION_IS_LOADING,
    isLoading: bool,
  };
};

export const createConversationAction =
  ( userId, navigation ) =>
  async (dispatch) => {
    dispatch(createConversationIsLoading(true));
    let conversation = await getConversationByUserId(userId);
    if (conversation === null) conversation = await createConversation(userId);
    dispatch(createConversationIsLoading(false));
    navigation.navigate("ChatScreen", conversation);
  };

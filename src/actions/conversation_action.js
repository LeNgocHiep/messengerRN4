import * as ActionTypes from "../utils/action_type";
import isLoading from "./loading_action";
import {
  createConversation,
  getConversationByUserId,
} from "../database/database_manager";

export const createConversationAction = (userId, navigation) => async(dispatch) => {
  dispatch(isLoading(true));
  getConversationByUserId(userId).then((conversation) => {
    if (conversation === null) {
      createConversation(userId).then((conversation) => {
        dispatch(isLoading(false));
        navigation.navigate("ChatScreen", conversation);
      });
    } else {
      dispatch(isLoading(false));
      navigation.navigate("ChatScreen", conversation);
    }
  });
};

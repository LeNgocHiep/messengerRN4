import * as ActionTypes from "../../../utils/action_type";

const initialState = {
  conversations: [],
};

const listConversationReducer = (state = initialState,action) => {
  switch (action.type) {
    case ActionTypes.LIST_CONVERSATION:
      return {
        ...state,
        conversations: action.conversations,
      };
    default:
      return state;
  }
};
export default listConversationReducer;

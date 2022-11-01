import * as ActionTypes from "../../../utils/action_type";

const initialState = {
  isLoading: false,
};

const createConversationReducer = (state = initialState,action) => {
  switch (action.type) {
    case ActionTypes.CREATE_CONVERSATION_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};
export default createConversationReducer;

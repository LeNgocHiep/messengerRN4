import * as ActionTypes from "../../../utils/action_type";

const initialState = {
  messages: [],
};

const listMessageReducer = (state = initialState,action) => {
  switch (action.type) {
    case ActionTypes.LIST_MESSAGE:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
};
export default listMessageReducer;

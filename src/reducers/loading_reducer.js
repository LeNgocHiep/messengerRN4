import * as ActionTypes from "../utils//action_type";

const initialState = {
  isLoading: false,
  content: "Loading...",
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
        // content: action.content,
      };
    default:
      return state;
  }
};
export default loadingReducer;
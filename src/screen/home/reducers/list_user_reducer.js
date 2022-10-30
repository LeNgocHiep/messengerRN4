import * as ActionTypes from "../../../utils/action_type";

const initialState = {
  isLoading: false,
  users: [],
};

const listUserReducer = (state = initialState,action) => {
  switch (action.type) {
    case ActionTypes.LIST_USER_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case ActionTypes.LIST_USER_SUCCESS:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};
export default listUserReducer;

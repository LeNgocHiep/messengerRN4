import * as ActionTypes from "../../../utils/action_type";

const initialState = {
  users: [],
};

const listUserReducer = (state = initialState,action) => {
  switch (action.type) {
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

import * as ActionTypes from "../../../utils/action_type";

const initialState = {
  user: null,
};

const mainUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_MAIN_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
export default mainUserReducer;

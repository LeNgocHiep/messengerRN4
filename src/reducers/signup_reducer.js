import * as ActionTypes from "../utils//action_type";

const initialState = {
  isSuccess: false,
  hasError: false,
  isLoading: false,
  name: "",
  username: "",
  password: "",
};

const signUpReducer = (state = initialState,action) => {
  switch (action.type) {
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLogged: action.isSuccess,
      };
    case ActionTypes.SIGNUP_ERROR:
      return {
        ...state,
        hasError: action.hasError,
      };
    case ActionTypes.SIGNUP_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};
export default signUpReducer;

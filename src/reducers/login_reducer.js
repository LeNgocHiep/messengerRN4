import * as ActionTypes from "../utils//action_type";

const initialState = {
  isLogged: false,
  hasError: false,
  isLoading: false,
  name: "",
  username: "",
  password: "",
};

const loginReducer = (state = initialState,action) => {
  switch (action.type) {
    case ActionTypes.IS_LOGGED:
      // return action.isLogged;
      // console.log('islogged', action);

      return {
        ...state,
        isLogged: action.isLogged,
      };
    case ActionTypes.LOGIN_HAS_ERROR:
      // return action.loginHasError;
      // console.log('haserror', action);

      return {
        ...state,
        hasError: action.hasError,
      };
    case ActionTypes.LOGIN_IS_LOADING:
      // return action.loginIsLoading;
      // console.log('isloading', action);

      return {
        ...state,
        isLoading: action.isLoading,
      };
    case ActionTypes.LOGIN:
      return {
        ...state,
        isLogged: false,
        name: payload.name,
        username: payload.username,
        password: payload.password,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLogged: false,
        name: "",
        username: "",
        password: "",
      };
    default:
      return state;
  }
};
export default loginReducer;

import * as ActionTypes from "../utils/action_type";
import { getMainUser, getListUser } from "../database/database_manager";


const getMainUserIsLoading = (bool) => {
  return {
    type: ActionTypes.USER_MAIN_IS_LOADING,
    isLoading: bool,
  };
};
const getMainUserSuccess = (user) => {
  return {
    type: ActionTypes.USER_MAIN_SUCCESS,
    user: user,
  };
};

const getListUserIsLoading = (bool) => {
  return {
    type: ActionTypes.LIST_USER_IS_LOADING,
    isLoading: bool,
  };
};
const getListUserSuccess = (users) => {
  return {
    type: ActionTypes.LIST_USER_SUCCESS,
    users: users,
  };
};

export const getMainUserAction = () => async (dispatch) => {
  dispatch(getMainUserIsLoading(true));
  const user = await getMainUser();
  dispatch(getMainUserIsLoading(false));
  dispatch(getMainUserSuccess(user));
};

export const getListUserAction = () => async (dispatch) => {
  dispatch(getListUserIsLoading(true));
  const users = await getListUser();
  dispatch(getListUserIsLoading(false));
  dispatch(getListUserSuccess(users));
};



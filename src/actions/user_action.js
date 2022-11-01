import * as ActionTypes from "../utils/action_type";
import { getMainUser, getListUser } from "../database/database_manager";
import isLoading from "./loading_action";


const getMainUserSuccess = (user) => {
  return {
    type: ActionTypes.USER_MAIN_SUCCESS,
    user: user,
  };
};

const getListUserSuccess = (users) => {
  return {
    type: ActionTypes.LIST_USER_SUCCESS,
    users: users,
  };
};

export const getMainUserAction = () => async (dispatch) => {
  dispatch(isLoading(true));
  const user = await getMainUser();
  dispatch(isLoading(false));
  dispatch(getMainUserSuccess(user));
};

export const getListUserAction = () => async (dispatch) => {
  dispatch(isLoading(true));
  const users = await getListUser();
  dispatch(isLoading(false));
  dispatch(getListUserSuccess(users));
};



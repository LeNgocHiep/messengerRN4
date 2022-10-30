import { getAllUser, getUserById, User } from "../database/user_schema";
import EncryptedStorage from "react-native-encrypted-storage";
import * as ActionTypes from "../utils/action_type";
import { getUrlImageByImageName } from "../firebase/firebase_storage";

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

export const getMainUser = () => async (dispatch) => {
  EncryptedStorage.getItem("UID").then(async (userId) => {
    dispatch(getMainUserIsLoading(true));
    const user = await getUserById(userId);
    const longAvatar = await getUrlImageByImageName(user.avatar);
    const newUser = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      avatar: longAvatar,
      createAt: new Date(),
    };
    dispatch(getMainUserIsLoading(false));
    dispatch(getMainUserSuccess(newUser));
  });
};

export const getListUser = () => async (dispatch) => {
  dispatch(getListUserIsLoading(true));
  const users = await getAllUser();
  for (let i = 0; i < users.length; i++) {
    let longAvatar = await getUrlImageByImageName(users[i].avatar);
    users[i].avatar = longAvatar;
  }
  dispatch(getListUserIsLoading(false));
  dispatch(getListUserSuccess(users));
};

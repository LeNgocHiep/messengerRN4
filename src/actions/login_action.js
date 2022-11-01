import * as ActionTypes from "../utils/action_type";
import { loginUserFB } from "../firebase/firebase_login_user";
import Firebase from "../firebase/firebase_config";
import EncryptedStorage from "react-native-encrypted-storage";
import { getUserFB } from "../firebase/firebase_user";
import { insertUserIfNeededDB, User } from "../database/user_schema";

const isLogged = (bool) => {
  return {
    type: ActionTypes.IS_LOGGED,
    isLogged: bool,
  };
};

const loginHasError = (bool) => {
  return {
    type: ActionTypes.LOGIN_HAS_ERROR,
    hasError: bool,
  };
};

const loginIsLoading = (bool) => {
  return {
    type: ActionTypes.LOGIN_IS_LOADING,
    isLoading: bool,
  };
};

export const login = (username, password, navigation) => async (dispatch) => {
  console.log("user", username);
  console.log("pass", password);
  dispatch(loginIsLoading(true));
  if (!username || !password) {
    dispatch(loginHasError(true));
    dispatch(loginIsLoading(false));

    return;
  }

  loginUserFB(username, password)
    .then(async (res) => {
      dispatch(loginIsLoading(false));
      const uid = Firebase.auth().currentUser.uid;
      const user = await getUserFB(uid);
      if (user == null) {
        dispatch(loginIsLoading(false));
        dispatch(loginHasError(true));
        return;
      }
      await insertUserIfNeededDB(
        new User({
          userId: uid,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          createAt: new Date(user.createAt * 1000)
        })
      );
      await EncryptedStorage.setItem("UID", uid);
      navigation.replace("HomeScreen");
    })
    .catch((error) => {
      console.log(error);
      dispatch(loginHasError(true));
    });
};

export const logout = () => {
  AsyncStorage.removeItem("UID");
  return {
    type: ActionTypes.LOGOUT,
  };
};

// export default login;

// export default {
//   isLogged,
//   loginHasError,
//   loginIsLoading,
//   login,
//   logout,
// };

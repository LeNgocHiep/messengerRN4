import * as ActionTypes from "../utils/action_type";
import { loginUserFB } from "../firebase/firebase_login_user";
import Firebase from "../firebase/firebase_config";
import EncryptedStorage from "react-native-encrypted-storage";
import { getUserFB } from "../firebase/firebase_user";
import { insertUserIfNeededDB, User } from "../database/user_schema";
import isLoading from "./loading_action";

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


export const login = (username, password, navigation) => async (dispatch) => {
  console.log("user", username);
  console.log("pass", password);
  dispatch(isLoading(true));
  if (!username || !password) {
    dispatch(loginHasError(true));
    dispatch(isLoading(false));

    return;
  }

  loginUserFB(username, password)
    .then(async (res) => {
      const uid = Firebase.auth().currentUser.uid;
      const user = await getUserFB(uid);
      if (user == null) {
        dispatch(isLoading(false));
        dispatch(loginHasError(true));
        return;
      }
      await insertUserIfNeededDB(
        new User({
          userId: uid,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          createAt: user.createAt
        })
      );
      await EncryptedStorage.setItem("UID", uid);
      dispatch(isLoading(false));
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

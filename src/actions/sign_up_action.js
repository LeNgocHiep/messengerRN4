import * as ActionTypes from "../utils/action_type";
// import { Actions } from "react-native-router-flux";
import SignUpUserFB from "../firebase/firebase_sign_up";
import Firebase from "../firebase/firebase_config";
import { addUserFB, avatarDefault } from "../firebase/firebase_user";
import EncryptedStorage from "react-native-encrypted-storage";
import { Alert } from "react-native";
import { insertUserIfNeededDB, User } from "../database/user_schema";
import isLoading from "./loading_action";

const signUpSuccess = (bool) => {
  return {
    type: ActionTypes.SIGNUP_SUCCESS,
    isSuccess: bool,
  };
};

const signupHasError = (bool) => {
  return {
    type: ActionTypes.SIGNUP_ERROR,
    hasError: bool,
  };
};

const showAlert = () => Alert.alert("Sign up", "Success!");

export const signUp =
  (username, email, password, navigation) => async (dispatch) => {
    console.log("user", username);
    console.log("email", email);
    console.log("pass", password);
    dispatch(isLoading(true));
    if (!username || !password || !email) {
      dispatch(signupHasError(true));
      dispatch(isLoading(false));
      return;
    }
    SignUpUserFB(email, password)
      .then(async (res) => {
        const uid = Firebase.auth().currentUser.uid;
        const createAt = (new Date()).getTime();
        addUserFB(username, email, null, uid, createAt)
          .then(async () => {
            const user = new User({
              userId: uid,
              name: username,
              email: email,
              avatar: avatarDefault,
              createAt: createAt,
            });
            const userResult = await insertUserIfNeededDB(user);
            await EncryptedStorage.setItem("UID", uid);
            dispatch(isLoading(false));
            showAlert();
            // await delay(500);
            // navigation.goBack();
          })
          .catch((error) => {
            console.log(error);
            dispatch(isLoading(false));
            dispatch(signupHasError(true));
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch(signupHasError(true));
      });
  };

export const logout = () => {
  EncryptedStorage.removeItem("UID");
  // Actions.Login();
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

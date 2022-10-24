import * as ActionTypes from "../utils/action_type";
// import { Actions } from "react-native-router-flux";
import SignUpUser from "../firebase/firebase_sign_up";
import Firebase from "../firebase/firebase_config";
import AddUser from "../firebase/firebase_user";
import EncryptedStorage from "react-native-encrypted-storage";
import { Alert } from "react-native";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const signUpSuccess = (bool) => {
  return {
    type: ActionTypes.SIGNUP_SUCCESS,
    isSuccess: bool,
  };
};

export const signupHasError = (bool) => {
  return {
    type: ActionTypes.SIGNUP_ERROR,
    hasError: bool,
  };
};

export const signUpIsLoading = (bool) => {
  return {
    type: ActionTypes.SIGNUP_IS_LOADING,
    isLoading: bool,
  };
};

const showAlert = () => Alert.alert("Sign up","Success!");

export const signUp =
  (username, email, password, navigation) => async (dispatch) => {
    console.log("user", username);
    console.log("email", email);
    console.log("pass", password);
    dispatch(signUpIsLoading(true));
    if (!username || !password || !email) {
      dispatch(signupHasError(true));
      dispatch(signUpIsLoading(false));

      return;
    }
    console.log("!1111111");
    SignUpUser(email, password)
      .then(async (res) => {
        const uid = Firebase.auth().currentUser.uid;
        AddUser(username, email, "", uid)
          .then(async () => {
            await EncryptedStorage.setItem("UID", uid);
            dispatch(signUpIsLoading(false));
            showAlert();
            // await delay(500);
            // navigation.goBack();
          })
          .catch((error) => {
            console.log(error);
            dispatch(signUpIsLoading(false));
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

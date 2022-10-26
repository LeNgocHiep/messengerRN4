import * as ActionTypes from "../utils/action_type";
import { LoginUser } from "../firebase/firebase_login_user";
import Firebase from "../firebase/firebase_config";
import EncryptedStorage from "react-native-encrypted-storage";
import {getAllUser} from "../database/user_schema";

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

export const login = (username, password) => async (dispatch) => {
  const users = getAllUser();
  console.log(users);

  console.log("user", username);
  console.log("pass", password);
  dispatch(loginIsLoading(true));
  if (!username || !password) {
    dispatch(loginHasError(true));
    dispatch(loginIsLoading(false));

    return;
  }

  // fetch('http://192.168.0.115:8080/api/user', {
  //     method: 'POST',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({username: username, password: password})
  // })
  //     .then((res) => res.json())
  //     .then(res => {
  //         // cancela execução de call
  //         dispatch(loginIsLoading(false));

  //         // console.log(res);
  //         if(res.connected){
  //             dispatch(loginHasError(false));
  //             dispatch(isLogged(true));
  //             AsyncStorage.setItem('token', 'asdasdasd123'); // example
  //             Actions.Main();
  //         }
  //     })
  //     .catch((e) => {
  //         // console.warn(e);
  //         dispatch(loginHasError(true));
  //     });
  console.log("!1111111");
  LoginUser(username, password)
    .then(async (res) => {
      const uid = Firebase.auth().currentUser.uid;
      await EncryptedStorage.setItem("UID", uid);
      dispatch(loginIsLoading(false));
      Actions.Main();
    })
    .catch((error) => {
      console.log(error);
      dispatch(loginHasError(true));
    });
};

// const logout = () => {
//   AsyncStorage.removeItem("UID");
//   // Actions.Login();
//   return {
//     type: ActionTypes.LOGOUT,
//   };
// };

// export default login;

// export default {
//   isLogged,
//   loginHasError,
//   loginIsLoading,
//   login,
//   logout,
// };

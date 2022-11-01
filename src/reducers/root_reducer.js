import { combineReducers } from "redux";
import  loginReducer  from "./login_reducer";
import  signUpReducer  from "./signup_reducer";
import  listUserReducer  from "../screen/home/reducers/list_user_reducer";
import  mainUserReducer from "../screen/home/reducers/main_user_reducer";
import loadingReducer from "./loading_reducer";

const rootReducer = combineReducers({
  loadingReducer: loadingReducer,
  loginProducer: loginReducer,
  signUpReducer: signUpReducer,
  mainUserReducer: mainUserReducer,
  listUserReducer: listUserReducer,
});

export default rootReducer;

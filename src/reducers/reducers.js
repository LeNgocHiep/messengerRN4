import { combineReducers } from "redux";
import loginReducer from "./login_reducer";
import signUpReducer from "./signup_reducer";

const rootReducer = combineReducers({
  loginProducer: loginReducer,
  signUpReducer: signUpReducer
});

export default rootReducer;

import { combineReducers } from "redux";
import loginReducer from "./login_reducer";

const rootReducer = combineReducers({
  loginProducer: loginReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import  loginReducer  from "./login_reducer";
import  signUpReducer  from "./signup_reducer";
import  listUserReducer  from "../screen/home/reducers/list_user_reducer";
import  mainUserReducer from "../screen/home/reducers/main_user_reducer";
import loadingReducer from "./loading_reducer";
import listConversationReducer from "../screen/home/reducers/list_conversation_reducer";
import listMessageReducer from "../screen/chat/reducers/list_message_reducer";

const rootReducer = combineReducers({
  loadingReducer: loadingReducer,
  loginProducer: loginReducer,
  signUpReducer: signUpReducer,
  mainUserReducer: mainUserReducer,
  listUserReducer: listUserReducer,
  listConversationReducer: listConversationReducer,
  listMessageReducer: listMessageReducer,
});

export default rootReducer;

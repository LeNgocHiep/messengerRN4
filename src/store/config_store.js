import { createStore, combineReducers } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import LoginReducer from "../reducers/login_reducer";

const rootReducer = combineReducers({
  // loginReducer: LoginReducer(),
});

const configStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configStore;

import { createStore, applyMiddleware, combineReducers } from "redux";
import rootReducer from "../reducers/reducers";
import thunk from "redux-thunk";

const store = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};
export default store;

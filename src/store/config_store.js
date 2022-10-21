import { configureStore } from "@reduxjs/toolkit";
import loginProducer from "../reducers/login_reducer";

const store = configureStore({
  reducer: {
    login: loginProducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk),
});
export default store;

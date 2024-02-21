import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import fbReducer from "./fbSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    fb: fbReducer,
  },
});

export default appStore;

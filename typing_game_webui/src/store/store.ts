import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/userSlice";
import profileReducer from "../features/profileSlice";
import userAuthInfo from "../features/authSlice"

const store = configureStore({
  reducer: {
    userInfo: UserReducer,
    profile: profileReducer,
    Auth:userAuthInfo
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/userSlice";
import profileReducer from "../features/profileSlice";

const store = configureStore({
  reducer: {
    userInfo: UserReducer,
    profile: profileReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

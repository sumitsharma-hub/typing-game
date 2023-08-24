import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    userInfo: UserReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

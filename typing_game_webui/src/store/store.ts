// import { configureStore } from "@reduxjs/toolkit";
// import UserReducer from "../features/userSlice";
// import profileReducer from "../features/profileSlice";
// import userAuthInfo from "../features/authSlice"

// const store = configureStore({
//   reducer: {
//     userInfo: UserReducer,
//     profile: profileReducer,
//     Auth:userAuthInfo
//   },
// });
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export default store;


import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserReducer from '../features/userSlice';
import profileReducer from '../features/profileSlice';
import userAuthInfo from '../features/authSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  userInfo: UserReducer,
  profile: profileReducer,
  Auth: userAuthInfo,
  // Add any other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export default store;

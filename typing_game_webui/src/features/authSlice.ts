import { RootState } from "../store/store";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setLoggedOut: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoggedIn, setLoggedOut } = userAuthSlice.actions;
export const selectIsLoggedIn = (state: { auth: AuthState }): boolean => state.auth.isLoggedIn;
export default userAuthSlice.reducer;
  
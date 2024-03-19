import { RootState } from "../store/store";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  notLoggedInName: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  notLoggedInName: "",
};

const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setNotLoggedInName: (state, action) => {
      state.notLoggedInName = action.payload.notLoggedInName;
    },
  },
});

export const { setLoggedIn, setNotLoggedInName } = userAuthSlice.actions;
// export const selectIsLoggedIn = (state: { auth: AuthState }): boolean => state.auth.isLoggedIn;
export default userAuthSlice.reducer;
  
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWord } from "../interfaces/word";

interface roomDataState {
  roomTextData: IWord | { data: [] };
  roomId: string;
  gameType: string;
}

const initialState: roomDataState = {
  roomTextData: { data: [""] },
  roomId: "",
  gameType: "random",
};

const roomDataSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomTextData: (state, action: PayloadAction<IWord | { data: [] }>) => {
      state.roomTextData = action.payload;
    },
    setNotLoggedInName: (state, action) => {
      state.roomId = action.payload.roomId;
    },
    setGameType: (state, action) => {
      state.gameType = action.payload;
    },
  },
});

export const { setRoomTextData, setNotLoggedInName, setGameType } = roomDataSlice.actions;
// export const selectIsLoggedIn = (state: { auth: AuthState }): boolean => state.auth.isLoggedIn;
export default roomDataSlice.reducer;

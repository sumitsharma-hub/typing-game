import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../services/axios";
import { STATUS } from "./userSlice";
import { RootState } from "../store/store";

export interface profileState {
  status: STATUS;
  profileImage: string;
}
const initialState: profileState = {
  status: STATUS.LOADING,
  profileImage: "",
};

export const fetchProfile = createAsyncThunk("fetchUserInfo", async () => {
  const randomText = Math.random();
  const response = await Axios.get("https://api.multiavatar.com/" + "a" + randomText);
  const data = response.data;
  return data;
});


const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.status = STATUS.IDLE;
      state.profileImage = action.payload;
    });
    builder.addCase(fetchProfile.rejected, (state) => {
      state.status = STATUS.ERROR;
      state.profileImage;
      
    });
  },
  reducers: {},
});
export const profileSelector = (state: RootState) => state.profile;
export default profileSlice.reducer;


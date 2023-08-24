import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Axios from "../services/axios";
import { API } from "../constants";
import { RootState } from "../store/store";
import { IUser } from "../interfaces/user";

enum STATUS {
  IDLE = "idle",
  ERROR = "error",
  SUCCESS = "success",
  LOADING = "loading",
}

export interface UserState  {
  status: STATUS;
  user: IUser | undefined;
}
const initialState: UserState = {
  status: STATUS.LOADING,
  user: {
    id: "1",
    firstName: "sumit",
    lastName: "sharma",
    isAdmin: false,
    isActive: false,
    email: "sumit@gmail.com",
    dataJoined: "2023-08-18T09:49:16.938+00:00",
  },
};

export const fetchUser = createAsyncThunk("fetchUserInfo", async () => {
  const response = await Axios.get(API.V1.ACCOUNT_DETAILS);
  const data = response.data;
  return data;
});

const userSlice = createSlice({
  name: "userInfo",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.status = STATUS.IDLE;
      console.log(action.payload,'------>action payload')
      state.user= action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = STATUS.ERROR;
      state.user;
    });
  },

  reducers: {
    ClearInfo:(state)=>{
      state.status=STATUS.IDLE;
      state.user=undefined;
      return state;
    }
  },
});
export const {ClearInfo}= userSlice.actions;
export const userSelector = (state: RootState) => state.userInfo;
export default userSlice.reducer;



// export function fetchUserInfo(){
//     return async function fetchInfo(dispatch: ThunkDispatch<RootState, undefined, any>):Promise<void>{
//         dispatch(STATUS.LOADING)
//         try{
//             const response=await Axios.get(API.V1.ACCOUNT_DETAILS);
//             const data=response.data;
//             dispatch(getUserInfo(data));
//             dispatch(STATUS.IDLE);
//         }
//         catch(error){
//             dispatch(STATUS.ERROR);
//             console.log(error);
//         }
//     }
// }


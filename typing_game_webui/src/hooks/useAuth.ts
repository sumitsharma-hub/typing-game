import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Axios from "../services/axios";
import { API, LOCAL_STORAGE_KEY } from "../constants";
import Cookies from "js-cookie";
import { fetchUser } from "../features/userSlice";
import {setLoggedIn} from "../features/authSlice"
import { ILogin, IUseAuth, IUser } from "../interfaces/user";
import {useAppDispatch} from '.'


export function useAuth(): IUseAuth {
  const [user, setUser] = useState<IUser>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch=useAppDispatch();
  
  const login = async (loginPayload: ILogin) => {    
    try {
      const response = await Axios.post(API.V1.ACCOUNT_LOGIN, loginPayload);
      if (response.status === 401) {
        console.log(response.status, "Invalid credentials");
      }
      const AccessToken = response.data.token;
      localStorage.setItem(LOCAL_STORAGE_KEY, AccessToken);
      if(response.status===201){
        setIsLoggedIn((prev)=>!prev);
        dispatch(setLoggedIn(true));
        console.log("22222---->")
      }
      setUser(await response.data);
      await dispatch(fetchUser());
      navigate("/");
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error, "something went wrong while logging in");
    }
  };

  const register = async (registerPayload: {}) => {
    try {
      const response = await Axios.post(API.V1.ACCOUNT_RESITER, registerPayload);
      if (response.status === 401) {
        console.log(response.status, "Invalid credentials");
      }
      const AccessToken = response.data.token.key;
      localStorage.setItem(LOCAL_STORAGE_KEY, AccessToken);
      setUser(await response.data);
      setIsLoggedIn(true);
      dispatch(setLoggedIn(true));

      dispatch(fetchUser());
      navigate("/");
    } catch (error) {
      console.log(error, "something went wrong while registering the user");
    }
  };

  const logout = async () => {
    try {
      const token = Cookies.get("access_token");
      if (token) {
        const revoke_data = await axios.post(`${API.V1.REVOKE_TOKEN}=${token}`);
        const cookies = Object.keys(Cookies.get());
        cookies.forEach((cookieName) => {
          Cookies.remove(cookieName);
        });
      }
      const response = await Axios.delete(API.V1.ACCOUNT_LOGOUT);
      if (response.status === 401) {
        console.log(response.status, "Invalid User");
      }
      localStorage.clear();
      setIsLoggedIn(false);
      dispatch(setLoggedIn(false));
      navigate("/login");
    } catch (error) {
      console.log(error, "something went wrong while logging Out");
    }
  };


 

  return {isLoggedIn, login, register, logout, user };
}

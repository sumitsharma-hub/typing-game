import { useState } from "react";
import Axios from "../services/axios";
import { API, LOCAL_STORAGE_KEY } from "../constants";
import { useNavigate } from "react-router-dom";

interface IUseAuth {
  login: (loginPayload: {}) => Promise<void>;
  register: (registerPayload: {}) => Promise<void>;
  logout: () => Promise<void>;
  user: IUser | undefined;
}
interface IUser {
  name?: string;
  email: string;
  picture?: string;
}

export function useAuth(): IUseAuth {
  const [user, setUser] = useState<IUser>();
  const [loggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = async (loginPayload: {}) => {
    try {
      const response = await Axios.post(API.V1.ACCOUNT_LOGIN, loginPayload);
      if (response.status === 401) {
        console.log(response.status, "Invalid credentials");
      }
      const AccessToken = response.data.token;
      localStorage.setItem(LOCAL_STORAGE_KEY, AccessToken);
      setIsLoggedIn(true);
      setUser(await response.data);

      navigate("/");
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
      navigate("/");
    } catch (error) {
      console.log(error, "something went wrong while registering the user");
    }
  };

  const logout = async () => {
    try {
      const response = await Axios.delete(API.V1.ACCOUNT_LOGOUT);
      if (response.status === 401) {
        console.log(response.status, "Invalid User");
      }
      localStorage.clear();
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log(error, "something went wrong while logging Out");
    }
  };

  return { login, register, logout, user };
}

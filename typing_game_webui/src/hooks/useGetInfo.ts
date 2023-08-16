import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { API } from "../constants";


interface IUserInfo {
  userData: IUserData | undefined;
  loading: boolean;
  getUserInfo: (access_token: string) => Promise<void>;
}

interface IUserData{
  email:string,
  picture:string,
  name:string
}

export default function useGetInfo():IUserInfo {
  const [userData, setUserData] = useState<IUserData>();
  const [loading, setLoading] = useState(false);

  const getUserInfo = async (access_token: string) => {
    try {
      const response: AxiosResponse = await axios.get(`${API.V1.USER_INFO}=${access_token}`);
      const data = await response.data;
      setUserData(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  };

  return { userData, loading, getUserInfo };
}

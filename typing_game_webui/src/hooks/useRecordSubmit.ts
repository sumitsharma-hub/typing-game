import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { API } from "../constants";
import Axios from "../services/axios";


interface IUserInfo {
  userData: IUserData | undefined;
  loading: boolean;
  submitRecord: (access_token: {}) => Promise<void>;
}

interface IUserData{
  email:string,
  picture:string,
  name:string
}

export default function useRecordSubmit():IUserInfo {
  const [userData, setUserData] = useState<IUserData>();
  const [loading, setLoading] = useState(false);

  const submitRecord = async (payload: {}) => {
    try {
      const response: AxiosResponse = await Axios.post(API.V1.RECORD_SUBMIT , payload);
      const data = await response.data;
      console.log(data,'data===============>')
      setUserData(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log("Error submitting user info:", error);
    } finally {
      setLoading(false);
    }
  };

  return { userData, loading, submitRecord };
}

import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import { API } from "../constants";
import axios from "../services/axios";


export default function useGenerateText() {
  const [textData, setTextData] = useState();
  const [loading, setLoading] = useState(false);

  const generateText = async () => {
    const response: AxiosResponse = await axios.get(API.V1.GENERATE_TEXT);
    const data = await response.data;
    
    setTextData(data);
    setLoading(!loading);
  };

  useEffect((): void => {
    setLoading(loading);
    generateText();
  }, []);

  return [textData, loading];
}

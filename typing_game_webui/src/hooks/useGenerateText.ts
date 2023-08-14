import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import { API } from "../constants";
import axios from "../services/axios";
import { IWord } from "../interfaces/word";
import Axios from "../services/axios";

export default function useGenerateText() {
  const [textData, setTextData] = useState<IWord | []>([]);
  const [loading, setLoading] = useState(false);

  const generateText = async () =>{
    try{

      const response = await Axios.get(API.V1.GENERATE_TEXT);
      const data = await response.data;
      setTextData(data);
      setLoading(false);
    }catch(error){
      console.log(error,'something went wrong while fetching text')
    }
  };

  useEffect((): void => {
    setLoading(true);
    generateText();
  }, []);

  return [textData, loading, generateText];
}

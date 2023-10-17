import { useEffect, useState } from "react";

import { API } from "../constants";
import { IWord } from "../interfaces/word";
import Axios from "../services/axios";

export interface GenerateText{
  textData:IWord | {data:[]};
  loading:boolean;
  generateText:()=>Promise<void>;
}

export default function useGenerateText():GenerateText {
  const [textData, setTextData] = useState<IWord>({ data: [""] });
  const [loading, setLoading] = useState(false);

  const generateText = async () =>{
    try{
      const response = await Axios.get(API.V1.GENERATE_TEXT);
      const data = await response.data;
      console.log(data,'this is data');
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

  return {textData, loading, generateText};
}


import { API } from "../constants";
import { IWord } from "../interfaces/word";
import Axios from "../services/axios";
import { useAppDispatch } from ".";
import { setRoomTextData } from "../features/roomDataSilce";
import { useState } from "react";

export interface GenerateText {
  textData: IWord | { data: [] };
  loading: boolean;
  generateText: () => Promise<void>;
  setTextData: Function;
}

export default function useGenerateText(): GenerateText {
  const [textData, setTextData] = useState<IWord>({ data: [""] });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const generateText = async () => {
    try {
      const response = await Axios.get(API.V1.GENERATE_TEXT);
      const data = await response.data;
      setTextData(data);
      setLoading(false);
      dispatch(setRoomTextData(data));
    } catch (error) {
      console.log(error, "something went wrong while fetching text");
    }
  };


  return { textData, loading, generateText, setTextData };
}

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../store/store";
import useGenerateText from "./useGenerateText";
import useGetInfo from "./useGetInfo";
import useName from "./useName";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {  useAppDispatch, useAppSelector, useName, useGenerateText, useGetInfo,  };

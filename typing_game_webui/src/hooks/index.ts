import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../store/store";
import useGenerateText from "./useGenerateText";
import useGetInfo from "./useGetInfo";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useGenerateText, useGetInfo, useAppDispatch, useAppSelector };

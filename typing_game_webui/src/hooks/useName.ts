import { useState } from "react";
import { useAppDispatch } from ".";
import { setNotLoggedInName } from "../features/authSlice";
const NamesAdjectives = [
  "wonderfully",
  "unethically",
  "excellently",
  "brilliantly",
  "graciously",
  "joyfully",
  "skillfully",
  "boldly",
  "peacefully",
  "elegantly",
  "cheerfully",
  "kindly",
  "faithfully",
  "playfully",
  "harmoniously",
  "honestly",
  "lovingly",
  "courageously",
  "creatively",
  "patiently",
  "passionately",
  "sincerely",
  "tirelessly",
];

export default function useName() {
  const [userNameNotLoggedIn, setUserNameNotLoggedIn] = useState("");

  const dispatch=useAppDispatch();

  const getUniqueName = () => {
    const localStorageKey = 'userNameNotLogged';
    let PreuniqueName = localStorage.getItem(localStorageKey);
    if (PreuniqueName) return;
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    const randomAdjective = NamesAdjectives[Math.floor(Math.random() * NamesAdjectives.length)];
    const uniqueName = `${randomAdjective}#${randomNumber}`;
    localStorage.setItem(localStorageKey,uniqueName)
    dispatch(setNotLoggedInName({notLoggedInName:uniqueName}))
    setUserNameNotLoggedIn(uniqueName);
    // return uniqueName;
  };


  return {userNameNotLoggedIn,getUniqueName}; // Example output: "wonderfully-5678"
}

import { useEffect } from "react";
import Cards from "../../containers/CardContainer";
import { useAuth } from "../../hooks/useAuth";
import useName from "../../hooks/useName";
import { GaurdedLayout } from "../../layouts";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Cookies from "js-cookie";
import { setLoggedIn } from "../../features/authSlice";

const Home = () => {
  const isLoggedInAuthInfo= useAppSelector(state=>state.Auth)
  const dispatch=useAppDispatch();
  const {userNameNotLoggedIn ,getUniqueName} = useName();
  useEffect(()=>{
    if(!isLoggedInAuthInfo.isLoggedIn ||  isLoggedInAuthInfo.notLoggedInName==="" || isLoggedInAuthInfo.notLoggedInName===null){
      getUniqueName();
    }
  },[isLoggedInAuthInfo]);

  useEffect(() => {
    const access_token = Cookies.get("access_token");
    if (access_token) {
      dispatch(setLoggedIn(true));
    }
  }, []);
  return (
    <>
      <GaurdedLayout>
        <Cards />
      </GaurdedLayout>
    </>
  );
};

export default Home;

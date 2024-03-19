import { useEffect } from "react";
import Cards from "../../containers/CardContainer";
import { useAuth } from "../../hooks/useAuth";
import useName from "../../hooks/useName";
import { GaurdedLayout } from "../../layouts";
import { useAppSelector } from "../../hooks";

const Home = () => {
  // const { isLoggedIn } = useAuth();
  const isLoggedInAuthInfo= useAppSelector(state=>state.Auth)
  const {userNameNotLoggedIn ,getUniqueName} = useName();
  useEffect(()=>{
    if(!isLoggedInAuthInfo.isLoggedIn ||  isLoggedInAuthInfo.notLoggedInName==="" || isLoggedInAuthInfo.notLoggedInName===null){
      getUniqueName();
    }
  },[isLoggedInAuthInfo])
  return (
    <>
      <GaurdedLayout>
        <Cards />
      </GaurdedLayout>
    </>
  );
};

export default Home;

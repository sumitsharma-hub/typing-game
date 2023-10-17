import { useEffect } from "react";
import Cards from "../../containers/CardContainer";
import { useAuth } from "../../hooks/useAuth";
import useName from "../../hooks/useName";
import { GaurdedLayout } from "../../layouts";

const Home = () => {
  const { isLoggedIn } = useAuth();
  const {userName,getUniqueName} = useName();
  useEffect(()=>{
    if(!isLoggedIn){
      getUniqueName();
    }
  },[])
  return (
    <>
      <GaurdedLayout>
        <Cards />
      </GaurdedLayout>
    </>
  );
};

export default Home;

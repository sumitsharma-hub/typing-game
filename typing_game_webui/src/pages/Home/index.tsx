import Cards from "../../containers/CardContainer";
import { GaurdedLayout } from "../../layouts";

const Home = () => {
  
  return (
    <>
      <GaurdedLayout>
        <Cards />
      </GaurdedLayout>
    </>
  );
};

export default Home;

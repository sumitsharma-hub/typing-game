import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Browser } from "./constants";
import { Home, Random } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path={Browser.ROOT} element={<Home />}></Route>
        <Route path={Browser.RANDOM} >
          <Route path={"random"} element={<Random/>}/>
          <Route path={"regular"} element={<Random/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

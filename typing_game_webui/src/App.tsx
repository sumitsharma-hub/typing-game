import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Browser } from "./constants";
import { Home, Random, HTTP404 ,Login, Register} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path={Browser.LOGIN} element={<Login />}></Route>
        <Route path={Browser.REGISTER} element={<Register />}></Route>
        <Route path={Browser.ROOT} element={<Home />}></Route>
        <Route path={Browser.RANDOM}>
          <Route path={"random"} element={<Random />} />
          <Route path={"regular"} element={<Random />} />
        </Route>
        <Route path={Browser.HTTP_404} element={<HTTP404 />}></Route>
        <Route path={Browser.ASTERISK} element={<HTTP404 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

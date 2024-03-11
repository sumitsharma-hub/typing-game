import { Browser } from "./constants";
import { Custom, Home, Random, HTTP404, Login, Register } from "./pages";
import store from "./store/store";

import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { io, Socket } from "socket.io-client";

function App() {
  let socket: Socket = io("http://127.0.0.1:8000/");
  useEffect(() => {
    socket.on("connect", () => console.log(socket.id));
  }, [socket]);

  

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={Browser.LOGIN} element={<Login />}></Route>
          <Route path={Browser.REGISTER} element={<Register />}></Route>
          <Route path={Browser.ROOT} element={<Home />}></Route>
          <Route path={Browser.RANDOM}>
            <Route path={"random"} element={<Random />} />
            <Route path={"custom/:id"} element={<Custom socket={socket} />} />
          </Route>
          <Route path={Browser.HTTP_404} element={<HTTP404 />}></Route>
          <Route path={Browser.ASTERISK} element={<HTTP404 />}></Route>
        </Routes>
      </BrowserRouter>
      <br />
    </Provider>
  );
}

export default App;

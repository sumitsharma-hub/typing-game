import { Browser } from "./constants";
import { Custom, Home, Random, HTTP404, Login, Register , JoinGame} from "./pages";
import { store, persistor } from "./store/store"; // Import the store and persistor
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

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
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path={Browser.LOGIN} element={<Login />}></Route>
            <Route path={Browser.REGISTER} element={<Register />}></Route>
            <Route path={Browser.ROOT} element={<Home />}></Route>
            <Route path={Browser.RANDOM}>
              <Route path={"random"} element={<Random socket={socket}/>} />
              <Route path={"custom/:id"} element={<Custom socket={socket} />} />
              <Route path={"custom/join-game"} element={<JoinGame socket={socket} />} />
            </Route>
            <Route path={Browser.HTTP_404} element={<HTTP404 />}></Route>
            <Route path={Browser.ASTERISK} element={<HTTP404 />}></Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

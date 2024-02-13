import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import RightSiderBar from "./Pages/RightSiderBar";
import Home from "./Pages/Home";
import LoginPage from "./Component/LoginPage";
import { Profiler, useState } from "react";
import Profile from "./Pages/Profile";

function App() {
  const [login, setLogin] = useState(false);

  const locate = useLocation();
  return (
    <>
      <div className="flex justify-between overflow-x-hidden">
        {login ? null : (
          <header className="w-[23%] h-screen fixed top-0 left-0">
            <Navbar></Navbar>
          </header>
        )}

        <div
          className={` ${
            locate.pathname === "/profile" || locate.pathname === "/profile/"
              ? "w-[100%] left-[10%]"
              : "w-[50%] left-[23%]"
          } relative  `}
        >
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        {login ? null : (
          <div
            className={`w-[27%] h-screen sticky right-0 top-0 ${
              locate.pathname === "/profile" || locate.pathname === "/profile/"
                ? "hidden"
                : null
            } `}
          >
            <RightSiderBar></RightSiderBar>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

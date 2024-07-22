import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import RightSiderBar from "./Pages/RightSiderBar";
import Home from "./Pages/Home";
import LoginPage from "./Component/LoginPage";
import { Profiler, useEffect, useState } from "react";
import Profile from "./Pages/Profile";
import SignUp from "./Component/SignUp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createContext  } from "react";
import Chats from "./Pages/Chats";

const GlobalUserData = createContext();

function App() {
  
  let storedToken = localStorage.getItem("token");
  let userDatas = localStorage.getItem("userData");
  // console.log(userDatas)
  const [token, setToken ] = useState(storedToken);
  const [userData, setUserData] = useState(userDatas);
  // console.log(userData)
  const navigate = useNavigate();
  const locate = useLocation();

  const checkLoginOrNot = ()=>{
    if(token){
      navigate("/")
    }else{
      navigate("/login")
    }
  }
  useEffect(()=>{
    setUserData(userDatas)
  },[userDatas])
  
  useEffect(()=>{
    checkLoginOrNot()
  },[token])

  const userobject = JSON.parse(userData)

  return (
    <GlobalUserData.Provider value={{token, setToken , userobject }}>
      <ToastContainer/>
      <div className="z-50">
      </div>
      <div className="flex justify-between overflow-x-hidden -z-30">
        {token?
          <header className={`w-[23%] h-screen fixed top-0 left-0 ${!token? "hidden":null} `}>
            <Navbar></Navbar>
          </header> : null
        }
        <div
          className={` ${
            locate.pathname === "/profile/:userId" || locate.pathname === "/profile/:userId" || locate.pathname === "/messages"
              ? "w-[100%] left-[10%]"
              : "w-[90%] md:w-[50%] left-[20%] md:left-[23%]"
          } relative  `}
        >
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/messages" element={<Chats />} />
          </Routes>
        </div>
        {token ?(
          <div
            className={`w-[27%] hidden md:block h-screen sticky right-0 top-0 ${
              locate.pathname === "/profile" || locate.pathname === "/profile/" || locate.pathname === "/messages"
                ? "imgHidden"
                : null
            } `}
          >
            <RightSiderBar></RightSiderBar>
          </div>
        ):null}
      </div>
    </GlobalUserData.Provider>
  );
}

export default App;
export {GlobalUserData};

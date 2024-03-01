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

const GlobalUserData = createContext();

function App() {
  
  let storedToken = localStorage.getItem("token")
  let userDatas = localStorage.getItem("userData")
  const [token, setToken ] = useState(storedToken);
  const [userData, setUserData] = useState(userDatas);
  const navigate = useNavigate()
  const locate = useLocation();

  const checkLoginOrNot = ()=>{
    if(token){
      navigate("/")
    }else{
      navigate("/login")
    }
  }
  
  useEffect(()=>{
    checkLoginOrNot()
  },[token])
  const userobject = JSON.parse(userData)
  return (
    <GlobalUserData.Provider value={{token, setToken , userobject }}>
      <ToastContainer/>
      <div className="flex justify-between overflow-x-hidden">
        {token?
          <header className={`w-[23%] h-screen fixed top-0 left-0`}>
            <Navbar></Navbar>
          </header> : null
        }
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
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        {token ?(
          <div
            className={`w-[27%] h-screen sticky right-0 top-0 ${
              locate.pathname === "/profile" || locate.pathname === "/profile/"
                ? "hidden"
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

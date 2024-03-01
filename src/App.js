import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import RightSiderBar from "./Pages/RightSiderBar";
import Home from "./Pages/Home";
import LoginPage from "./Component/LoginPage";
import { Profiler, useEffect, useState } from "react";
import Profile from "./Pages/Profile";
import axios from 'axios';
import SignUp from "./Component/SignUp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


function App() {
  const [token, setToken ] = useState(false);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate()

  const locate = useLocation();
  const baseUrl = "http://localhost:4000"
  
  //check login or not

  const checkLogin = async()=>{
    const data = {
      "email":"naveensharma@gmail.com",
      "password":"123456"
  }
    try{
      const loginData = await axios.post(baseUrl + "/api/v1/login" , data)
      // setToken(loginData.data.userData.token)
      setUserData(loginData.data.userData.user)
    }catch(err){
      console.log(err.message)
    }

  }

  // const checkLoginOrNot = ()=>{
  //   if(token){
  //     navigate("/")
  //   }else{
  //     navigate("/login")
  //   }
  // }
  
  useEffect(()=>{
    checkLogin()
    // checkLoginOrNot()
  },[])

  return (
    <>
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
    </>
  );
}

export default App;

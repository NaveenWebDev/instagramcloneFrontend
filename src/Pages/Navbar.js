import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import VideoSettingsOutlinedIcon from '@mui/icons-material/VideoSettingsOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Avatar from '@mui/material/Avatar';
import profileImg from "../assets/profile.jpg"
import {GlobalUserData} from "../App"


const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false)

  const navigate = useNavigate();

  const userDatas = useContext(GlobalUserData);
  console.log(userDatas.setToken); // Check if token is retrieved correctly

  const logout = ()=>{
    localStorage.removeItem("token");
    navigate('/login')
    userDatas.setToken("")
  }

  return (
    <>
      <nav className="border border-r-gray-300 h-screen px-7 ">
        <ul className="flex flex-col justify-between h-full pb-5">
          <img src="/logo.png" alt="logo" width="60%" className="pb-5 pt-10" />
          <li>
            <NavLink to="/">
              {" "}
              <div className="flex items-center">
                {" "}
                <HomeOutlinedIcon
                  sx={{ fontSize: "35px", marginRight: "0.5rem" }}
                />{" "}
                Home{" "}
              </div>{" "}
            </NavLink>
          </li>
          <li>
            <span><div className='flex items-center'> <SearchOutlinedIcon sx={{fontSize:"35px", marginRight:"0.5rem"}} /> Search </div></span>
          </li>
          <li>
            <NavLink to="/explore">
              <div className="flex items-center">
                {" "}
                <ExploreOutlinedIcon
                  sx={{ fontSize: "35px", marginRight: "0.5rem" }}
                />{" "}
                Explore{" "}
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/reels">
              <div className="flex items-center">
                {" "}
                <VideoSettingsOutlinedIcon
                  sx={{ fontSize: "35px", marginRight: "0.5rem" }}
                />{" "}
                Reels{" "}
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/messages">
              <div className="flex items-center">
                {" "}
                <ChatOutlinedIcon
                  sx={{ fontSize: "35px", marginRight: "0.5rem" }}
                />{" "}
                Messsages{" "}
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/notifications">
              <div className="flex items-center cursor-pointer">
                {" "}
                <FavoriteBorderOutlinedIcon
                  sx={{ fontSize: "35px", marginRight: "0.5rem" }}
                />{" "}
                Notification{" "}
              </div>
            </NavLink>
          </li>
          <li>
            <span>
              <div className="flex items-center cursor-pointer">
                {" "}
                <AddBoxOutlinedIcon
                  sx={{ fontSize: "35px", marginRight: "0.5rem" }}
                />{" "}
                Create Post
              </div>
            </span>
          </li>
          <li>
            <span>
              <div className="flex items-center cursor-pointer">
                <Avatar src={profileImg}
                  sx={{ width: 33, height: 33, marginRight: "0.5rem" }}
                />
                <Link to="/profile">Profile</Link>
              </div>
            </span>
          </li>
          <li className="relative" onClick={()=>setIsHidden((prev)=>!prev)}>
            <span>
              <div className="flex items-center cursor-pointer">

                <MenuOutlinedIcon
                  sx={{ fontSize: "35px", marginRight: "0.5rem" }}
                />
                More
              </div>
            </span>
            <div className={`absolute border shadow-2xl bg-white w-full top-[-200%] p-2 rounded-md ${isHidden?'block':'hidden'} `}>
              <button 
                className="border rounded-md border-blue-950 w-full hover:bg-[silver] transition-[all 0.5s] duration-700 py-3"
                onClick={logout}>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

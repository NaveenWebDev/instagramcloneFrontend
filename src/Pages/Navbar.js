import React, { useContext, useEffect, useState } from "react";
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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from "react-toastify";


const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false)

  const navigate = useNavigate();

  const userDatas = useContext(GlobalUserData);

  const logout = ()=>{
    localStorage.removeItem("token");
    navigate('/login')
    userDatas.setToken("")
  }


  // =============================modal code==========================

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImageName("")
    setUploadedFileName("")
  } 

  // ==============image previw in upload===========
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState();
  const [imageType, setImageType] = useState();
  
  const upload = (e) => {
    setUploadedFileName(e.target.files[0].name);
    const file = e.target.files[0];
    setImageName(file.name)
    setImageType(file.name.split(".")[1])

    if (file) {
      // Create a URL for the image preview
      const objectURL = URL.createObjectURL(file);
      setImagePreview(objectURL);
    }
  };

  return (
    <>
    <ToastContainer></ToastContainer>
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
            <span><div className='flex items-center cursor-pointer'> <SearchOutlinedIcon sx={{fontSize:"35px", marginRight:"0.5rem"}} /> Search </div></span>
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
              <div className="flex items-center cursor-pointer" onClick={handleOpen}>
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="text-center">
              Create New Post
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form className="border-4 border-gray-500 border-dashed rounded-md bg-slate-300 h-[200px] mb-5 relative">
              <input type="file" name="file" id="file" className="w-full h-full opacity-0" 
                onChange={(e) => {
                    upload(e);  
                  }}
               />
               <p className="absolute top-[50%] left-[50%] translate-x-[-50%] trnaslate-y-[-50%]">{
                imageName?imageName:"Select And Drag A Image"
               }</p>
            </form>

            {uploadedFileName ? (
                  <img
                    src={imagePreview}
                    alt="uploadedImg"
                    width="300px"
                    height="300px"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    className="rounded-md block m-auto "
                  />
                ) : null}

          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;

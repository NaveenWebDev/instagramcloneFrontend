import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import VideoSettingsOutlinedIcon from "@mui/icons-material/VideoSettingsOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Avatar from "@mui/material/Avatar";
import profileImg from "../assets/profile.jpg";
import { GlobalUserData } from "../App";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Drawer from '@mui/material/Drawer';

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const apiUrl = process.env.REACT_APP_MAIN_URL;
  const userDatas = useContext(GlobalUserData);
  const navigate = useNavigate();
  const [description, setDescription] = useState("")
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState();
  const [imageType, setImageType] = useState();
  const [postImg, setPostImage] = useState();
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
    userDatas.setToken("");
  };

  useEffect(()=>{
    const fetchData = async()=>{

      await axios.get(`${apiUrl}/searchUser/userName=${searchQuery}`)
      .then((res)=>{
        setSearchResult(res?.data?.result)
        console.log(res.data.result)
      })
      .catch((err)=>{
        console.log(err.message)
      });
    };
      if (searchQuery) {
        fetchData();
      }
  },[searchQuery])

  // =============================modal code==========================

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height:"100%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    overflow:"auto"
  };

  const [opens, setOpens] = React.useState(false);
  const handleOpen = () => setOpens(true);
  const handleClose = () => {
    setOpens(false);
    setImageName("");
    setUploadedFileName("");
    setDescription("")
  };

  // ==============image previw in upload===========


  const upload = async (e) => {
    setUploadedFileName(e.target.files[0].name);
    const file = e.target.files[0];
    setPostImage(file)
    setImageName(file.name);
    setImageType(file.name.split(".")[1]);

    if (file) {
      // Create a URL for the image preview
      const objectURL = URL.createObjectURL(file);
      setImagePreview(objectURL);
    }
  };

  const uploadFile = async ()=>{
    const postPayload = {
      userId:userDatas?.userobject?.id,
      userName:userDatas?.userobject?.userName,
      imageFile:postImg,
      description,
      profileImg:userDatas?.userobject?.imageUrl
    }

    try{
      setLoader(true)
      await axios.post(`${apiUrl}/post`,
        postPayload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res)=>{
          toast.success("post upload successfully")
          handleClose()
          setLoader(false)
        })
    }catch(err){
      console.log(err.message)
    }
  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <nav className="border border-r-gray-300 h-screen px-7 ">
        <ul className="flex flex-col justify-between h-full pb-5">
          <img src="/logo.png" alt="logo" width="90%" className="pb-5 pt-10" />
          <li>
            <NavLink to="/">
              {" "}
              <div className="flex items-center">
                {" "}
                <HomeOutlinedIcon
                  sx={{ fontSize: "35px", marginRight: "0.5rem" }}
                />
                <span className="hidden md:block">Home</span>
              </div>
            </NavLink>
          </li>
          <li>
            <span>
              <div className="flex items-center cursor-pointer" >
                {" "}
                <SearchOutlinedIcon
                  sx={{ fontSize: "35px", marginRight: "0.5rem" }}
                  onClick={toggleDrawer(true)}
                />
                <span className="hidden md:block" onClick={toggleDrawer(true)} >Search</span>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                  <h2 className="mx-20 my-5 font-semibold text-3xl">Search</h2>

                  <TextField id="standard-basic" value={searchQuery} type="serach" label="Search" variant="standard" onChange={(e)=>setSearchQuery(e.target.value)} />

                  <hr />
                  
                  <div className="my-5">
                  
                  {
                    searchResult.map((val, ind)=>(
                  <div key={val?.id} onClick={()=>navigate(`/profile/${val?.id}`)} className="flex items-center gap-3 cursor-pointer border-b my-2 p-2">
                    <Avatar alt="Remy Sharp" src={val?.imageUrl} />
                     <div>
                        <p>{val?.userName}</p>
                        <p>{val?.fullName}</p>
                      </div>
                    </div>
                    ))
                  }
                  </div>

                </Drawer>

              </div>
            </span>
          </li>
          <li>
            <NavLink to="/explore">
              <div className="flex items-center">
                <ExploreOutlinedIcon
                  sx={{ fontSize: "35px", marginRight: "0.5rem" }}
                />{" "}
                <span className="hidden md:block">Explore</span>
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
                <span className="hidden md:block">Reels</span>
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
                <span className="hidden md:block">Messsages</span>
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
                <span className="hidden md:block">Notification</span>
              </div>
            </NavLink>
          </li>
          <li>
            <span>
              <div
                className="flex items-center cursor-pointer"
                onClick={handleOpen}
              >
                {" "}
                <AddBoxOutlinedIcon
                  sx={{ fontSize: "35px", marginRight: "0.5rem" }}
                />{" "}
                <span className="hidden md:block">Create Post</span>
              </div>
            </span>
          </li>
          <li>
            <span>
              <div className="flex items-center cursor-pointer">
                <Link to={`/profile/${userDatas?.userobject?.id}`} className="flex items-center">
                <Avatar
                  src={userDatas?.userobject?.imageUrl}
                  sx={{ width: 33, height: 33, marginRight: "0.5rem" }}
                />
                  <span className="hidden md:block">Profile</span>
                </Link>
              </div>
            </span>
          </li>
          <li className="relative" onClick={() => setIsHidden((prev) => !prev)}>
            <span>
              <div className="flex items-center cursor-pointer">
                <MenuOutlinedIcon
                  sx={{ fontSize: "35px", marginRight: "0.5rem" }}
                />
                <span className="hidden md:block">More</span>
              </div>
            </span>
            <div
              className={`absolute border shadow-2xl bg-white w-full top-[-200%] p-2 rounded-md ${
                isHidden ? "block" : "hidden"
              } `}
            >
              <button
                className="border rounded-md border-blue-950 w-full hover:bg-[silver] transition-[all 0.5s] duration-700 py-3"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>

      <Modal
        open={opens}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="text-center font-semibold">Create New Post</div>
          </Typography>
        <TextField
          id="outlined-textarea"
          label="Description"
          placeholder="enter your description"
          sx={{width:"100%"}}
          onChange={(e)=>setDescription(e.target.value)}
          multiline
        />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form className="border-4 border-gray-500 border-dashed rounded-md bg-slate-300 h-[200px] mb-5 relative overflow-auto">
              <input
                type="file"
                name="file"
                id="file"
                className="w-full h-full opacity-0 overflow-auto"
                onChange={(e) => {
                  upload(e);
                }}
              />
              <p className="absolute top-[50%] left-[50%] translate-x-[-50%] trnaslate-y-[-50%] ">
                {imageName ? imageName : "Select And Drag A Image"}
              </p>
            </form>

            {uploadedFileName && (
              <img
                src={imagePreview}
                alt="uploadedImg"
                width="300px"
                height="300px"
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="rounded-md block m-auto "
              />
            )}
          </Typography>
          <div className="flex justify-end" >
          <Button variant="contained" endIcon={<SendIcon />} onClick={()=>uploadFile()}>
          {
            loader? 
        <CircularProgress sx={{color:"white",margin:"0 0.5rem", height:"5px",}}/>
            :
            "Send" 
          }
      </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;

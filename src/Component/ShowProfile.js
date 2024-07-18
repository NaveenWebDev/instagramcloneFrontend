import React, { useContext } from "react";
import moment from "moment";
import {addElipsis} from "add-ellipses";
import Avatar from '@mui/material/Avatar';
import { GlobalUserData } from "../App";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import { toast } from "react-toastify";

const ShowProfile = ({postId, profileImg, userName, name_time, button , comment, getPostData }) => {
  const { userobject } = useContext(GlobalUserData);
  const apiUrl = process.env.REACT_APP_MAIN_URL;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePost = async ()=>(
    await axios.delete(`${apiUrl}/deletePost/postId=${postId}`)
      .then((res)=>{
        getPostData();
        toast.success("post deleted successfully")
      })
      .catch((err)=>{
        console.log(err.message)
      })
  )
    
  return (
    <>
      <div className="profile flex justify-between items-center">
        <div className="flex items-center">
          <div className=" border border-black rounded-full my-1">
            <Avatar
              src={profileImg}
              alt="profileImg"
              width="100%"
              height="100%"
              className=" object-center object-cover"
            />
          </div>
          <div className="mx-2">
            <p className="font-semibold text-sm">{userName}</p>
              {
                comment && <p>{ addElipsis(comment) }</p>
              } 
                
            <p className="text-gray-500 text-base">
              {moment(name_time).fromNow()}
            </p>
          </div>
        </div>
        <button onClick={handleClick} className="text-blue-500 text-sm cursor-pointer">{userobject?.userName == userName ?  button : null}
        </button>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={ ()=> {handleClose(); deletePost()}}>Delete</MenuItem>
      </Menu>
      </div>
    </>
  );
};

export default ShowProfile;

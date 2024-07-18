import React, { useContext } from "react";
import moment from "moment";
import Avatar from '@mui/material/Avatar';
import { GlobalUserData } from "../App";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import Swal from "sweetalert2"

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

  const deletePost = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${apiUrl}/deletePost/postId=${postId}`);
          getPostData();
          Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted.",
            icon: "success"
          });
        } catch (err) {
          console.error(err.message);
        }
      }
    });
  };
  
    
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
                comment && <p>{comment}</p>
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
        <MenuItem onClick={ ()=> {deletePost(); handleClose() }}>Delete</MenuItem>
      </Menu>
      </div>
    </>
  );
};

export default ShowProfile;

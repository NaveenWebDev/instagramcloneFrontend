import React from "react";
import moment from "moment";
import {addElipsis} from "add-ellipses";
import Avatar from '@mui/material/Avatar';

const ShowProfile = ({ profileImg, userName, name_time, button , comment }) => {
  return (
    <>
      <div className="profile flex justify-between items-center">
        <div className="flex items-center">
          <div className=" border border-black rounded-full">
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
        <p className="text-blue-500 text-sm cursor-pointer">{button}</p>
      </div>
    </>
  );
};

export default ShowProfile;

import React from "react";
import moment from "moment";

const ShowProfile = ({ profileImg, userName, name_time, button }) => {
  return (
    <>
      <div className="profile flex justify-between items-center">
        <div className="flex">
          <div className="w-[50px] h-[50px] border border-black rounded-full">
            <img
              src={profileImg}
              alt="profileImg"
              width="100%"
              height="100%"
              className="w-[50px] h-[50px] rounded-full object-center object-cover"
            />
          </div>
          <div className="mx-2">
            <p className="font-semibold text-sm">{userName}</p>

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

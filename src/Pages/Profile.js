import React, {useContext, useEffect, useState} from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import {GlobalUserData} from "../App"
import axios from "axios";
import {Puff} from "react-loader-spinner";

const Profile = () => {

  const apiUrl = process.env.REACT_APP_MAIN_URL;
  const userDatas = useContext(GlobalUserData);
  const [updateImgUrl, setUpdateImgUrl] = useState("")
  const [loader, setLoader] = useState(false)
  const [userProfileId, setUserProfileId] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  
  // console.log(userDatas.userobject)
  useEffect(()=>{
    setUserProfileId(userDatas.userobject.id);
  },[])
  
  const getPostsByPostId = async ()=>{
      await axios(`${apiUrl}/getPostsByPostId/userId=${userProfileId}`)
        .then((res)=>{
          setUserPosts(res?.data?.result)
        })
        .catch((err)=>{
          console.log(err.message)
        })
  }
  
  useEffect(() => {
    getPostsByPostId()
  }, [userProfileId])
  
  // ==================update profile data api ===================

  const updateProfile = async (e)=>{
    // console.log(e.target.files[0])

    const profilePayload ={
      userId:userProfileId,
      imageFile:e.target.files[0]
    }

    try{
      setLoader(true)
      await axios.post(`${apiUrl}/imageupload`, profilePayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res)=>{
          console.log("image uploaded successfully")
          getupdatedProfile()
          setLoader(false)
        })
        .catch((err)=>{
          console.log(err.message)
        })
    }catch(err){
      console.log(err.message);
    }


  }

  // ================== getupdated profile data api ===================

  const getupdatedProfile = async ()=>{
    try{
      setLoader(true)
      await axios(`${apiUrl}/getProfileData/${userProfileId}`)
      .then((res)=>{
        setUpdateImgUrl(res?.data?.result?.imageUrl)
      })
      .catch((err)=>{
        console.log(err.message)
      })
      setLoader(false)
    }catch(err){
      console.log(err.message)
    }
  }

  useEffect(()=>{
    getupdatedProfile()
  },[updateImgUrl])


  return (
    <>
      <div className="max-w-[900px] w-[90%] m-auto pb-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="h-[200px] rounded-full w-[200px] cursor-pointer hover:shadow-md relative">
            <input type="file" name="file" id="file" className="h-[200px] rounded-full w-[200px] opacity-0 cursor-pointer absolute border border-red-700" onChange={(e)=>updateProfile(e)} />
            {
              loader?(
                <Puff 
              height="200"
              width="200"
              color="silver"
            />
              ):(
                <img
              src={ updateImgUrl}
              alt="profileImg"
              className="object-cover object-center rounded-full h-[200px] w-[200px]"
            />
              )
            }
          </div>
          <div className="p-10 w-[70%]">
            <div className="flex items-center gap-5">
              <p className="font-medium text-[1.2rem]">naveensharma8266</p>
              <button className="bg-slate-300 rounded-md font-semibold px-3 py-2">
                Edit Profile
              </button>
            </div>

            <div className="mt-5">
              <span className="me-2">
                {" "}
                <span className="font-medium">5</span> posts
              </span>
              <span className="mx-2">
                {" "}
                <span className="font-medium">50M</span> followers
              </span>
              <span className="mx-2">
                {" "}
                <span className="font-medium">10</span> following
              </span>
            </div>

            <div>
              <p className="font-medium my-2">Naveen Sharma</p>
              <p className="h-[100px] overflow-auto text-gray-400">
                Description Lorem ipsum dolor sit amet consectetur adipisicing
                elit.
              </p>
            </div>
          </div>
        </div>

        {/* =====================post section================= */}

        <div className="border-t">
          <div className="flex justify-center my-5">
            <p className="uppercase font-medium flex items-center">
              {" "}
              <PostAddIcon /> Posts
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-1">

            {
              userPosts?.map((val, ind)=>(
                <div key={ind} className="w-[295px] h-[295px] relative profileimg">
              <img
                src={val.imageUrl}
                alt="myPosts"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute left-0 top-0 bg-[#00000093] h-full w-0 overflow-hidden">
                <div className="flex gap-2 justify-center">
                  <span className="font-medium text-white"><FavoriteIcon /> 500M</span>
                  <span className="font-medium text-white"><CommentIcon /> 10M</span>
                </div>
              </div>
            </div>
              ))
            }

            


          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

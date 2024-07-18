import React, { useContext, useEffect, useState } from 'react'
import ShowProfile from '../Component/ShowProfile'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios'
import {GlobalUserData} from "../App"
import { toast } from 'react-toastify';
import Picker from 'emoji-picker-react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Post = ({setPostRender, getPostData, postId, postImg, profileImg, desc, userName, createdAt, commentCount, userId}) => {

    const [showMore, setShowMore] = useState(false)
    const [like, setLike] = useState(false)
    const [likeCount, setLikeCount] = useState()
    const [comment, setComment] = useState("")
    const [allComment, setAllComment] = useState([])
    const {userobject} = useContext(GlobalUserData);
    const [showPicker, setShowPicker] = useState(false);
    const [open, setOpen] = React.useState(false);
    const apiUrl = process.env.REACT_APP_MAIN_URL;
    const navigate = useNavigate();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const addLike = async ()=>{
      const payload = {
        postId,
        userId:userobject?.id,
        userName:userobject?.userName
      }
      await axios.post(`${apiUrl}/postLikes`, payload)
        .then((res)=>{
          getLikeCount()
          
        })
        .catch((err)=>{
          console.log(err.message)
        })

    }

    const getLikeCount = async()=>{

      await axios.get(`${apiUrl}/getLikesCount/${postId}/userId/${userobject?.id}`)
        .then((res)=>{
          setLikeCount(res?.data?.result)
            if(res?.data?.likedResult.length !== 0){
              setLike(true)
            }
        })
    }
    const deletePostLike = async()=>{

      await axios.delete(`${apiUrl}/deletePostLike/${postId}/userId/${userobject?.id}`)
        .then((res)=>{
            if(res?.data?.result){
              setLike(false)
            }
        })
    }

    useEffect(()=>{
      getLikeCount()
    },[likeCount, like])

    const onEmojiClick = (emojiObject, event) => {
      setComment(prevComment => prevComment + emojiObject?.emoji);
      console.log(emojiObject)
      setShowPicker(false);
    };

    const addComment = async()=>{

      const payload = {
        postId,
        userId:userobject?.id,
        comment,
        profileImg:userobject?.imageUrl,
        userName:userobject?.userName
      }

      await axios.post(`${apiUrl}/addComment`, payload)
        .then((res)=>{
          toast.success("comment add successfully")
          setPostRender(res)
          setComment("")
        })

    }
    const getComment = async(myPostId)=>{

      await axios.get(`${apiUrl}/getComment/postId/${myPostId}`)
        .then((res)=>{
          setAllComment(res?.data?.result)
        })

    }


  return (
    <>
        <div className='w-[70%] m-auto flex flex-col my-[2rem] shadow-2xl p-3'>
            <div className='h-[20%]' >
              <ShowProfile getPostData={getPostData} onClick={()=>navigate(`/profile/${userId}`)} postId={postId} profileImg={profileImg}  userName={userName} name_time={createdAt} button={<button  className='text-4xl pb-6'>...</button>} />
            </div>
            {/* =====post image==== */}
          <div className='h-[90%]'>
            <img src={postImg} alt="" className="h-full w-full object-cover object-center" />
          </div>  
          {/* ========post btn ====== */}

          <div className='flex justify-between mt-3'>
            <div>
            <span className='me-3'> 
              {
                like?
                <FavoriteIcon onClick={deletePostLike} className="cursor-pointer" sx={{fontSize:"30px", color:"red"}}  /> 
                : 
                <FavoriteBorderOutlinedIcon className="cursor-pointer" sx={{fontSize:"30px"}} onClick={()=>addLike()} />

              }
                
            </span>
            <span className='me-3'> 
                <ModeCommentOutlinedIcon onClick={ ()=> {handleClickOpen(); getComment(postId)}} className="cursor-pointer" sx={{fontSize:"30px"}}/>
            </span>
            <span className='cursor-pointer'> 
                <SendOutlinedIcon sx={{fontSize:"30px"}}/>
            </span>
            </div>

            <div>
                <BookmarkBorderOutlinedIcon sx={{fontSize:"30px", cursor:"pointer"}}/>
            </div>
          </div>

          {/* ============likes=============== */}

          <div className="likes font-semibold">
            {likeCount} likes
          </div>

          {/* ============useName and Description============== */}

          <div>
            <div className={` ${showMore?null:'flex'} `}>
            <span className={` ${showMore? null : 'text-ellipsis whitespace-nowrap'} overflow-hidden inline-block w-[100%]`}> <span className='font-semibold me-2'>{userName}</span> {desc}</span>
           
            <span className='text-blue-500 cursor-pointer' onClick={()=>setShowMore(prev=>!showMore)} > {showMore? 'less' :'more'} </span>
            </div>
          </div>

          {/* ============================comments============== */}

          <div>
            <div onClick={ ()=> {handleClickOpen(); getComment(postId)}} className='text-gray-400 text-[0.90rem] cursor-pointer '>View All {commentCount} Comments</div>
            <div className='flex content-center relative'>
                <div className='relative w-full'>
                    <div>
                    <TextField id="standard-basic" value={comment} label="Add A Comments" variant="standard" sx={{width:"100%"}} onChange={(e)=>setComment(e.target.value)} />
                    </div>
                    <span className='mt-2 cursor-pointer absolute right-0 top-0 pe-1'>
                        <EmojiEmotionsIcon  onClick={() => setShowPicker(!showPicker)} sx={{color:"#666666"}}/>
                    </span>
                </div>
                {showPicker && <Picker style={{position:"absolute", top:"-950%", right:"0%"}} onEmojiClick={onEmojiClick} />}

                <Button onClick={addComment} variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>

            </div>
          </div>

        </div>
        <Dialog
        open={open}
        TransitionComponent={Transition}
        // keepMounted
        // maxWidth=""
        onClose={handleClose}
        // aria-describedby="alert-dialog-slide-description"
      >
              <div className='flex gap-2 justify-between items-center'>
                <div className='w-[50%] h-full border'>
                  <img src={postImg} alt="postImage" />
                </div>
                <div className='w-[50%] max-h-[400px] overflow-auto flex flex-col gap-3'>

                  <>
                  {
                    allComment.map((val, ind)=>(
                      <div>
                        
                  <ShowProfile key={ind} profileImg={val?.profileImg} comment={val?.comment} name_time={val?.createdAt} userName={val?.userName}/>
                      <hr />
                      </div>
                    ))
                  }
                  </>


                </div>
              </div>
      </Dialog>
    </>
  )
}

export default Post
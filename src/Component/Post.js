import React, { useState } from 'react'
import profileImg from "../assets/profile.jpg"
import ShowProfile from '../Component/ShowProfile'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const Post = ({postImg, desc, userName, createdAt}) => {

    const [showMore, setShowMore] = useState(false)

  return (
    <>
        <div className='w-[70%] m-auto flex flex-col my-[2rem] shadow-2xl p-3'>
            <div className='h-[20%]'>
              <ShowProfile profileImg={profileImg}  userName={userName} name_time={createdAt} button={<button  className='text-4xl pb-6'>...</button>} />
            </div>
            {/* =====post image==== */}
          <div className='h-[90%]'>
            <img src={postImg} alt="" className="h-full w-full object-cover object-center" / >
          </div>  
          {/* ========post btn ====== */}

          <div className='flex justify-between mt-3'>
            <div>
            <span className='me-3'> 
                <FavoriteBorderOutlinedIcon sx={{fontSize:"30px"}}/>
            </span>
            <span className='me-3'> 
                <ModeCommentOutlinedIcon sx={{fontSize:"30px"}}/>
            </span>
            <span > 
                <SendOutlinedIcon sx={{fontSize:"30px"}}/>
            </span>
            </div>

            <div>
                <BookmarkBorderOutlinedIcon sx={{fontSize:"30px"}}/>
            </div>
          </div>

          {/* ============likes=============== */}

          <div className="likes font-semibold">
            45681 likes
          </div>

          {/* ============useName and Description============== */}

          <div>
            <div className={` ${showMore?null:'flex'} `}>
            <span className={` ${showMore? null : 'text-ellipsis whitespace-nowrap'} overflow-hidden inline-block w-[100%]`}> <span className='font-semibold me-2'>NaveenSharma8266</span> {desc}</span>
           
            <span className='text-blue-500 cursor-pointer' onClick={()=>setShowMore(prev=>!showMore)} > {showMore? 'less' :'more'} </span>
            </div>
          </div>

          {/* ============================comments============== */}

          <div>
            <div className='text-gray-400 text-[0.90rem] cursor-pointer '>View All Comments</div>
            <div className='flex content-center'>
                <div className='relative w-full'>
                    <div>
                    <TextField id="standard-basic" label="Add A Comments" variant="standard" sx={{width:"100%"}} />
                    </div>
                    <span className='mt-2 cursor-pointer absolute right-0 top-0 pe-1'>
                        <EmojiEmotionsIcon sx={{color:"#666666"}}/>
                    </span>
                </div>

                <Button variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>

            </div>
          </div>

        </div>
    </>
  )
}

export default Post
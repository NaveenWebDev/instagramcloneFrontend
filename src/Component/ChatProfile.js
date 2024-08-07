import React from 'react'
import Avatar from '@mui/material/Avatar';

const ChatProfile = ( {id, imageUrl, userName, setCurrentChatUserData, recentMessage, setChatPhone} ) => {
  return (
    <>
        <div 
        className=' hover:bg-slate-200 cursor-pointer'
        onClick={()=>{setCurrentChatUserData(id); setChatPhone(true)}}
        >
            <div className='p-3 flex items-center'>
                <div className='w-[20]'>
                <Avatar alt="Remy Sharp" src={imageUrl} />
                </div>
                <div className='w-[80] px-3'>
                    <p className='font-medium'>{userName}</p>
                    <p className='text-gray-400'>{recentMessage}</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default ChatProfile
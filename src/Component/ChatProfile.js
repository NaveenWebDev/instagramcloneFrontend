import React from 'react'
import Avatar from '@mui/material/Avatar';

const ChatProfile = ( {id, imageUrl, userName, setCurrentChatUserData} ) => {
  return (
    <>
        <div 
        className=' hover:bg-slate-200 cursor-pointer'
        onClick={()=>setCurrentChatUserData(id)}
        >
            <div className='p-3 flex items-center'>
                <div className='w-[20]'>
                <Avatar alt="Remy Sharp" src={imageUrl} />
                </div>
                <div className='w-[80] px-3'>
                    <p className='font-medium'>{userName}</p>
                    <p className='text-gray-400'>recent message aya</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default ChatProfile
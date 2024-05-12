import React from 'react'
import Avatar from '@mui/material/Avatar';

const ChatProfile = () => {
  return (
    <>
        <div className=' hover:bg-slate-200 cursor-pointer
        '>
            <div className='p-3 flex items-center'>
                <div className='w-[20]'>
                <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkDuqW-0f9N9UQsl5qGY0N54C1Qtj3Mtne5w&usqp=CAU" />
                </div>
                <div className='w-[80] px-3'>
                    <p className='font-medium'>username</p>
                    <p>recent message aya hua hai</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default ChatProfile
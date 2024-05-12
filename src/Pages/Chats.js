import React from 'react'
import ChatProfile from '../Component/ChatProfile'
import MessageIcon from '@mui/icons-material/Message';

const Chats = () => {
  return (
    <>
    {/* <div className='relative border border-red-800 h-screen'> */}
    <div className='h-screen fixed left-[23%] max-w-[1050px] w-[100%]'>
        <div className='flex'>
            <div className='w-[30%] border h-screen'>
                <p className="font-bold text-3xl text-center p-5">naveenSharma8266</p>
                
                <ChatProfile/>
                <ChatProfile/>
                <ChatProfile/>
                <ChatProfile/>
                <ChatProfile/>
            </div>
            <div className='w-[70%] p-5 h-screen'>

                <div className="h-full flex justify-center flex-col items-center font-black text-3xl ">
                <MessageIcon sx={{height:"150px", width:"150px"}} />
                    <p>
                    Send Your Message With Your Friends
                    </p>
                </div>
                
            </div>
        </div>
    </div>
    {/* </div> */}
    </>
  )
}

export default Chats
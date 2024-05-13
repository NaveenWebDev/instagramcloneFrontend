import React, { useContext, useEffect, useState } from 'react'
import ChatProfile from '../Component/ChatProfile'
import MessageIcon from '@mui/icons-material/Message';
import axios from 'axios';
import { GlobalUserData } from '../App';

const Chats = () => {

    const apiUrl = process.env.REACT_APP_MAIN_URL;
    const userDatas = useContext(GlobalUserData);

    const [chatUserData, setChatUserData] = useState([])
    const [currentChatUserId, setCurrentChatUserData] = useState()

    console.log(currentChatUserId)
    
    const getChatUser = async ()=>{
        axios.get(`${apiUrl}/getUserDataForChat`)
            .then((res)=>{
                setChatUserData(res?.data?.result?.userDta);
            })
            .catch((err)=>{
                console.log(err.message)
            })
    }
    console.log(chatUserData)

    useEffect(()=>{
        getChatUser()
    },[])

  return (
    <>
    {/* <div className='relative border border-red-800 h-screen'> */}
    <div className='h-screen fixed left-[23%] max-w-[1050px] w-[100%]'>
        <div className='flex'>
            <div className='w-[30%] border h-screen'>
                <p className="font-bold text-3xl text-center p-5">naveenSharma8266</p>
                {
                    chatUserData.map((user, ind)=>(
                        <ChatProfile id={user?.id} imageUrl={user?.imageUrl} userName={user?.userName} setCurrentChatUserData={setCurrentChatUserData} />
                    ))
                }
            </div>
            <div className='w-[70%] h-screen'>
                {
                    !currentChatUserId?
                <div className="h-full flex justify-center flex-col items-center font-black text-3xl ">
                <MessageIcon sx={{height:"150px", width:"150px"}} />
                    <p>
                    Send Your Message With Your Friends
                    </p>
                </div>
                :
                <div className="border h-full">
                    
                    <form>
                        <input type="text" placeholder='enter your message' name="" id="text" className='border p-2' />
                    </form>
                </div>
                }

            </div>
        </div>
    </div>
    {/* </div> */}
    </>
  )
}

export default Chats
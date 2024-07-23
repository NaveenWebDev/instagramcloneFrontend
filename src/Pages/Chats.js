import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import ChatProfile from "../Component/ChatProfile";
import MessageIcon from "@mui/icons-material/Message";
import axios from "axios";
import { GlobalUserData } from "../App";
import { toast } from "react-toastify";
import {io} from "socket.io-client";
 
const Chats = () => {
  const apiUrl = process.env.REACT_APP_MAIN_URL;
  const { userobject } = useContext(GlobalUserData);

  const [chatUserData, setChatUserData] = useState([]);
  const [currentChatUserId, setCurrentChatUserData] = useState(null);
  const [UserDataForChatById, setUserDataForChatById] = useState([]);
  const [receiverId, setReceiverId] = useState();
  const [chat, setChat] = useState("");
  const [chatData, setChatData] = useState();
  const [socketData, setSocketData] = useState("")
  const chatEndRef = useRef(null);
  const [chatPhone, setChatPhone] = useState(false)

  const socket = useMemo(() => io(`https://instagramclonebackend-bd3d.onrender.com`), [])


  // jinke saat chat hoga ye wo api hai 
  const getChatUser = async () => {
    axios
      .get(`${apiUrl}/getUserDataForChat`)
      .then((res) => {
        setChatUserData(res?.data?.result?.userDta || []);
      })
      .catch((err) => {
        console.log(err.message);
        console.log("getChatUser me erro hai")
      });
  };

  const getChatUserById = async (userId) => {
    if(!userId) return;
    try {
      console.log("user id id is = ", userId)
      const res = await axios.get(`${apiUrl}/getUserDataForChatById/${userId}`);
      setUserDataForChatById(res?.data?.result || []);
      if (res.data.result.length > 0) {
        setReceiverId(res.data.result[0].id);
      }
    } catch (err) {
      console.log(err.message);
      console.log("getChatUserById me error hai");
    }
  };

  // =========================send chat ========================

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendChat = async (e) => {
    try {
      if (e.key == "Enter") {
        let payload = {
          userId: userobject.id,
          chat,
          receiverId,
        };
        const sendChats = await axios
          .post(`${apiUrl}/createChat`, payload)
          .then((res) => {
            socket.emit("message", chat)
            setChat("");
            receiveChat();
          })
          .catch((err) => {
            console.log(err.message);
            console.log("send chat me erro hai")
            toast.error("all fields are required");
          });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(()=>{
    scrollToBottom()
  },[chat, socketData, chatData])

  const receiveChat = async () => {
    await axios(
      `${apiUrl}/chat/userId/${userobject.id}/receiverId/${receiverId}`
    )
      .then((res) => {
        setChatData(res?.data.result);
      })
      .catch((err) => {
        console.log(err.message);
        console.log("receive chat me error hai")
      });
  };

  useEffect(() => {
    getChatUserById(currentChatUserId);
    // setTimeout(() => {
        // updateHeight();
        receiveChat();
      // }, 100);
  }, [currentChatUserId, receiverId]);

  useEffect(() => {
    getChatUser();
  }, []);

  useEffect(() => {
    socket.on("message",(data) => {
      // console.log(data);
      // await getChatUserById(currentChatUserId);
      // await getChatUser();
      setSocketData(data)
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
      receiveChat();
  }, [socketData])
  

  return (
    <>
      <div className="h-screen fixed left-[23%] max-w-[1050px] -z-10 w-[100%]">
        <div className="flex">
          <div className={`m:w-[30%] border h-screen shrink-0 ${chatPhone?"hidden":"block"} md:block`}>
            <p className="font-bold text-2xl text-center p-5">
              {
                userobject?.userName
              }
            </p>
            {chatUserData.map((user, ind) => (
              user?.id === userobject.id? null :
              <ChatProfile
                id={user?.id}
                imageUrl={user?.imageUrl}
                userName={user?.userName}
                setCurrentChatUserData={setCurrentChatUserData}
                recentMessage={"recent message aya"}
                setChatPhone={setChatPhone}
              />
            ))}
          </div>
          <div className={`lg:w-[100%] min-w-[300px] w-[300px] h-screen relative p-2 bg-slate-100 ${chatPhone?"block":"hidden"} `}>
            {!currentChatUserId ? (
              <div className="h-full flex justify-center flex-col items-center font-black text-3xl ">
                <MessageIcon sx={{ height: "150px", width: "150px" }} />
                <p className="text-center"> Send Your Message With Your Friends</p>
              </div>
            ) : (
              <div className="h-full w-full relative flex bg-slate-300 flex-col justify-between">
                <div className="border-b border-b-gray-500">
                  {UserDataForChatById.map((val, ind) => (
                    <ChatProfile
                      key={ind}
                      id={val?.id}
                      userName={val?.userName}
                      imageUrl={val?.imageUrl}
                      recentMessage={"active now"}
                    />
                  ))}
                </div>
                {/* ////////////////chats///////////////////////// */}

                <div className="h-full flex flex-col p-5 gap-3 overflow-auto bg-slate-100">
                  {chatData?.length > 0 ? ( 
                    chatData.map((val, ind) => (
                      <span
                        key={ind}
                        className={`bg-slate-300 rounded-lg inline-block w-fit max-w-[60%] p-2 ${
                          val.userId == userobject.id ? "self-end bg-cyan-400" : null
                        } `}
                      >
                        {val?.chat}
                      <div ref={chatEndRef} />
                      </span>
                    ))
                  ) : (
                    <span>No messages yet</span> // Display a message when chatData is empty
                  )}
                </div>

                <input
                  type="text"
                  placeholder="enter your message"
                  required
                  id="text"
                  className=" border border-gray-500 p-2 inline-block w-full"
                  onChange={(e) => setChat(e.target.value)}
                  value={chat}
                  onKeyDown={(e) => sendChat(e)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Chats;

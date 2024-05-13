import React, { useContext, useEffect, useState } from "react";
import ChatProfile from "../Component/ChatProfile";
import MessageIcon from "@mui/icons-material/Message";
import axios from "axios";
import { GlobalUserData } from "../App";
import { toast } from "react-toastify";

const Chats = () => {
  const apiUrl = process.env.REACT_APP_MAIN_URL;
  const { userobject } = useContext(GlobalUserData);

  const [chatUserData, setChatUserData] = useState([]);
  const [currentChatUserId, setCurrentChatUserData] = useState();
  const [UserDataForChatById, setUserDataForChatById] = useState([]);
  const [receiverId, setReceiverId] = useState();
  const [chat, setChat] = useState();
  const [chatData, setChatData] = useState();

  const getChatUser = async () => {
    axios
      .get(`${apiUrl}/getUserDataForChat`)
      .then((res) => {
        setChatUserData(res?.data?.result?.userDta);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getChatUserById = async () => {
    axios
      .get(`${apiUrl}/getUserDataForChatById/${currentChatUserId}`)
      .then((res) => {
        setUserDataForChatById(res?.data?.result);
        setReceiverId(res.data.result[0].id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // =========================send chat ========================

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
            setChat("");
            receiveChat();
          })
          .catch((err) => {
            console.log(err.message);
            toast.error("all fields are required");
          });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const receiveChat = async () => {
    await axios(
      `${apiUrl}/chat/userId/${userobject.id}/receiverId/${receiverId}`
    )
      .then((res) => {
        setChatData(res.data.result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  console.log(chatData);

  useEffect(() => {
    getChatUserById();
    setTimeout(() => {
        // updateHeight();
        receiveChat();
      }, 100);

  }, [currentChatUserId, receiverId]);
  // console.log(receiverId)

  useEffect(() => {
    getChatUser();
  }, []);

  return (
    <>
      {/* <div className='relative border border-red-800 h-screen'> */}
      <div className="h-screen fixed left-[23%] max-w-[1050px] w-[100%]">
        <div className="flex">
          <div className="w-[30%] border h-screen">
            <p className="font-bold text-3xl text-center p-5">
              naveenSharma8266
            </p>
            {chatUserData.map((user, ind) => (
              <ChatProfile
                id={user?.id}
                imageUrl={user?.imageUrl}
                userName={user?.userName}
                setCurrentChatUserData={setCurrentChatUserData}
                recentMessage={"recent message aya"}
              />
            ))}
          </div>
          <div className="w-[70%] h-screen relative p-2">
            {!currentChatUserId ? (
              <div className="h-full flex justify-center flex-col items-center font-black text-3xl ">
                <MessageIcon sx={{ height: "150px", width: "150px" }} />
                <p>Send Your Message With Your Friends</p>
              </div>
            ) : (
              <div className="h-full w-full relative flex flex-col justify-between">
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

                <div className="h-full flex flex-col p-5 gap-3 overflow-auto">
                  {/* <span>hoo jaa</span> */}
                  {chatData?.length > 0 ? ( // Check if chatData has elements
                    chatData.map((val, ind) => (
                      <span
                        key={ind}
                        className={`bg-slate-300 rounded-lg inline-block w-fit max-w-[60%] p-1 ${
                          val.userId == userobject.id ? "self-end" : null
                        } `}
                      >
                        {val?.chat}
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
                  className=" rounded-2xl border border-gray-500 p-2 inline-block w-full"
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

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { FaCamera, FaEllipsisH, FaMicrophone, FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import MessageProfile from "../MessageProfile/MessageProfile";
import { IoMdSend } from "react-icons/io";
import { HiGif } from "react-icons/hi2";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import { format } from "timeago.js";
import "./messages.css";
import { io } from "socket.io-client";
import { useRef } from "react";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { HiOutlineArchive } from "react-icons/hi";
import Loading from "../../../Shared/Loading/Loading";

const Message = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [client, setClient] = useState();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setsendMessage] = useState(null);
  const [recevieMessage, setRecevieMessage] = useState(null);
  const scroll = useRef();
  const [loading, setLoading] = useState(true);

  const socket = useRef();
  const currentChat = chats.filter((item) => item.members[1] === id);
  const creatorId = chats.filter((item) => item.members[0] === id);

  // Get Single Client ---------------
  useEffect(() => {
    const url = `https://aperio-server.vercel.app/api/v1/user/get-a-user/${id}`;
    axios(url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        // console.log(res?.data.data);
        setClient(res?.data?.data);
        setLoading(false);
        // setGender(res?.data?.data?.gender ? res?.data?.data?.gender : 'male');
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);
  // Send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // recevie Message form socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setRecevieMessage(data);
    });
  }, []);

  useEffect(() => {
    if (
      recevieMessage !== null &&
      recevieMessage.chatId === currentChat[0]?._id
    ) {
      setMessages([...messages, recevieMessage]);
    }
  }, [recevieMessage]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Get all chat--------
  useEffect(() => {
    const url = `https://aperio-server.vercel.app/api/v1/chat/${user?._id}`;
    axios(url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        setChats(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user._id]);

  // Get single client chat--------
  useEffect(() => {
    const url = `https://aperio-server.vercel.app/api/v1/message/${
      currentChat[0]?._id || creatorId[0]?._id
    }`;
    axios(url)
      .then((res) => {
        setMessages(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentChat[0]?._id || creatorId[0]?._id]);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const message = {
        senderId: user._id,
        text: newMessage,
        chatId: currentChat[0]?._id || creatorId[0]?._id,
      };
      const res = await axios.post(
        "https://aperio-server.vercel.app/api/v1/message",
        {
          senderId: user._id,
          text: newMessage,
          chatId: currentChat[0]?._id || creatorId[0]?._id,
        }
      );
      // Send message to socket server
      setsendMessage({ ...message, receiverId: id });
      if (res.data.status === "success") {
        setMessages([...messages, res.data.data]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className="relative w-3/4">
      <div className="flex fixed top-[74px] overflow-auto w-3/4">
        <div className="col-span-2 h-screen border w-2/3 pb-48">
          <div className="">
            {loading ? (
              <Loading />
            ) : (
              <div className="h-14 py-5 px-3 items-center flex justify-between">
                <h2 className="text-xl font-semibold">
                  {client?.firstName + " " + client?.lastName}
                </h2>
                <FaEllipsisH />
              </div>
            )}
            <hr />
          </div>

          {/* Message Section------ */}
          {loading ? (
            <Loading />
          ) : (
            <div className={`h-full flex justify-end items-end`}>
              {messages.length > 0 ? (
                <div className="chat-body w-full p-4 h-full overflow-y-scroll ">
                  {messages.map((message, i) => (
                    <div
                      key={i}
                      className="flex flex-col justify-between w-full"
                    >
                      <div
                        ref={scroll}
                        className={
                          message.senderId === user?._id
                            ? "message own"
                            : "message"
                        }
                      >
                        <span>{message.text} </span>
                      </div>
                      <span
                        className={`text-xs text-gray-400 flex ${
                          message.senderId === user?._id
                            ? "justify-end"
                            : "justify-start"
                        } mb-3`}
                      >
                        {format(message.createdAt)}{" "}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <span className="text-xl p-4">
                    Send message to start conversation{" "}
                  </span>
                </>
              )}
            </div>
          )}
          {/* Message Section--------- */}

          {/* Message Send Section--------- */}
          <div className="">
            <hr />
            <div className="flex gap-2 px-4 py-2">
              <div className="bg-slate-200 hover:bg-slate-300 rounded-sm cursor-pointer duration-500 h-7 w-7 p-1 flex justify-center items-center">
                <label htmlFor="upload-photo">
                  <FaCamera className="text-gray-400 hover:text-primary" />
                </label>
                <input
                  // onChange={handleImage}
                  type="file"
                  id="upload-photo"
                  className="px-3 py-3 border w-full rounded-md hidden"
                />
              </div>
              <div className="bg-slate-200 hover:bg-slate-300 rounded-sm cursor-pointer duration-500 h-7 w-7 p-1 flex justify-center items-center">
                <FaMicrophone className="text-gray-400 hover:text-primary" />
              </div>
              <div className="bg-slate-200 hover:bg-slate-300 rounded-sm cursor-pointer duration-500 h-7 w-7 p-1 flex justify-center items-center">
                <HiGif className="text-gray-400 hover:text-primary" />
              </div>

              <input
                type="text"
                placeholder="Type message here ...."
                className="w-full text-sm bg-slate-100 px-3 rounded-sm focus:outline-none"
                value={newMessage}
                onChange={handleInputChange}
              />
              <div className="bg-primary rounded-full p-2 flex justify-center items-center">
                <button onClick={handleSend}>
                  <IoMdSend className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Message Send Section--------- */}

        {/* Profile Section--------- */}
        <div className="w-1/3 relative mr-12">
          <div className="sticky top-0">
            <MessageProfile></MessageProfile>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

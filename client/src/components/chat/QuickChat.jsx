import "./QuickChat.scss";
import { SocketContext } from "../../context/SocketContext";
import { useContext, useEffect, useRef, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import useUniChat from '../../lib/chatInfo'

export default function QuickChat({ post }) {
  const { socket } = useContext(SocketContext);
  const [chat, setChat] = useState(null);
  const [msg, setMsg] = useState("");
  const ref = useRef(null);
  const navigate = useNavigate();
  const {uniChat,setUniChat} = useUniChat()
  const [chatStoreId,setChatStoreId] = useState(null)

  // Fetch the chat data when the component mounts or updates
  useEffect(() => {
    console.log("post", post.id);
    let user = JSON.parse(localStorage.getItem("user"));
    const fetchChat = async () => {
      console.log("receiver id" , post.id)
      console.log("sender id" , user.id)
      console.log(typeof(post.id) , typeof(user.id))
      console.log("initializaing chat", user);
      try {
        const res = await apiRequest.post(`/chats`, {
          userId: user.id,
          receiverId: post.userId,
        });
        console.log("CHAT FETCHED" , res)
        if(res.data.chatStoreId){
          let id = res.data.chatStoreId;
          setChatStoreId(id);
          setUniChat(id)
          console.log("chatStoreId",uniChat)
        }
        if(res.data.id){
          console.log(res.data)
          let id = res.data.id;
          setChatStoreId(id)
          setUniChat(id)
          console.log("chatStoreId",uniChat)
        }
      } catch (err) {
        console.error('API Request Error:', err.response ? err.response.data : err.message);
      }    
    };

    fetchChat();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (data) => {
        console.log(data)
        if (data.receiver === post.userId) {
          setChat((prevChat) => ({
            ...prevChat,
            messages: [...(prevChat?.messages || []), data],
          }));
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("getMessage");
      }
    };
  }, [socket, post.userId]);

  const handleSend = async () => {
    if (msg.trim() === "") return;

    const user = JSON.parse(localStorage.getItem("user"));

    console.log("chatStoreID is : " , chatStoreId)

    // Emit the message via socket
    console.log(post.userId)
    let container = {
      receiverId :   post.userId,
      data : msg
    }
    socket.emit("sendMessage", container);

    try {
      console.log(post);
      const res = await apiRequest.post(`/messages/${chatStoreId}`, {
        tokenUserId: user.id,
        chatId: user.id,
        text: msg,
      });
      console.log("res",res)
      // Assuming the response includes the updated chat
      setChat((prevChat) => ({
        ...prevChat,
        messages: [...(prevChat?.messages || []), res.data],
      }));
      // navigate(`/${chatStoreId}`);
      console.log(chat)
    } catch (err) {
      console.log(err);
    }

    setMsg("");
    if (ref.current) {
      ref.current.focus();
    }
  };

  return (
    <div className="chatform flex flex-col">
      <div className="chatUser mb-1">
        <div className="user">
          <img src={post.user.avatar} alt="" />
          <span>{post.user.username}</span>
        </div>
      </div>

      <div className="chats overflow-y-scroll">
        <div className="p-1 overflow-hidden overflow-y-scroll">
          {chat &&
            chat.messages.map((message, index) => (
              <div key={index} className="p-[0.5]">
                <p className="p-2 rounded-full px-5 bg-[#f6985a] w-fit max-w-[18vw]">
                  {message.text}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div className="chatInp">
        <input
          ref={ref}
          className=""
          onChange={(e) => setMsg(e.target.value)}
          type="text"
          value={msg}
          placeholder="Send quick hii"
          name="text"
        />
        <button onClick={handleSend}>SEND</button>
      </div>
    </div>
  );
}

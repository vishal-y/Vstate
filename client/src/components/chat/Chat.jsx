import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";
import { IoIosCloseCircleOutline } from "react-icons/io";


function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef();
  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest.get(`/chats/${id}`);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.error("Error opening chat:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      const res = await apiRequest.post(`/messages/${chat.id}`, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        if (chat) await apiRequest.put(`/chats/read/${chat.id}`);
      } catch (err) {
        console.error("Error marking chat as read:", err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <div className="shadow-md border lg:h-[48.6vh] overflow-y-scroll overflow-x-hidden border-[#f9cbbe] rounded-3xl pb-2 lg:pb-3 pl-3 pr-3 bg-[#fcf5f3]">
     <p className="p-2 font-bold bg-[#fcf5f3] z-[50] sticky w-[110%] top-0">Inbox</p>
     
        {chats?.map((c) => (
          <div
            className="border bg-white border-[#ffd2c6] p-2 rounded-2xl flex justify-start items-center gap-3 mb-2 lg:mb-0 lg:gap-5"
            key={c.id}
            // style={{
            //   backgroundColor:
            //     c.seenBy.includes(currentUser.id) || chat?.id === c.id
            //       ? "white"
            //       : "#fecd514e",
            // }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img className="ml-1 h-12 w-12 rounded-full" src={c.receiver.avatar || "noavatar.jpg"} alt="Receiver Avatar" />
           
           <div className="">
           <p className="text-balance lg:text-lg font-bold capitalize">{c.receiver.username}</p>
           <p className="">{c.lastMessage || "No message"}</p>
           </div>

          </div>
        ))}

      {chat && (
        // <div className="h-[85vh] w-[60vw] rounded-2xl p-4 absolute top-[14.2vh] left-[31.5vw] z-[1500] bg-[#fcf5f3]">
        //   <div className="">
        //     <div className="">
        //       <img className="h-12 w-12" src={chat.receiver.avatar || "noavatar.jpg"} alt="Receiver Avatar" />
        //       {chat.receiver.username}
        //     </div>
        //     <span className="close" onClick={() => setChat(null)}>
        //       X
        //     </span>
        //   </div>
        //   <div className="center">
        //     {chat.messages.map((message) => (
        //       <div
        //         className="chatMessage"
        //         style={{
        //           alignSelf:
        //             message.userId === currentUser.id
        //               ? "flex-end"
        //               : "flex-start",
        //           textAlign:
        //             message.userId === currentUser.id ? "right" : "left",
        //         }}
        //         key={message.id}
        //       >
        //         <p>{message.text}</p>
        //         <span>{format(message.createdAt)}</span>
        //       </div>
        //     ))}
        //     <div ref={messageEndRef}></div>
        //   </div>
        //   <form onSubmit={handleSubmit} className="bottom">
        //     <textarea name="text" placeholder="Type a message..."></textarea>
        //     <button type="submit">Send</button>
        //   </form>
        // </div>
        <div className="lg:h-[85vh] w-full h-full lg:w-[60vw] border border-[#ffd2c6] rounded-2xl fixed top-0 left-0 lg:absolute lg:top-[14.2vh] lg:left-[31.5vw] z-[1500] bg-[#fcf5f3]">
     
        <div className="border border-red-300 bg-[#f6985a] p-2 rounded-t-lg">
          <div className="flex justify-between items-center">
           <div className="flex justify-center items-center gap-3">
           <img className="h-12 w-12 rounded-full" src={chat.receiver.avatar ? chat.receiver.avatar : "/noavatar.jpg"} alt="" />
            <span className="text-lg font-bold">{chat.receiver.username}</span>
           </div>
           <div className="mr-5" onClick={() => setChat(null)}>
              <IoIosCloseCircleOutline className="hover:scale-[1.01] hover:bg-black rounded-full hover:text-orange-400" size={25}/>
            </div>
          </div>
        </div>
  
          <div className="h-[84.5%] lg:h-[81%] py-4 px-2">

          <div className="h-[100%] overflow-y-scroll">
          <div className="p-1 overflow-hidden overflow-y-scroll">
          {chat.messages.map((message) => (
              <div className={`${message.userId === currentUser.id ? "flex justify-end items-center" : "flex justify-start items-center"}`} key={message.id}>
<div className={`${message.userId === currentUser.id ? "flex justify-between items-end flex-col" : "flex justify-between items-start flex-col"}`}>
<p className="rounded-full py-1 px-3 w-fit bg-[#f6985a]">{message.text}</p>
<p className="text-sm opacity-80">{format(message.createdAt)}</p>
</div>
              </div>
            ))}
          </div>
        </div>
  
          </div>

          <form onSubmit={handleSubmit} className=" flex h-[7vh] justify-center items-center">
           <input className="w-full p-2 lg:p-0 hover:outline-none bg-white border rounded-bl-lg border-[#ffd2c6] h-full" name="text" placeholder="Type a message..."></input>
          <button className="h-full w-[20vw] bg-[#f7751e] rounded-br-md" type="submit">Send</button>
         </form>
      
        
      </div>
      )}
      
    </div>
  );
}

export default Chat;

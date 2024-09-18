import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";

export default function ChatComp() {
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        if (socket) {
            let userID = JSON.parse(localStorage.getItem("user"));
            socket.on("getMessage", (data) => {
                if (userID && String(userID.id) === String(data.receiver)) {

                    let messageContainer = document.createElement("div");
                    messageContainer.className = "p-2 m-2 border hover:shadow-xl border-gray-300 hover:scale-[1.01] gap-4 mb-6 rounded-lg flex justify-start items-center";
                    
                    let avatar = document.createElement("img");
                    avatar.src = "/avatar.webp";
                    avatar.className = "object-cover h-9 w-9 rounded-full";
                    avatar.alt = "Avatar";

                    let messageContent = document.createElement("span");
                    messageContent.className = "flex flex-col";
                    
                    let senderName = document.createElement("p");
                    senderName.className = "font-bold";
                    senderName.textContent = "Vishal";  // You might want to use `data.sender` or similar for dynamic sender names
                    
                    let messageText = document.createElement("p");
                    messageText.textContent = data.msg;

                    messageContent.appendChild(senderName);
                    messageContent.appendChild(messageText);
                    
                    messageContainer.appendChild(avatar);
                    messageContainer.appendChild(messageContent);

                    // Append to chat container
                    let chatUser = document.getElementById("chatUser");
                    if (chatUser) {
                        chatUser.appendChild(messageContainer);
                    }
                }
            });
        }
        return () => {
            if (socket) {
                socket.off("getMessage");
            }
        };
    }, [socket]);

    return (
        <div id="chatUser" className="shadow-md border h-[48.6vh] overflow-y-scroll overflow-x-hidden border-[#f9cbbe] rounded-3xl pb-3 pl-3 pr-3 bg-[#fcf5f3]"> 
            <p className="p-2 font-bold bg-[#fcf5f3] z-[50] sticky w-[110%] top-0">Inbox</p>
        </div>
    );
}

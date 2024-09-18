import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfileUpdatePage from "../profileUpdatePage/profileUpdatePage";
// import ChatComp from "./ChatComp";
import { CiBoxList, CiGrid41 } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";

function ProfilePage() {
  const data = useLoaderData();
  console.log("profiledata", data);
  const { updateUser, currentUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [viewType, setViewType] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(()=>{
    if(window.innerWidth > 1050){
      document.body.style.overflow="hidden";
    }
    return ()=>{
      document.body.style.overflow="scroll";
    }
  },[])

  return (
    <div className="profilePage">
      <div className="lg:details">
        <div className="lg:wrapper flex justify-center items-center">
          <div className="flex flex-col lg:flex-row gap-4 w-[85vw]">
         
            <div className="flex h-[33vh] xl:h-auto lg:w-[30%] flex-col justify-start gap-3">
           
              <div className="w-full h-[34.5vh] p-2 border border-[#f9cbbe] rounded-2xl bg-[#fcf5f3]">
                <div className="w-full h-20 lg:h-24 overflow-hidden">
                  <img
                    src={currentUser.avatar || "noavatar.jpg"}
                    className="w-full object-cover rounded-2xl"
                    alt="User Avatar"
                  />
                </div>

                <div className="mt-[-7vh] p-4 flex flex-col justify-center  items-center lg:flex-row lg:justify-start lg:gap-5 lg:items-end">
                  <img
                    src={currentUser.avatar || "noavatar.jpg"}
                    alt="User Avatar"
                    className="lg:h-24 lg:w-24 h-16 w-16 rounded-full shadow-2xl border-2 border-black"
                  />
                  <div className="flex flex-col justify-center items-center lg:justify-normal lg:items-start">
                    <b className="text-lg lg:text-2xl">{currentUser.username}</b>
                    <b className="text-sm lg:text-base">{currentUser.email}</b>
                  </div>
                </div>

                <div className="flex justify-center mt-[-1vh] lg:mt-0 gap-5 lg:px-5 lg:items-end">
                  <p
                    onClick={() => setShow(!show)}
                    className="px-4 hover:cursor-pointer py-3 bg-[#f7751e] text-sm hover:scale-[.95] shadow-lg hover:shadow-none transition-all ease-in-out duration-75 rounded-lg"
                  >
                    Update
                  </p>
                  <p
                    className="px-4 hover:cursor-pointer py-3 bg-[#f7751e] text-sm hover:scale-[.95] shadow-lg hover:shadow-none transition-all ease-in-out duration-75 rounded-lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>

              </div>

              <div className="">
                {/* <ChatComp /> */}
              
            <Suspense fallback={<p>Loading chats...</p>}>
              <Await
                resolve={data.chatResponse}
                errorElement={<p>Error loading chats!</p>}
              >
                {(chatResponse) => <Chat chats={chatResponse.data} />}
              </Await>
            </Suspense>
        
              </div>

            </div>

            <div className="bg-[#fcf5f3] lg:w-[75%] lg:h-[84.90vh] overflow-y-scroll border border-[#f9cbbe] pb-3 mb-2 lg:pb-8 rounded-2xl">
              <div className="title flex justify-between items-start lg:block p-2 lg:p-0 z-[100] mb-3 sticky top-[0] px-2 h-[10vh] bg-[#fcf5f3]">
                <h1 className="font-bold ml-4 text-xl mt-2 lg:mt-0">My List</h1>
                <div className="flex gap-1">
                  <CiGrid41
                    className="p-2 hover:bg-[#f7751e] hover:scale-[1.10] rounded-md transition-all ease-in-out duration-100 hover:shadow-lg hover:text-white"
                    size={40}
                    onClick={() => setViewType(false)}
                  />
                  <CiBoxList
                    className="p-2 hover:bg-[#f7751e] hover:scale-[1.10] rounded-md transition-all ease-in-out duration-100 hover:shadow-lg hover:text-white"
                    size={40}
                    onClick={() => setViewType(true)}
                  />
                  <Link
                    to="/add"
                    className="px-4 py-3 bg-[#f7751e] text-sm hover:scale-[.95] shadow-lg hover:shadow-none transition-all ease-in-out duration-75 rounded-lg flex justify-center items-center gap-1"
                  >
                    Post <IoIosAddCircleOutline size={18} />
                  </Link>
                </div>
              </div>
              <Suspense fallback={<p>Loading posts...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={<p>Error loading posts!</p>}
                >
                  {(postResponse) => (
                    <List view={viewType} posts={postResponse.data.userPosts} />
                  )}
                </Await>
              </Suspense>
            </div>
            
          </div>
        </div>

  
      </div>

      {show && <ProfileUpdatePage setShow={setShow} />}
    </div>
  );
}

export default ProfilePage;
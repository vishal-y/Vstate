import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import QuickChat from "../../components/chat/QuickChat";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { IoChatboxEllipsesOutline, IoLocationOutline } from "react-icons/io5";
import { BsTextareaResize } from "react-icons/bs";
import { MdOutlineBedroomChild } from "react-icons/md";
import { TbBath } from "react-icons/tb";


function SinglePage() {
  const post = useLoaderData();
  const [show,setShow] = useState(false)
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  console.log(post.type)


  // const handleMsg = ()=>{
  //   setShow(!show)
  //   msg=="close" ? setMsg("message") : setMsg("close");
  // }

  console.log(post.user.username,post.user.avatar)

  return (
    <>
    <div className="singlePage hidden lg:flex">
      <div className="details">

        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">

            <div className="top ">
 
              <div className="user ">
                <img className="h-14 w-14 rounded-full" src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>

              <div className="post ">
                
                <div className="flex justify-between">
                <h1 className="capitalize text-2xl font-extrabold">{post.title}</h1>

<button className="w-fit p-1" onClick={handleSave} >
  {saved ? <CiBookmark className=" transition-all ease-in-out duration-200 hover:scale-[1.1]" size={30} /> : <FaBookmark className="text-[#f7751e] transition-all ease-in-out duration-200 hover:scale-[1.15]" size={30} /> }</button>

                </div>

                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                
              
              <div >
              <div className="buttons">
                <div className="price">$ {post.price}</div>
            <button onClick={()=>{setShow(!show)}}>
              <img src="/chat.png" alt="" />
             Chat
            </button>
            <button >Buy</button>
           
            
          </div>
              </div>
              
              </div>
              
            </div>

            <div
              className="mt-5 w-[52vw] overflow-hidden overflow-y-scroll"
              style={{backgroundColor : "#fcf5f3", marginLeft : "-2.5%" , borderRadius:"10px", height : "53vh" , padding : "5%"}}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>

     <div>
   
   <div className="mapDiv">
   <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
   </div>

      <div className="features">

        <div className="wrapper">
          
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="flex justify-center items-center bg-[#f6985a] p-2 rounded-md gap-2">
              <img className="" src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="flex justify-center items-center bg-[#f6985a] p-2 rounded-md gap-2">
              <img className="" src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="flex justify-center items-center bg-[#f6985a] p-2 rounded-md gap-2">
              <img className="" src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>

          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img className="bg-[#f7751e] rounded-full " src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img className="bg-[#f7751e] rounded-full " src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img className="bg-[#f7751e] rounded-full " src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>

          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img className="bg-[#f7751e] rounded-full " src="/school.png" alt="" />
              <div className="featureText">
                <span>Nearest School</span>
                <p>
                  {/* {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away */}
                  {post.postDetail.school}
                </p>
              </div>
            </div>
            <div className="feature">
              <img className="bg-[#f7751e] rounded-full " src="/pet.png" alt="" />
              <div className="featureText">
                <span>Nearest Bus Stop</span>
                <p>{post.postDetail.bus}</p>
              </div>
            </div>
            <div className="feature">
              <img className="bg-[#f7751e] rounded-full " src="/fee.png" alt="" />
              <div className="featureText">
                <span>Nearest Restaurant</span>
                <p>{post.postDetail.restaurant}</p>
              </div>
            </div>
          </div>
        
         
        </div>
      </div>
     </div>

      {
              show ? 
        <QuickChat post={post}/>
        : 
        null
            }

    </div>

    <div className="lg:hidden">
      <div className="details">

        <div className="">

        <div className="flex bg-[#fcf5f3] mb-5 p-3 border border-orange-300 rounded-lg justify-start items-center gap-3">
                <img className="h-14 w-14 rounded-full" src={post.user.avatar} alt="" />
                <span className="text-2xl font-bold">{post.user.username}</span>
              </div>

          <Slider images={post.images} />
         
          <div className="">

            <div className="top p-3 border border-orange-300 mt-4 rounded-xl shadow-xl hover:scale-[1.01] bg-[#fcf5f3]">
 
              <div className="mt-2 text-left">
                
                <div className="flex px-2 justify-between">
                <h1 className="capitalize text-2xl font-extrabold">{post.title}</h1>

<button className="w-fit p-1" onClick={handleSave} >
  {saved ? <CiBookmark className=" transition-all ease-in-out duration-200 hover:scale-[1.1]" size={30} /> : <FaBookmark className="text-[#f7751e] transition-all ease-in-out duration-200 hover:scale-[1.15]" size={30} /> }</button>

                </div>

                <div className="mt-5">
                  <div className="flex text-lg justify-start items-center"> <IoLocationOutline size={25}/> Adress </div>
                  <div className="border px-2">{post.address}</div>
                </div>

              
              <div className="flex justify-between mt-4 gap-3">

              <p className="w-full px-4 hover:cursor-pointer py-3 bg-[#f7751e] text-lg hover:scale-[.95] shadow-lg hover:shadow-none transition-all ease-in-out duration-75 rounded-lg">$ {post.price}</p>
            <button className="w-full px-4 hover:cursor-pointer py-3 bg-[#f7751e] text-lg hover:scale-[.95] shadow-lg hover:shadow-none transition-all ease-in-out duration-75 rounded-lg flex gap-2" onClick={()=>{setShow(!show)}}><IoChatboxEllipsesOutline size={30}/>
              Chat</button>
            <button className="w-full px-4 hover:cursor-pointer py-3 bg-[#f7751e] text-lg hover:scale-[.95] shadow-lg hover:shadow-none transition-all ease-in-out duration-75 rounded-lg flex gap-2">Buy</button>

              </div>
              
              </div>
              
            </div>

                

<p className="mt-7 text-lg font-bold">Description</p>
            <div
              className=" overflow-hidden border border-orange-300 shadow-2xl hover:scale-[1.01] overflow-y-scroll"
              style={{backgroundColor : "#fcf5f3", marginLeft : "-2.5%" , borderRadius:"10px", height : "100%" , padding : "5%"}}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            >
            </div>
            
          </div>
        </div>
      </div>

     <div>
   
   <div className="mt-5 ">
   <p className="text-lg font-bold ml-2">Location</p>
          <div className="h-[50vh] ">
            <Map items={[post]} />
          </div>
   </div>

      <div className=" bg-[#fcf5f3] border border-orange-300  rounded-xl shadow-2xl p-3 hover:scale-[1.01] mt-2 ">

        <div className="mb-8">
          
          <p className=" text-lg font-bold ml-2">Sizes</p>
          <div className="flex justify-center items-center gap-2 text-center">
            <div className="w-full hover:scale-[1.05] hover:shadow-2xl flex flex-col items-center bg-[#f6985a] p-2 rounded-md gap-2">
            <BsTextareaResize size={30}/>
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="w-full hover:scale-[1.05] hover:shadow-2xl flex flex-col items-center bg-[#f6985a] p-2 rounded-md gap-2">
             <MdOutlineBedroomChild size={30}/>
              <span>{post.bedroom} beds</span>
            </div>
            <div className="w-full hover:scale-[1.05] hover:shadow-2xl flex flex-col items-center bg-[#f6985a] p-2 rounded-md gap-2">
              <TbBath size={30}/>
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>

          <p className="text-lg font-bold  mt-3">General</p>
          <div className="flex bg-white items-center p-2 rounded-xl shadow-2xl border-2 border-orange-300 hover:scale-[1.01]">
            <div className="w-full flex justify-center items-center mt-2 text-center flex-col">
              <img className="bg-[#f7751e] h-10 w-10 p-1 rounded-full " src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-center items-center mt-2 text-center flex-col">
              <img className="bg-[#f7751e] h-10 w-10 p-1 rounded-full " src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-center items-center mt-2 text-center flex-col">
              <img className="bg-[#f7751e] h-10 w-10 p-1 rounded-full " src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>

          <p className="text-lg font-bold  mt-3">Nearby Places</p>
          <div className="flex bg-white justify-evenly items-center p-2 rounded-xl shadow-2xl border border-orange-300 hover:scale-[1.01]">
            <div className="flex justify-center items-center flex-col text-center mt-2">
              <img className="bg-[#f7751e] h-10 w-10 p-1 rounded-full " src="/school.png" alt="" />
              <div className="featureText">
                <span>Nearest School</span>
                <p>
                  {/* {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "} */}
                  {post.postDetail.school}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center flex-col text-center mt-2">
              <img className="bg-[#f7751e] h-10 w-10 p-1 rounded-full " src="/pet.png" alt="" />
              <div className="featureText">
                <span>Nearest Bus Stop</span>
                <p>{post.postDetail.bus}</p>
              </div>
            </div>
            <div className="flex justify-center items-center flex-col text-center mt-2">
              <img className="bg-[#f7751e] h-10 w-10 p-1 rounded-full " src="/fee.png" alt="" />
              <div className="featureText">
                <span>Nearest Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
        
         
        </div>
      </div>

     </div>

      {
              show ? 
        <QuickChat post={post}/>
        : 
        null
            }

    </div>

</>
  );
}

export default SinglePage;

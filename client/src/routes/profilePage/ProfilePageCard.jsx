import { Link } from "react-router-dom";
import "./profilePagecard.scss";
import { useEffect, useState, useRef } from "react";
import apiRequest from "../../lib/apiRequest";


function ProfilePageCard({ view, item }) {

  const [viewStyle, setViewStyle] = useState(
    "flex flex-col justify-evenly shadow-md w-[40vw] h-[25vh] ssm:h-[32vh] ssm:min-h-[32vh] ssm:w-full smd:h-[35vh] smd:min-h-[35vh] md:w-[35vw] md:h-[35vh] md:min-h-[32vh] lg:h-[35vh] lg:min-h-[35vh] lg:w-[22vw]  xl:min-h-[40vh] xl:h-[40vh] xl:w-auto hover:shadow-none hover:scale-[.99] ease-in-out transition-all border border-[#f9cbbe] duration-75 bg-[#fff] py-4 px-4 rounded-2xl"
  );

  useEffect(() => {
    !view
      ? setViewStyle(
          "flex flex-col justify-evenly shadow-md w-[40vw] h-[25vh] ssm:h-[32vh] ssm:min-h-[32vh] ssm:w-full smd:h-[35vh] smd:min-h-[35vh] md:w-[35vw] md:h-[35vh] md:min-h-[32vh] lg:h-[35vh] lg:min-h-[35vh] lg:w-[22vw]  xl:min-h-[40vh] xl:h-[40vh] xl:w-auto hover:shadow-none hover:scale-[.99] ease-in-out transition-all border border-[#f9cbbe] duration-75 bg-[#fff] py-4 px-4 rounded-2xl"
        )
      : setViewStyle(
          "listview shadow-md hover:shadow-none hover:scale-[.99] ease-in-out transition-all border border-[#f9cbbe] duration-75 bg-[#fff] py-4 px-4 rounded-2xl"
        );
  }, [view]);

  const overlayRef = useRef(null);

  const handleMouseMove = () => {
    if (overlayRef.current) {
      overlayRef.current.style.backgroundColor = "transparent";
    }
  };

  const handleMouseLeave = () => {
    if (overlayRef.current) {
      overlayRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.20)";
    }
  };
  
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const postId = item.id; 
      await apiRequest.delete(`/posts/${postId}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };


  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("edit")
    // try {
    //   const postId = item.id; 
    //   await apiRequest.delete(`/posts/${postId}`);
    //   window.location.reload()
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div id="view" className={`gridview ${viewStyle}`}>
      <Link to={`/${item.id}`}>
        <div
          className="relative inline-block imageContainer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img src={item.images[0] ? item.images[0] : "/noavatar.jpg"} className=" rounded-md h-28 ssm:w-[90vw] ssm:h-[22vh] w-40 sm:h-[15vh] sm:w-[40vw] object-cover md:h-[25vh] smd:h-[25vh] xl:h-[25vh] lg:h-[25vh] lg:w-[20vw] md:w-[40vw]" alt="image" />
          <div
            ref={overlayRef}
            className="absolute  ease-in-out duration-300 transition-all inset-0 bg-black/[.20] rounded-md z-[20] pointer-events-none"
          ></div>
        </div>
      </Link>

      <div className="textContainer">
        <div className="flex justify-between items-center gap-5">
          <h2 className="text-lg xl:text-2xl font-bold capitalize">
            <Link to={`/${item.id}`}>{item.title.length > 5 ? `${item.title.slice(0, 4)}..` : item.title}</Link>
          </h2>
          {/* <p className="price">$ {item.price}</p> */}
         <div className="flex gap-2">
         {/* <p onClick={handleEdit} className="px-4 py-3 bg-[#f7751e] text-sm hover:scale-[.95] shadow-lg hover:shadow-none transition-all ease-in-out duration-75 rounded-lg"
          >Edit</p> */}
          {
            !view ?
            <p onClick={handleDelete} className="p-2 md:px-4 md:py-3 bg-[#f7751e] cursor-pointer text-sm hover:scale-[.95] shadow-lg hover:shadow-none transition-all ease-in-out duration-75 rounded-lg"
            >Delete</p>
            :
            null
          }
         </div>
        </div>

        {view ? (
          <div className="hidden xl:flex justify-center items-center gap-5">
            <div className="feature bg-[#f4853c] px-2 py-1 rounded-lg flex justify-center items-center gap-2">
              <img src="/bed.png" alt="" />
              <span className="text-sm xl:text-base">{item.bedroom} bedroom</span>
            </div>
            <div className="feature  bg-[#f4853c] px-2 py-1 rounded-lg flex justify-center items-center gap-2">
              <img src="/bath.png" alt="" />
              <span className="text-sm xl:text-base">{item.bathroom} bathroom</span>
            </div>
          </div>
        ) : null}

{
  view ? 
  <p onClick={handleDelete} className="px-4 py-3 bg-[#f7751e] text-sm hover:scale-[.95] shadow-lg hover:shadow-none transition-all ease-in-out duration-75 rounded-lg"
  >Delete</p>
  : 
  null
}

      </div>
      

    </div>
  );
}

export default ProfilePageCard;

import { useContext, useEffect, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { IoIosCloseCircleOutline } from "react-icons/io";


function ProfileUpdatePage({ setShow }) {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [change, setChange] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []); 

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email } = Object.fromEntries(formData);

    console.log(username,email)

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        avatar:avatar[0]
      });
      updateUser(res.data);
      setShow(false)
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };


  const handleClose = () => {
    if (change) {
      const isSure = window.confirm("Are you sure? You haven't saved your changes.");
      if (isSure) {
        setChange(false);
        setShow(false);
      }
    } else {
      setShow(false);
    }
  };

  const getAvatarPreview = () => {
    if (avatar[0] instanceof File) {
      return URL.createObjectURL(avatar[0]);
    }
    return currentUser.avatar || "/noavatar.jpg";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="absolute top-0 z-[1000] h-screen w-screen bg-black/[.45] flex  justify-center items-center">
      <div className="h-fit w-[30%] lg:min-w-[40vw] border-2 border-[#eabe4b] min-w-[80vw] shadow-2xl rounded-lg z-50 bg-[#fcf5f3] text-black">
        <div className="flex justify-between items-center p-4 pb-0">
          <h2 className="font-bold text-black lg:text-xl">Update your profile :)</h2>
          <div onClick={handleClose}>
              <IoIosCloseCircleOutline className="hover:scale-[1.01] hover:bg-black rounded-full hover:text-orange-400" size={25}/>
            </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row justify-evenly items-center">
            <div className="lg:w-[36%] rounded-sm flex justify-center items-center">

                <UploadWidget
                  uwConfig={{
                    cloudName: "lamadev",
                    uploadPreset: "estate",
                    multiple: false,
                    maxImageFileSize: 2000000,
                    folder: "avatars",
                  }}
                  getAvatarPreview={getAvatarPreview()}
                  setState={setAvatar}
                />
             
            </div>

            <div className="lg:w-[53%] w-[65vw] -mt-7 lg:-mt-0 mb-10 lg:mb-0 h-full flex flex-col justify-center items-center gap-3">
              <input
                id="username"
                name="username"
                type="text"
                defaultValue={currentUser.username}
                className="py-2 bg-transparent border border-dashed border-[#685a96] rounded-sm w-full p-2 outline-none"
                placeholder="Username"
                onChange={() => setChange(true)}
              />

              <input
                id="email"
                name="email"
                type="email"
                defaultValue={currentUser.email}
                className="py-2 bg-transparent border border-dashed border-[#685a96] rounded-sm w-full p-2 outline-none"
                placeholder="Email"
                onChange={() => setChange(true)}
              />

              <button
                type="submit"
                className={`${
                  !change
                    ? "bg-[#f7751e] cursor-not-allowed w-full py-2 rounded-md text-black text-base transition-all ease-linear duration-75 hover:scale-[1.05]"
                    : "bg-[#f7751e] w-full py-2 rounded-md text-black text-base cursor-pointer transition-all ease-linear duration-75 hover:scale-[1.05]"
                }`}
              >
                Save changes
              </button>

              {error && <span className="text-red-600">{error}</span>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;

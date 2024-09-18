import { useContext, useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import apiRequest from "../../lib/apiRequest";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (currentUser) fetch();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      setOpen(false)
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    // <nav>
    //   <div className="left">
    //     <a href="/" className="logo">
    //       <img src="/logo.png" alt="" />
    //       <span>VSTATE</span>
    //     </a>
    //     <a className="hidden lg:block" href="/">Home</a>
    //     <a className="hidden lg:block" href="/">About</a>
    //     <a className="hidden lg:block" href="/">Contact</a>
    //   </div>
    //   <div className="right">
    //     {currentUser ? (
    //       <div className="user">
    //         <Link to="/profile" className="lg:hidden h-24 w-24 ">
    //           <img className="mt-5" src={currentUser.avatar || "/noavatar.jpg"} alt="" />
    //         </Link>
    //         <span className="hidden lg:block">{currentUser.username}</span>
    //         <Link to="/profile" className="profile hidden lg:block">
    //           {number > 0 && <div className="notification">{number}</div>}
    //           <span>Profile</span>
    //         </Link>
    //       </div>
    //     ) : (
    //       <>
    //         <a href="/login">Sign in</a>
    //         <a href="/register" className="register">
    //           Sign up
    //         </a>
    //       </>
    //     )}

    //   </div>
    // </nav>

    <div className="mb-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img className="h-8 " src="/logo.png" alt="" />
          <span>VSTATE</span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {currentUser ? (
            <button
              onClick={() => {
                setOpen(!open);
              }}
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
                src={currentUser ? currentUser.avatar : "/noavatar.jpg"}
                alt="user photo"
              />
              {number > 0 && <div className="notification">{number}</div>}
            </button>
          ) : (
            <Link
              to={"/login"}
              className="px-4 hover:cursor-pointer py-3 bg-[#f7751e] text-sm hover:scale-[.95] shadow-lg hover:shadow-none transition-all ease-in-out duration-75 rounded-lg"
            >
              Login
            </Link>
          )}

          {open ? (
            <div
              className="absolute left-[41vw] lg:left-[84vw] top-[8vh] z-[1500] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-2xl lg:border border-orange-400 dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {currentUser ? currentUser.username : "unknown"}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {currentUser ? currentUser.email : "unknown"}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    to={"/profile"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li onClick={handleLogout}>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          ) : null}

          <button
          onClick={()=>{setShow(!show)}}
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {
        show ?
        <div
          className="items-center justify-between w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        :
        null
        }
        
      </div>
    </div>
  );
}

export default Navbar;

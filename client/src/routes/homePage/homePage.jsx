import { useContext, useEffect } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";
import Town from "./Town";
import { FiCheck, FiLayers, FiUsers , FiArrowRight, FiHome} from "react-icons/fi";


function HomePage() {

  const {currentUser} = useContext(AuthContext)

  // useEffect(()=>{
  //   document.body.style.overflow="hidden";
  //   return()=>{
  //     document.body.style.overflowY="scroll";
  //   }
  // })

  return (
    <div className="homePage  flex flex-col">
    
       <div
      className="relative z-0 flex flex-wrap items-center justify-center min-h-screen gap-2  md:-mt-14"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div className="absolute w-72 h-72 -z-10 rounded-full blur-[120px] bg-primary/30 dark:bg-[#ffe0cc]/50"></div>
      <div className="flex-1 basis-[20rem]">
        <h1 className="text-4xl text-center font-bold capitalize md:text-5xl">
          property consisting <br /> land and buildings
        </h1>
        <div className="pl-3 mt-5 border-l-4 border-primary">
          
        </div>
      <SearchBar/>
        <div className="mt-6 flex flex-col items-center justify-center gap-x-6 text-center md:flex-row">
          <div>
            <h1 className="text-2xl font-bold">
              12k <span className="text-sm text-primary">+</span>
            </h1>
            <p>Requested Projects</p>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              15k <span className="text-sm text-primary">+</span>
            </h1>
            <p>Projects Completed</p>
          </div>
        </div>
      </div>
      <div className="flex-1 basis-[20rem]">
        <img src="/images/hero-4.png" alt="" className="w-full" />
      </div>
    </div>





    <div className="z-10 mt-[-10vh] md:mt-[-8vh] pb-16">
      <div className=" overflow-hidden rounded-lg sm:grid-cols-2 md:grid-cols-3">
        <div className="md:col-span-1">
          <img
            src="/property3.jpeg"
            alt=""
            className="w-full h-[25vh] md:h-full"
          />
        </div>

        <div className="relative flex-col justify-center items-center gap-5 p-5 md:col-span-2 bg-[#fcf5f3] border-l-0 text-balance border border-orange-300 flex-align-center md:flex-row">
        
          <div className="flex justify-center items-center flex-col gap-5">
            <h1 className="lg:text-2xl font-semibold ">
              You invest in the apartment of your choice
            </h1>

            <div className="lg:rounded-lg rounded-2xl shadow-2xl hover:scale-[1.01] p-4 bg-white lg:w-[45vh]">
            <div className="flex-shrink-0 flex justify-center items-center flex-align-center">
              <img
                src="/noavatar.jpg"
                alt=""
                className="flex-shrink-0 w-10 hover:z-40 hover:border-2 hover:scale-[1.1] transition-all duration-150 ease-in-out hover:border-red-400 h-10 rounded-full"
              />
              <img
                src="/noavatar.jpg"
                alt=""
                className="flex-shrink-0 w-10 hover:z-40 hover:border-2 hover:scale-[1.1] transition-all duration-150 ease-in-out hover:border-red-400 h-10 -ml-2 border-2 border-white rounded-full dark:border-dark"
              />
              <img
                src="/noavatar.jpg"
                alt=""
                className="flex-shrink-0 w-10 hover:z-40 hover:border-2 hover:scale-[1.1] transition-all duration-150 ease-in-out hover:border-red-400 h-10 -ml-2 border-2 border-white rounded-full dark:border-dark"
              />
              <img
                src="/noavatar.jpg"
                alt=""
                className="flex-shrink-0 w-10 hover:z-40 hover:border-2 hover:scale-[1.1] transition-all duration-150 ease-in-out hover:border-red-400 h-10 -ml-2 border-2 border-white rounded-full dark:border-dark"
              />
              <div className="grid flex-shrink-0 w-10 h-10 -ml-2 text-white border-2 border-white rounded-full bg-primary place-items-center dark:border-dark">
                <h1>+5</h1>
              </div>
            </div>
            <h1 className="mt-2 flex justify-center items-center text-secondary dark:text-slate-300">
              People Successfull Getting Homes
            </h1>
          </div>

            {/* <div className="mt-5 flex-align-center gap-x-3">
              <div className="px-3 py-2 bg-white rounded-lg flex-align-center gap-x-2 dark:bg-dark-light ">
                <FiHome className="text-slate-700 dark:text-slate-300" />
                <input
                  type="text"
                  className="bg-transparent outline-none text-slate-700 dark:text-slate-300"
                  placeholder="Find your nicr home..."
                />
              </div>
              <button className="w-14 h-10 flex justify-center items-center py-2 rounded-md btn-primary">
                <FiArrowRight />
              </button>
            </div> */}
            
          </div>

        </div>

      </div>
    </div>


    
    <div className="pt-10 pb-16">
    <div className="flex flex-wrap gap-10">
      <div className="flex-1 basis-[20rem]">
        <h1 className="sub-heading">about us</h1>
        <h1 className="heading">we specialize in quality home renovations</h1>
        <p className="mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo laborum
          earum saepe quibusdam, temporibus aut sapiente, ea alias libero,
          ipsam perferendis. Consectetur maiores, dicta, earum eaque facilis
          adipisci dignissimos optio fuga officia itaque quo impedit.
        </p>
        <div className="mt-4">
          <div className="flex-align-center gap-x-2">
            <div className="icon-box text-primary !bg-primary/20">
              <FiCheck />
            </div>
            <p>Outstanding Property</p>
          </div>
          <div className="mt-2 flex-align-center gap-x-2">
            <div className="icon-box text-primary !bg-primary/20">
              <FiCheck />
            </div>
            <p>Professional and experienced human resource</p>
          </div>
          <div className="mt-2 flex-align-center gap-x-2">
            <div className="icon-box text-primary !bg-primary/20">
              <FiCheck />
            </div>
            <p>Provide the best services for users</p>
          </div>
          <div className="mt-2 flex-align-center gap-x-2">
            <div className="icon-box text-primary !bg-primary/20">
              <FiCheck />
            </div>
            <p>Modern city locations and exceptional lifestyle</p>
          </div>
          <button className="mt-4 btn btn-primary">read more</button>
        </div>
      </div>
      <div className="flex-1 basis-[20rem]">
        <div className="relative">
          <img
            src="/property1.jpg"
            alt=""
            className="rounded-lg w-full sm:h-[400px] object-cover"
          />
          <div className="absolute top-48 sm:bottom-5 z-[10] -left-2 md:-left-20">
            <div className="p-3 bg-white rounded-lg shadow-md w-72 flex-center-between gap-x-3 dark:bg-dark-light">
              <h1>We have been serving our customers for over 70 years</h1>
              <div className="icon-box text-primary !bg-primary/20">
                <FiUsers />
              </div>
            </div>
            <div className="p-3 mt-4 ml-8 bg-white rounded-lg shadow-md w-72 flex-center-between gap-x-3 dark:bg-dark-light">
              <h1>
                Working with the symbol and reputation of trustworthy trait
              </h1>
              <div className="icon-box text-primary !bg-primary/20">
                <FiLayers />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>







    </div>

  );
}

export default HomePage;


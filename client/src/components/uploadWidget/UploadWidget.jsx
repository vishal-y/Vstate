import { createContext, useEffect, useState } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function UploadWidget({ uwConfig, setPublicId, setState , getAvatarPreview }) {
  const [loaded, setLoaded] = useState(false);
  const [dp,setDp] = useState(getAvatarPreview)
  useEffect(() => {
    // Check if the script is already loaded
    console.log(getAvatarPreview)
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setState((prev) => [...prev, result.info.secure_url]);
            setDp(result.info.secure_url)
            console.log("setDP--------------dp" , dp)
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <div className="relative h-[16.6rem] w-[14rem] flex justify-center items-center">
    <CloudinaryScriptContext.Provider value={{ loaded }}>
     {
      dp ?
       <img
       src={dp}
       className="absolute top-11 left-0 rounded-lg hover:scale-[1.06] transition-all duration-200 shadow-2xl h-[65%] w-[100%] object-cover border-[1.5px] border-dotted border-[#b5a3fc] p-[0.10rem]"
       />
:
null
     }
      <label
       id="upload_widget"
       onClick={initializeCloudinaryWidget}
        htmlFor="dropzone-file"
        className="absolute z-[1000] top-11 left-0 w-full h-[24.5vh] flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent hover:scale-[1.1] "
      >
        <div className="flex flex-col items-center justify-end mt-12">
          <svg
            className="w-12 h-12 mb-4 text-white/[30] bg-[#f7751e] rounded-md p-2 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 bg-black/[.30] p-1 rounded-md text-sm text-white text-center">
            Click to upload 
          </p>
        </div>
      </label>
    </CloudinaryScriptContext.Provider>
  </div>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };

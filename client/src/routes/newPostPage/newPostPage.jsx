import { useEffect, useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [type, setType] = useState("rent");

  useEffect(()=>{
    if(window.innerWidth > 1050){
      document.body.style.overflow="hidden";
    }
    return (()=>{
      document.body.style.overflow="auto";
    })
  },[])

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: inputs.school,
          bus: inputs.bus,
          restaurant: inputs.restaurant,
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <>
      <div className="newPostPage hidden lg:flex">
        <div className="formContainer">
          <h1>Add New Post</h1>
          <div className="wrapper">
            <form onSubmit={handleSubmit}>
              <div className="item">
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" />
              </div>
              <div className="item">
                <label htmlFor="price">Price</label>
                <input id="price" name="price" type="number" />
              </div>
              <div className="item">
                <label htmlFor="address">Address</label>
                <input id="address" name="address" type="text" />
              </div>
              <div className="item description">
                <label htmlFor="desc">Description</label>
                <ReactQuill theme="snow" onChange={setValue} value={value} />
              </div>
              <div className="item">
                <label htmlFor="city">City</label>
                <input id="city" name="city" type="text" />
              </div>
              <div className="item">
                <label htmlFor="bedroom">Bedroom Number</label>
                <input min={1} id="bedroom" name="bedroom" type="number" />
              </div>
              <div className="item">
                <label htmlFor="bathroom">Bathroom Number</label>
                <input min={1} id="bathroom" name="bathroom" type="number" />
              </div>
              <div className="item">
                <label htmlFor="latitude">Latitude</label>
                <input id="latitude" name="latitude" type="text" />
              </div>
              <div className="item">
                <label htmlFor="longitude">Longitude</label>
                <input id="longitude" name="longitude" type="text" />
              </div>
              <div className="item">
                <label htmlFor="type">Type</label>
                <select className="border border-black rounded-md" name="type">
                  <option value="rent" defaultChecked>
                    Rent
                  </option>
                  <option value="buy">Buy</option>
                </select>
              </div>
              <div className="item">
                <label htmlFor="type">Property</label>
                <select className="border border-black rounded-md" name="property">
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="land">Land</option>
                </select>
              </div>

              <div className="item">
                <label htmlFor="utilities">Utilities Policy</label>
                <select className="border border-black rounded-md" name="utilities">
                  <option value="owner">Owner is responsible</option>
                  <option value="tenant">Tenant is responsible</option>
                  <option value="shared">Shared</option>
                </select>
              </div>
              <div className="item">
                <label htmlFor="pet">Pet Policy</label>
                <select className="border border-black rounded-md" name="pet">
                  <option value="allowed">Allowed</option>
                  <option value="not-allowed">Not Allowed</option>
                </select>
              </div>
              <div className="item">
                <label htmlFor="income">Income Policy</label>
                <input
                  id="income"
                  name="income"
                  type="text"
                  placeholder="Income Policy"
                />
              </div>
              <div className="item">
                <label htmlFor="size">Total Size (sqft)</label>
                <input min={0} id="size" name="size" type="number" />
              </div>
              <div className="item">
                <label htmlFor="school">School nearby</label>
                <input   id="school" name="school" type="text" />
              </div>
              <div className="item">
                <label htmlFor="bus">Near by bus stand</label>
                <input type="text" id="bus" name="bus" />
              </div>
              <div className="item">
                <label htmlFor="restaurant">Restaurant</label>
                <input
                   id="restaurant"
                  name="restaurant"
                  type="text"
                />
              </div>
              <button className="sendButton">Add</button>
              {error && <span>error</span>}
            </form>
          </div>
        </div>
        <div className="sideContainer overflow-scroll rounded-xl border-orange-300 min-w-[30vw] max-w-[30vw] flex flex-wrap justify-evenly items-center">
          {images.map((image, index) => (
            <img
              className="h-[10rem] w-[12rem] mt-2 rounded-md"
              src={image}
              key={index}
              alt=""
            />
          ))}
          <UploadWidget
            uwConfig={{
              multiple: true,
              cloudName: "lamadev",
              uploadPreset: "estate",
              folder: "posts",
            }}
            setState={setImages}
          />
        </div>
      </div>

      <div className="lg:hidden">
        <div className="p-3 bg-[#fcf5f3] rounded-xl  shadow-md mb-5">
          <h1>Add New Post</h1>
          <div className=" p-2">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center gap-4">
                <div className="">
                  <label htmlFor="title">Title</label>
                  <input
                    className="border border-black rounded-md  w-full p-3"
                    id="title"
                    name="title"
                    type="text"
                  />
                </div>
                <div className="">
                  <label htmlFor="price">Price</label>
                  <input
                    className="border border-black rounded-md  w-full p-3"
                    id="price"
                    name="price"
                    type="number"
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="address">Address</label>
                <input
                  className="border border-black rounded-md  w-full p-3"
                  id="address"
                  name="address"
                  type="text"
                />
              </div>
              <div className="mb-5 mt-4 min-h-[35vh] h-[40vh]">
                <label htmlFor="desc">Description</label>
                <ReactQuill
                  className="h-full bg-white"
                  theme="snow"
                  onChange={setValue}
                  value={value}
                />
              </div>
              <div className="mt-16">
                <label htmlFor="city">City</label>
                <input
                  className="border border-black rounded-md  w-full p-3"
                  id="city"
                  name="city"
                  type="text"
                />
              </div>

              <div className="grid smm:grid-cols-1 sm:grid-cols-2 gap-6 mt-3">
                <div className="">
                  <label htmlFor="bedroom">Bedroom Number</label>
                  <input
                    className="border border-black rounded-md  w-full p-3"
                    min={1}
                    id="bedroom"
                    name="bedroom"
                    type="number"
                  />
                </div>
                <div className="">
                  <label htmlFor="bathroom">Bathroom Number</label>
                  <input
                    className="border border-black rounded-md  w-full p-3"
                    min={1}
                    id="bathroom"
                    name="bathroom"
                    type="number"
                  />
                </div>
                <div className="">
                  <label htmlFor="latitude">Latitude</label>
                  <input
                    className="border border-black rounded-md w-full p-3"
                    id="latitude"
                    name="latitude"
                    type="text"
                  />
                </div>
                <div className="">
                  <label htmlFor="longitude">Longitude</label>
                  <input
                    className="border border-black rounded-md w-full p-3"
                    id="longitude"
                    name="longitude"
                    type="text"
                  />
                </div>
              </div>

              <div className="grid smm:grid-cols-1 sm:grid-cols-2 gap-6 mt-3">
                <div className="p-1">
                  <label htmlFor="type">Type</label>
                  <select
                    onChange={(e)=>{setType(e.target.value)}}
                    className="border border-black rounded-md p-3 w-full"
                    name="type"
                  >
                    <option value="rent" defaultChecked>
                      Rent
                    </option>
                    <option value="buy">Buy</option>
                  </select>
                </div>

                <div className="p-1">
                  <label htmlFor="type">Property</label>
                  <select
                    className="border border-black rounded-md p-3 w-full"
                    name="property"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="land">Land</option>
                  </select>
                </div>

                <div className="p-1">
                  <label htmlFor="utilities">Utilities Policy</label>
                  <select
                    className="border border-black rounded-md p-3 w-full"
                    name="utilities"
                  >
                    <option value="owner">Owner is responsible</option>
                    <option value="tenant">Tenant is responsible</option>
                    <option value="shared">Shared</option>
                  </select>
                </div>

                <div className="p-1">
                  <label htmlFor="pet">Pet Policy</label>
                  <select
                    className="border border-black rounded-md p-3 w-full"
                    name="pet"
                  >
                    <option value="allowed">Allowed</option>
                    <option value="not-allowed">Not Allowed</option>
                  </select>
                </div>
              </div>

              <div className="grid smm:grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
                <div className="">
                  <label htmlFor="income">Income Policy</label>
                  <input
                    className="border border-black rounded-md w-full p-3"
                    id="income"
                    name="income"
                    type="text"
                    placeholder="Income Policy"
                  />
                </div>
                <div className="">
                  <label htmlFor="size">Total Size (sqft)</label>
                  <input
                    className="border border-black rounded-md w-full p-3"
                    min={0}
                    id="size"
                    name="size"
                    type="number"
                  />
                </div>

                { type=="rent" ? (
                  <>
                    <div className="">
                      <label htmlFor="school">School nearby</label>
                      <input
                        className="border border-black rounded-md w-full p-3"
                        id="school"
                        name="school"
                        type="text"
                      />
                    </div>
                    <div className="">
                      <label htmlFor="bus">Near by bus stand</label>
                      <input
                        className="border border-black rounded-md w-full p-3"
                        id="bus"
                        name="bus"
                        type="text"
                      />
                    </div>
                    <div className="">
                      <label htmlFor="restaurant">Restaurant</label>
                      <input
                        className="border border-black rounded-md w-full p-3"
                         id="restaurant"
                        name="restaurant"
                        type="text"
                      />
                    </div>
                  </>
                ) : null} 

                <div className={type === "buy" ? "w-[80vw] -mt-5" : ""}>
                  <button className="h-fit p-3 mt-6 bg-[#f7751e] rounded-lg w-full">
                    Add
                  </button>
                </div>
              </div>

              {error && <span>error</span>}
            </form>
          </div>
        </div>
       
       <div className="ssm:h-[45vh] ssm:min-h-[35vh] sm:h-[50vh] sm:min-h-[40vh]">
       <div className="overflow-scroll rounded-xl border border-orange-300 h-full flex flex-wrap justify-evenly items-center">
          {images.map((image, index) => (
            <img
              className="h-[10rem] w-[12rem] mt-2 rounded-md"
              src={image}
              key={index}
              alt=""
            />
          ))}
          <UploadWidget
            uwConfig={{
              multiple: true,
              cloudName: "lamadev",
              uploadPreset: "estate",
              folder: "posts",
            }}
            setState={setImages}
          />
        </div>

       </div>

      </div>
    </>
  );
}

export default NewPostPage;

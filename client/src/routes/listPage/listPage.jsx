import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import MorderSearch from "../../components/searchBar/MorderSearch";

function ListPage() {
  const data = useLoaderData();
  useEffect(()=>{
    console.log(data.postResponse)
    console.log("listpage")
  })

  const [viewClass,setviewClass] = useState(true);
  const [classStyle,setClassStyle] = useState("wrapper")
  useEffect(()=>{
    console.log("this")
    viewClass ? setClassStyle("wrapper") : setClassStyle("grid grid-rows-2 gap-3 md:grid-cols-2")
  },[viewClass])

  return (
    <div className="listPage">

<Filter/>

      <div className="flex rounded-lg justify-between items-center border w-full bg-[#fcf5f3] p-4 mt-4 ">
      <p>List of all property <br /> <span className="text-sm text-gray-600">click on map to get map view</span> </p>
      <img onClick={()=>{setviewClass(!viewClass)}} src="/map.png" alt="mapbutton" className="h-12 w-12 rounded-full" />
      </div>
      
     <div className="mt-10 flex">

     <div className="listContainer">
     
        <div className={classStyle}>
        
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>

      {
        viewClass ? <div className="lg:mapContainer mt-[-4vh] flex-[2] h-[82vh] w-full">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
       : 
       null
      }

     </div>
{/* 
      <MorderSearch/> */}

    </div>
  );
}

export default ListPage;

import { Marker, Popup } from "react-leaflet";
import { useEffect, useRef } from "react";
import "./pin.scss";
import { useOpenPopup } from "../../lib/markerpopup";

function Pin({ item }) {
  const markerRef = useRef(null);
  const { OpenPopup, setOpenPopup } = useOpenPopup()

  useEffect(() => {
    if (OpenPopup.isPop && (OpenPopup.id==item.id) ) {
      markerRef.current.openPopup();
    }
  }, [OpenPopup.isPop ,  OpenPopup.id]);

  return (
    <Marker
      position={[item.latitude, item.longitude]}
      ref={markerRef}
    >
      <Popup>
        <div className="h-24 w-28">
          <img src={item.images[0]} alt="" className="rounded-lg h-16" />
          <div className="flex justify-center items-center gap-2 h-10">
            <p className="text-lg capitalize">{item.title}</p>
            <p className="bg-[#f4853c] px-2 py-1 rounded-md">$ {item.price}</p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;

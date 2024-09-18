import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Map({ items = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();  
  const [location, setLocation] = useState({
    lat: 19.0760, 
    long: 72.8777,
    zoom : 15
  });

  useEffect(() => {
    if (items.length > 0) {
      setLocation({
        lat: items[0].latitude,
        long: items[0].longitude,
        zoom : 15 
      });
    }
  }, [searchParams, items]);

  return (
    <MapContainer
      center={
        items.length > 0
          ? [location.lat, location.long]
          : [19.0760, 72.8777]
      }
      zoom={location.zoom}
      scrollWheelZoom={true}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;

"use client";
import "leaflet/dist/leaflet.css";
// import dynamic from "next/dynamic";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// const MapContainer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.MapContainer),
//   { ssr: false }
// );

// const Marker = dynamic(
//   () => import("react-leaflet").then((mod) => mod.Marker),
//   { ssr: false }
// );

// const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
//   ssr: false,
// });

// const TileLayer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.TileLayer),
//   { ssr: false }
// );

export default function Map() {
  const [coord, setCoord] = useState([48.866667, 2.333333]);

  const SearchLocation = () => {
    return (
      <div className="search-location">
        <input type="text" placeholder="Search Location" />
      </div>
    );
  };

  const GetMyLocation = () => {
    // const map = useMap();

    const getMyLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("ma geoloc :", position);

          setCoord([position.coords.latitude, position.coords.longitude]);
          // map.flyTo([position.coords.latitude, position.coords.longitude], 13);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    return (
      <div className="get-my-location">
        <button onClick={getMyLocation}>Get My Location</button>
      </div>
    );
  };

  return (
    <div>
      <SearchLocation />
      <GetMyLocation />
      <MapContainer
        style={{
          height: "100vh",
          width: "100vw",
        }}
        center={coord}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GetMyLocation />{" "}
        {/* Placez le composant GetMyLocation à l'intérieur de MapContainer */}
        <Marker position={coord}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

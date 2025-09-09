import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Polyline  } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface Place {
  name: string;
  position: LatLngTuple;
}

export default function Map() {
  const places: Place[] = [
    { name: "Place 1", position: [30.05, 31.233] },
    { name: "Place 2", position: [30.0512, 31.2355] },
    { name: "Place 3", position: [30.0525, 31.237] },
    { name: "Place 4", position: [30.0538, 31.239] },
  ];

  const mapIcon = L.icon({
    iconUrl: markerIcon ,
    shadowUrl: markerShadow,
    iconSize: [24, 40],
    iconAnchor: [12, 40],
    popupAnchor: [0, -45],
    shadowSize: [40, 40],
    shadowAnchor: [12, 40]
  })

  return (
    <section className="container min-h-[100vh] flex items-center justify-center">
      <MapContainer
        center={[30.0515, 31.2360]}
        zoom={15}
        scrollWheelZoom={false}
        className="w-4/5 h-100 sm:h-115 xl:h-120 2xl:h-130"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((place , index: number) => {
          return (
            <Marker 
            key={index} 
            position={place.position as [number, number]}
            icon={mapIcon}
            >
              <Popup>
                {place.name}
              </Popup>
            </Marker>
          );
        })}

        <Polyline 
        positions={places.map(p => p.position)}
        pathOptions={{
          color: '#2e84ca',
          weight: 5,
          lineCap: "round",
          lineJoin: "round"
        }} 
          />
      </MapContainer>
    </section>
  );
}

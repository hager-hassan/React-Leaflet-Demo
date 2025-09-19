import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useContext } from "react";
import { MapContext } from "../../Context/MapContext";

export default function Map() {
  const { coordinates, places } = useContext(MapContext)!;

  const mapIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [24, 40],
    iconAnchor: [12, 40],
    popupAnchor: [0, -45],
    shadowSize: [40, 40],
    shadowAnchor: [12, 40],
  });

  return (
    <section className="w-full flex items-center justify-center">
      <MapContainer
        center={[30.0444, 31.2357]}
        zoom={7}
        scrollWheelZoom={true}
        className="w-4/5 h-100 sm:h-115 xl:h-120 2xl:h-140"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((place, index: number) => {
          return (
            <Marker
              key={index}
              position={place.position as [number, number]}
              icon={mapIcon}
            >
              <Popup>{place.name}</Popup>
            </Marker>
          );
        })}

        {coordinates &&
        <Polyline
          positions={coordinates}
          pathOptions={{
            color: "blue",
            weight: 3,
          }}
        />
        }
      </MapContainer>
    </section>
  );
}

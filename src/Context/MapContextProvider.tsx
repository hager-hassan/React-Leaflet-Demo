import { useEffect, useState, type ReactNode } from "react";
import { MapContext } from "../Context/MapContext.ts";
import polyline from "@mapbox/polyline";
import type { LatLngTuple } from "leaflet";
import axios from "axios";

type Props = { children: ReactNode };

export interface Place {
  name: string;
  position: LatLngTuple;
}
export type Summary = {
  distance: number;
  duration: number;
};

const APIKey: string =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjQxN2U4MjU3ZWRmMjQ0MjdiY2ZkOTJhMGQ2ZTViNTQwIiwiaCI6Im11cm11cjY0In0=";

export default function MapContextProvider({ children }: Props) {
  const [profile, setProfile] = useState<string | null>("foot-walking");
  const [bounds, setBounds] = useState<LatLngTuple[] | null>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [coordinates, setCoordinates] = useState<LatLngTuple[] | null>([]);
  const places: Place[] = [
    { name: "Alex", position: [31.20283549078023, 29.909114863234652] },
    { name: "Tanta", position: [30.789049752760093, 31.008067536003846] },
    { name: "Mansoura", position: [31.043278904723678, 31.366476321443496] },
  ];
  const coords: LatLngTuple[] = places.map((place) => {
    return [place.position[1] , place.position[0]];
  });

  function decodeGeometry(geometry: string) {
    const decoded = polyline.decode(geometry);
    console.log(decoded);

    const coords: LatLngTuple[] = decoded.map(
      ([lat, lng]: [number, number]) => [lat, lng]
    );
    setCoordinates(coords);
  }

  async function fetchMapInfo(): Promise<void> {
    try {
      const { data } = await axios.post(
        `https://api.openrouteservice.org/v2/directions/${profile}/json`,
        {
          coordinates: coords,
        },
        {
          headers: {
            Authorization: APIKey,
          },
        }
      );

      setBounds([
        [data.bbox[1], data.bbox[0]],
        [data.bbox[3], data.bbox[2]],
      ]);

      setSummary({
        distance: data.routes[0].summary.distance,
        duration: data.routes[0].summary.duration,
      });

      decodeGeometry(data.routes[0].geometry);
    } catch (error) {
      console.log(error);
    }
  }

  const contextProps = {
    setProfile,
    bounds,
    summary,
    coordinates,
    places,
  };

  useEffect(() => {
    fetchMapInfo();
  }, []);

  return (
    <MapContext.Provider value={contextProps}>{children}</MapContext.Provider>
  );
}

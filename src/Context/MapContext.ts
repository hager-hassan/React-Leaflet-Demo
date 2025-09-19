import type { LatLngTuple } from "leaflet";
import { createContext } from "react";
import type {Summary} from '../Context/MapContextProvider'
import type {Place} from '../Context/MapContextProvider'

type contextProps = {
    setProfile: (profile: string | null) => void;
    bounds: LatLngTuple[] | null;
    summary: Summary | null;
    coordinates: LatLngTuple[] | null;
    places: Place[];
}

export const MapContext = createContext<contextProps | null>(null);
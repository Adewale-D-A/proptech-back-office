import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { ReactNode } from "react";
import LoaderIcon from "../assets/icons/loader";

// Define a list of libraries to load from the Google Maps API
const libraries = ["places", "drawing", "geometry"];

// Define a function component called MapProvider that takes a children prop
export default function MapProvider({ children }: { children: ReactNode }) {
  const map_api_key = process.env.REACT_APP_GOOGLE_MAP_API_KEY || "";

  // Load the Google Maps JavaScript API asynchronously
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: map_api_key,
    libraries: libraries as Libraries,
  });
  // setKey(map_api_key);
  
  if (loadError) return <p>Encountered error while loading google maps</p>;
  if (!scriptLoaded) return <p><LoaderIcon className=" h-8 w-8"/> Map Script is loading ...</p>;
  // Return the children prop wrapped by this MapProvider component
  return <>{children}</>;
}

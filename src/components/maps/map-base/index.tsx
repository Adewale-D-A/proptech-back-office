import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { ReactNode, useMemo } from "react";
import MapProvider from "../../../providers/map-provider";

export default function Map({
  children,
  zoom = 10,
  center = { lat: 9.082, lng: 8.6753 },
}: {
  children?: ReactNode;
  zoom: number;
  center: { lat: number; lng: number };
}) {
  // default map properties
  const mapFieldsOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      fullscreenControl: false,
      scaleControl: false,
      zoomControl: false,
      mapTypeControl: true, // false to remove options to switch btwn satellite and  road maps
      mapTypeId: "roadmap", //"hybrid", "roadmap", "satellite", "terrain"
    }),
    []
  );

  return (
    <div className="w-full">
      <MapProvider>
        <GoogleMap
          // ref={mapRef}
          zoom={zoom}
          center={center}
          mapContainerClassName="w-full h-96"
          options={mapFieldsOptions}
        >
          {children}

          <MarkerF
            position={center}
            title={"apartment location"}
            draggable={false}
          />
        </GoogleMap>
      </MapProvider>
    </div>
  );
}

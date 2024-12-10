import { useCallback, useState } from "react";
import { DirectionsRenderer } from "@react-google-maps/api";
import LoadingButton from "../../button";
import Map from "../map-base";
import AddressAutocompleteInput from "../../inputs/addressAutocompleteInout";

export default function GetMapDirections({
  center,
}: {
  center: { lat: number; lng: number };
}) {
  const [searcherInput, setSearcherInput] = useState("");
  const [destination, setDestination] = useState<{
    city: string;
    state: string;
    country: string;
    longitude: number;
    latitude: number;
  }>({} as any);
  const [directionsResponse, setDirectionsResponse] = useState<any>();
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [zoom, setZoom] = useState(17);

  const calculateRoute = useCallback(async () => {
    try {
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        // origin: originRef.current!.value,
        origin: center,
        destination: {
          lat: destination?.latitude,
          lng: destination?.longitude,
        }, // { lat: 9.082, lng: 8.6753 },
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      // console.log(results);

      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance!.text);
      setDuration(results.routes[0].legs[0].duration!.text);
    } catch (error) {}
  }, [destination, center]);

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setSearcherInput("");
    setDestination({} as any);
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <Map zoom={zoom} center={center}>
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </Map>
      <div className="add-rmm-distance-ctn">
        <p className="">
          Distance: <span className="add-rmm-text-danger">{distance}</span>
        </p>
        <p className="">
          Duration: <span className="add-rmm-text-danger">{duration}</span>
        </p>
      </div>
      <AddressAutocompleteInput
        setExtraDetails={setDestination}
        setValue={setSearcherInput}
        value={searcherInput}
        placeholder="Search your location"
      />
      <div className=" w-fit flex gap-5">
        <LoadingButton
          type="button"
          variant={2}
          label="Clear Directions"
          isLoading={false}
          clickHandler={() => clearRoute()}
        />
        <LoadingButton
          type="button"
          label="Get Directions"
          isLoading={false}
          clickHandler={() => calculateRoute()}
        />
      </div>
    </div>
  );
}

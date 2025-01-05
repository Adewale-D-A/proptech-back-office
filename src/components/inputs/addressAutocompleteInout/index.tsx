import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import MapProvider from "../../../providers/map-provider";
import LoaderIcon from "../../../assets/icons/loader";

export default function AddressAutocompleteInput({
  value,
  setValue,
  label,
  placeholder,
  readOnly,
  setExtraDetails,
}: // setAddress,
{
  value: string;
  setValue: any;
  readOnly?: boolean;
  label?: string;
  placeholder?: string;
  setExtraDetails?: (details: {
    city: string;
    state: string;
    country: string;
    longitude: number;
    latitude: number;
  }) => void;
  // setAddress: Function;
}) {
  const extractCoordinates = async (address: string) => {
    setValue(address);
    const country = address?.split(",")?.at(-1)?.replace(" ", "");
    const state = address?.split(",")?.at(-2)?.replace(" ", "");
    try {
      const results = await geocodeByAddress(address);
      const { lat, lng } = await getLatLng(results[0]);
      if (setExtraDetails) {
        setExtraDetails({
          city: state || "",
          state: state || "",
          country: country || "",
          longitude: lng,
          latitude: lat,
        });
      }
    } catch (error) {}
  };

  return (
    <MapProvider>
      <PlacesAutocomplete
        value={value}
        onChange={setValue}
        onSelect={extractCoordinates}
      >
        {({
          getInputProps,
          suggestions,
          getSuggestionItemProps,
          loading,
        }: {
          getInputProps: any;
          suggestions: any;
          getSuggestionItemProps: any;
          loading: boolean;
        }) => (
          <div className="w-full">
            {label && <label htmlFor="address-searcher">{label}</label>}
            <input
              required={true}
              readOnly={readOnly}
              disabled={readOnly}
              id="location-search"
              type="text"
              {...getInputProps({
                id: "location-search",
                placeholder: placeholder ? placeholder : "apartment location",
              })}
              className="w-full p-3 disabled:border-gray-300 disabled:text-gray-300 focus:outline-none rounded-lg border  bg-gray-100/15 focus:ring-[#17594F] focus:border-[#17594F]"
            />
            <div>
              {loading && (
                <div className="">
                  <LoaderIcon className="w-6 h-6 animate-spin" />
                </div>
              )}
              <ul>
                {suggestions.map(
                  (suggestion: {
                    active: boolean;
                    placeId: string;
                    description: string;
                  }) => {
                    const className = ` text-primary-500 p-2 px-4 cursor-pointer ${
                      suggestion.active ? " bg-gray-200" : "bg-transparent"
                    }`;
                    return (
                      <li
                        key={suggestion.placeId}
                        {...getSuggestionItemProps(suggestion, {
                          className,
                        })}
                      >
                        {suggestion.description}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </MapProvider>
  );
}

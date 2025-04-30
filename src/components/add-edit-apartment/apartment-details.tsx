import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import TextInput from "../inputs/textInput";
import Select from "../inputs/select";
import TextAreaInput from "../inputs/textArea";
import MultipleFileInput from "../inputs/fileInput/multipleFile";
import AddressAutocompleteInput from "../inputs/addressAutocompleteInout";
import LoadingButton from "../button";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import {
  updateApartmentDetails,
  updateApartmentInfoId,
  clearAllApartmentInfo,
} from "../../stores/inAppDataInterations/addEditApartmentInfo";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import useGetRoomOptions from "../../services-hooks/useGetRoomOptions";
import useGetLocationGroupings from "../../services-hooks/apartment/useGetLocationGroupings";
import useGetBuildings from "../../services-hooks/apartment/useGetBuildings";
// import LinkButton from "../button/linkButton";

export default function AddEditApartmentDetails({ id }: { id?: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const storeAptDetails = useAppSelector(
    (state) => state.addEditApartmentInfo.value.data?.apartmentDetails
  );

  const [building, setBuilding] = useState("");
  const [name, setName] = useState("");
  const [roomOption, setRoomOption] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [loactionGroupId, setLocationGroupId] = useState("");
  const [location, setLocation] = useState("");
  const [aboutLocation, setAboutLocation] = useState("");
  const [extraLocationDetails, setExtraLocationDetails] = useState<{
    city: string;
    state: string;
    country: string;
    longitude: number;
    latitude: number;
  }>({ city: "", state: "", country: "", longitude: 0, latitude: 0 } as any);

  // populate apartment details interface
  useEffect(() => {
    const {
      building_id,
      name,
      roomOption,
      images,
      amount,
      location,
      aboutLocation,
      location_group,
    } = storeAptDetails;
    setBuilding(building_id);
    setName(name);
    setRoomOption(roomOption);
    setImages(images);
    setPrice(amount);
    setLocation(location);
    setAboutLocation(aboutLocation);
    setLocationGroupId(location_group);
  }, [storeAptDetails]);

  //update redux store and naviagte to next timeline
  const addApartmentDetails = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      if (images.length > 0) {
        const payload = {
          building_id: building,
          name: name,
          roomOption: roomOption,
          images: images,
          amount: price,
          location_group: loactionGroupId,
          location: location,
          aboutLocation: aboutLocation,
          ...extraLocationDetails,
        };
        dispatch(updateApartmentDetails(payload));
        dispatch(updateApartmentInfoId({ id: "updated" }));
        if (id) {
          navigate(
            `/apartments/edit-apartment/apartment-features/${id}?redirect=${
              searchParams?.get("redirect") || ""
            }`
          );
        } else {
          navigate(
            `/apartments/add-apartment/apartment-features?redirect=${
              searchParams?.get("redirect") || ""
            }`
          );
        }
      } else {
        dispatch(
          openSnackbar({ message: "image upload is required", isError: true })
        );
      }
    },
    [
      building,
      name,
      roomOption,
      images,
      price,
      location,
      aboutLocation,
      loactionGroupId,
      id,
    ]
  );

  const { data } = useGetRoomOptions({ page: 1, limit: 20 });
  const { data: buildings } = useGetBuildings({ page: 1, limit: 100 });
  const { data: location_groups } = useGetLocationGroupings({ page: 1 });

  const cancel = useCallback(() => {
    dispatch(clearAllApartmentInfo());
    navigate(
      searchParams?.get("redirect")
        ? `${searchParams?.get("redirect")}`
        : "/apartments/view-all"
    );
  }, [searchParams]);

  return (
    <form className=" flex flex-col gap-5" onSubmit={addApartmentDetails}>
      {/* apartment name */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Apartment Name</h6>
          <p className=" text-gray-500">
            The official or marketed name of the apartment for display on the
            listing.
          </p>
        </div>
        <TextInput
          inputType="text"
          isRequired={true}
          value={name}
          setValue={setName}
          id="apartment-name"
          placeholder="Apartment name"
        />
      </div>
      {/* building  */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Building</h6>
          <p className=" text-gray-500">
            The name of the building where the apartment is located.
          </p>
        </div>
        <Select
          isRequired={true}
          value={building}
          setValue={setBuilding}
          id="building"
        >
          <option value="" disabled>
            Building
          </option>
          {buildings?.map((item) => (
            <option key={item?.id} value={item?.id}>
              {item?.name}
            </option>
          ))}
        </Select>
      </div>
      {/* room options */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Room Options</h6>
          <p className=" text-gray-500">
            A summary of available room types and configurations (e.g., studio,
            1Bedroom, 2Bedroom).
          </p>
        </div>
        <Select
          isRequired={true}
          value={roomOption}
          setValue={setRoomOption}
          id="room-options"
        >
          <option value="" disabled>
            Room options
          </option>
          {data?.map((item) => (
            <option key={item?.id} value={item?.id}>
              {item?.name}
            </option>
          ))}
        </Select>
      </div>
      {/* apartment image */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Apartment Image</h6>
          <p className=" text-gray-500">
            High-quality visuals representing the interior and/or exterior of
            the apartment.
          </p>
        </div>
        <MultipleFileInput
          id="apartment-images"
          isRequired={true}
          label="Choose File"
          value={images}
          setValue={setImages}
        />
      </div>
      {/* apartment price */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Apartment Price</h6>
          <p className=" text-gray-500">
            The total rental cost per night, exclusive of service charges.
          </p>
        </div>
        <div className="w-full p-3 rounded-lg border  bg-gray-200/15 flex justify-between">
          <input
            placeholder={"Amount"}
            required
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPrice(e.target.value)
            }
            type={"text"}
            className=" w-full outline-none"
          />
          <span className=" bg-gray-200 rounded-md px-3 py-1 whitespace-nowrap">
            Per Night
          </span>
        </div>
      </div>
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Apartment Location Group</h6>
          <p className=" text-gray-500">
            A broader category or region grouping used to organize listings
            (e.g., Lekki, Yaba, Ikeja).
          </p>
        </div>
        <Select
          isRequired={true}
          value={loactionGroupId}
          setValue={setLocationGroupId}
          id="location-group"
        >
          <option value="" disabled>
            Location Group
          </option>
          {location_groups?.map((item) => (
            <option key={item?.id} value={String(item?.id)}>
              {item?.name}
            </option>
          ))}
        </Select>
      </div>
      {/* apartment location */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Apartment Location</h6>
          <p className=" text-gray-500">
            The specific address or neighborhood of the apartment.
          </p>
        </div>
        <AddressAutocompleteInput
          setExtraDetails={setExtraLocationDetails}
          value={location}
          setValue={setLocation}
        />
      </div>
      {/* about location */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-start">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">About Location</h6>
          <p className=" text-gray-500">
            A short description highlighting the characteristics and features of
            the apartment
          </p>
        </div>
        <TextAreaInput
          isRequired={true}
          value={aboutLocation}
          setValue={setAboutLocation}
          id="about-location"
          placeholder="About apartment location"
        />
      </div>

      {/* submit and cancel buttons */}
      <div className=" w-full flex justify-end mt-10">
        <div className=" flex items-center justify-between gap-4">
          <div className=" w-fit">
            {/* <LinkButton
              url={
                searchParams?.get("redirect")
                  ? `${searchParams?.get("redirect")}`
                  : "/apartments/view-all"
              }
              label="Cancel"
              variant={2}
            /> */}
            <LoadingButton
              label="Cancel"
              type="button"
              isLoading={false}
              variant={2}
              clickHandler={cancel}
            />
          </div>
          <div className=" w-fit">
            <LoadingButton
              label="Save and continue"
              type="submit"
              isLoading={false}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

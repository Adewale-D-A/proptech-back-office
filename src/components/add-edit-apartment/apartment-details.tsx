import { useNavigate } from "react-router-dom";
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
} from "../../stores/inAppDataInterations/addEditApartmentInfo";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import LinkButton from "../button/linkButton";

export default function AddEditApartmentDetails({ id }: { id?: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storeAptDetails = useAppSelector(
    (state) => state.addEditApartmentInfo.value.data.apartmentDetails
  );

  const [name, setName] = useState("");
  const [roomOption, setRoomOption] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [aboutLocation, setAboutLocation] = useState("");

  // populate apartment details interface
  useEffect(() => {
    const { name, roomOption, images, amount, location, aboutLocation } =
      storeAptDetails;
    setName(name);
    setRoomOption(roomOption);
    setImages(images);
    setPrice(amount);
    setLocation(location);
    setAboutLocation(aboutLocation);
  }, [storeAptDetails]);

  //update redux store and naviagte to next timeline
  const addApartmentDetails = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      if (images.length > 0) {
        const payload = {
          name: name,
          roomOption: roomOption,
          images: images,
          amount: price,
          location: location,
          aboutLocation: aboutLocation,
        };
        dispatch(updateApartmentDetails(payload));
        dispatch(updateApartmentInfoId({ id: "updated" }));
        if (id) {
          navigate(`/edit-apartment/apartment-features/${id}`);
        } else {
          navigate(`/add-apartment/apartment-features`);
        }
      } else {
        dispatch(
          openSnackbar({ message: "image upload is required", isError: true })
        );
      }
    },
    [name, roomOption, images, price, location, aboutLocation, id]
  );

  return (
    <form className=" flex flex-col gap-5" onSubmit={addApartmentDetails}>
      {/* apartment name */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Apartment Name</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
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
      {/* room options */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Room Options</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
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
          <option value="2-bedroom">2 Bedroom Apartment</option>
        </Select>
      </div>
      {/* apartment image */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Apartment Image</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
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
          />
          <span className=" bg-gray-200 rounded-md px-3 py-1">Per Night</span>
        </div>
      </div>
      {/* apartment location */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Apartment Location</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
          </p>
        </div>
        <AddressAutocompleteInput value={location} setValue={setLocation} />
      </div>
      {/* about location */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-start">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">About Location</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
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
            <LinkButton url="/apartments" label="Cancel" variant={2} />
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

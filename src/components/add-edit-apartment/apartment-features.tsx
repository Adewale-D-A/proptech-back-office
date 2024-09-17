import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../inputs/textInput";
import Select from "../inputs/select";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { useNavigate } from "react-router-dom";
import { updateApartmentFeatures } from "../../stores/inAppDataInterations/addEditApartmentInfo";
import LinkButton from "../button/linkButton";
import LoadingButton from "../button";

export default function AddEditApartmentFeatures({ id }: { id?: string }) {
  const dispatch = useAppDispatch();
  const naviagte = useNavigate();
  const storeAptFeatures = useAppSelector(
    (state) => state.addEditApartmentInfo.value.data.apartmentFeatures
  );

  const [noBaths, setNoBaths] = useState("");
  const [noBeds, setNoBeds] = useState("");
  const [whatToExpect, setWhatToExpect] = useState("");
  const [pointOfInterest, setPointOfInterest] = useState("");
  const [safetyAndSecurity, setSafetyAndSecurity] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");

  // populate apartment details interface
  useEffect(() => {
    const {
      noBeds,
      noBaths,
      whatToExpect,
      pointOfInterest,
      safetyAndSecurity,
      availabilityStatus,
    } = storeAptFeatures;
    setNoBaths(noBaths);
    setNoBeds(noBeds);
    setWhatToExpect(whatToExpect);
    setPointOfInterest(pointOfInterest);
    setSafetyAndSecurity(safetyAndSecurity);
    setAvailabilityStatus(availabilityStatus);
  }, []);

  //update redux store and naviagte to next timeline
  const addApartmentFeatures = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      const payload = {
        noBeds,
        noBaths,
        whatToExpect,
        pointOfInterest,
        safetyAndSecurity,
        availabilityStatus,
      };
      dispatch(updateApartmentFeatures(payload));
      if (id) {
        naviagte(`/edit-apartment/apartment-policies/${id}`);
      } else {
        naviagte(`/add-apartment/apartment-policies`);
      }
    },
    [
      noBeds,
      noBaths,
      whatToExpect,
      pointOfInterest,
      safetyAndSecurity,
      availabilityStatus,
      id,
    ]
  );

  return (
    <form className=" flex flex-col gap-5" onSubmit={addApartmentFeatures}>
      {/* number of bathroom*/}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Number of Bathroom</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
          </p>
        </div>
        <Select
          isRequired={true}
          value={noBaths}
          setValue={setNoBaths}
          id="no-of-baths"
        >
          <option value="" disabled>
            Select number of bathroom
          </option>
          {Array.from({ length: 8 }, (_, index) => (
            <option key={index} value={`${index + 1}`}>
              {index + 1}
            </option>
          ))}
        </Select>
      </div>
      {/* number of bedroom */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Number of Bedroom</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
          </p>
        </div>
        <Select
          isRequired={true}
          value={noBeds}
          setValue={setNoBeds}
          id="no-of-beds"
        >
          <option value="" disabled>
            Select number of bedroom
          </option>
          {Array.from({ length: 8 }, (_, index) => (
            <option key={index} value={`${index + 1}`}>
              {index + 1}
            </option>
          ))}
        </Select>
      </div>
      {/* what to expect */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">What to Expect</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
          </p>
        </div>
        <Select
          isRequired={true}
          value={whatToExpect}
          setValue={setWhatToExpect}
          id="what-to-expect"
        >
          <option value="" disabled>
            Select
          </option>
          <option value={`huge-space`}>Expect a huge living space</option>
        </Select>
      </div>
      {/* point of interest*/}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Point of Interest</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
          </p>
        </div>
        <TextInput
          inputType="text"
          isRequired={true}
          value={pointOfInterest}
          setValue={setPointOfInterest}
          id="point-of-interest"
          placeholder="Enter point of interest"
        />
      </div>
      {/* safety and security */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Select Security Options</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
          </p>
        </div>
        <Select
          isRequired={true}
          value={safetyAndSecurity}
          setValue={setSafetyAndSecurity}
          id="safety-and-security"
        >
          <option value="" disabled>
            Select Security Options
          </option>
          <option value={`security-door`}>Gate close at 10pm</option>
        </Select>
      </div>
      {/* savailability status */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Availability Status</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
          </p>
        </div>
        <Select
          isRequired={true}
          value={availabilityStatus}
          setValue={setAvailabilityStatus}
          id="availability-status"
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value={`availablle-25th`}>December 25th</option>
        </Select>
      </div>

      {/* previous and continue buttons */}
      <div className=" w-full flex justify-end mt-10">
        <div className=" flex items-center justify-between gap-4">
          <div className=" w-fit">
            <LinkButton
              url={
                id
                  ? `/edit-apartment/apartment-details/${id}`
                  : `/add-apartment/apartment-details`
              }
              label="Previous Page"
              variant={2}
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

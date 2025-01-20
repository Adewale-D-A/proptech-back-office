import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../inputs/textInput";
import Select from "../inputs/select";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { useNavigate } from "react-router-dom";
import { updateApartmentFeatures } from "../../stores/inAppDataInterations/addEditApartmentInfo";
import LinkButton from "../button/linkButton";
import LoadingButton from "../button";
import MultipleSelect from "../inputs/select/multipleSelect";
import useGetSafetyAndSecurities from "../../services-hooks/useGetSafetyAndSecurities";
import useGetAmenities from "../../services-hooks/useGetAmenities";
import useGetExtraOptions from "../../services-hooks/useGetExtraOptions";

export default function AddEditApartmentFeatures({ id }: { id?: string }) {
  const dispatch = useAppDispatch();
  const naviagte = useNavigate();
  const storeAptFeatures = useAppSelector(
    (state) => state.addEditApartmentInfo.value.data.apartmentFeatures
  );

  const {
    data: safetyAndSecurityOptions,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction,
    pagination,
  } = useGetSafetyAndSecurities({ page: 1, limit: 20 });
  const {
    data: amenitiesOptions,
    isLoading: amenitiesLoading,
    isFailed: amenitiesFailed,
    setIsFailed: amenitiesSetFailed,
    retryFunction: amenitiesRetry,
    pagination: amenitiesPagination,
  } = useGetAmenities({ page: 1, limit: 20 });
  const {
    data: extraOptionsItems,
    isLoading: extraOptionLoading,
    isFailed: extraOptionFailed,
    setIsFailed: extraOptionSetFailed,
    retryFunction: extraOptionRetry,
  } = useGetExtraOptions({ page: 1, limit: 20 });

  const [noBaths, setNoBaths] = useState("");
  const [noBeds, setNoBeds] = useState("");
  const [whatToExpect, setWhatToExpect] = useState<string[]>([]);
  const [extraOptions, setExtraOptions] = useState<string[]>([]);
  const [pointOfInterest, setPointOfInterest] = useState("");
  const [safetyAndSecurity, setSafetyAndSecurity] = useState<string[]>([]);
  const [availabilityStatus, setAvailabilityStatus] = useState("");

  // populate apartment details interface
  useEffect(() => {
    const {
      noBeds,
      noBaths,
      whatToExpect,
      pointOfInterest,
      extraOptions,
      safetyAndSecurity,
      availabilityStatus,
    } = storeAptFeatures;
    setNoBaths(noBaths || "");
    setNoBeds(noBeds || "");
    setWhatToExpect(whatToExpect || []);
    setExtraOptions(extraOptions || []);
    setPointOfInterest(pointOfInterest || "");
    setSafetyAndSecurity(safetyAndSecurity || []);
    setAvailabilityStatus(availabilityStatus || "available");
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
        extraOptions,
        safetyAndSecurity,
        availabilityStatus,
      };
      dispatch(updateApartmentFeatures(payload));
      if (id) {
        naviagte(`/apartments/edit-apartment/apartment-policies/${id}`);
      } else {
        naviagte(`/apartments/add-apartment/apartment-policies`);
      }
    },
    [
      noBeds,
      noBaths,
      whatToExpect,
      pointOfInterest,
      extraOptions,
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
        <MultipleSelect
          value={whatToExpect}
          setValue={setWhatToExpect}
          options={amenitiesOptions?.map((item) => ({
            id: String(item?.id),
            label: item?.name,
          }))}
          label="Select Security Options"
        />
      </div>
      {/* extra options */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Extra Options</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
          </p>
        </div>
        <MultipleSelect
          value={extraOptions}
          setValue={setExtraOptions}
          options={extraOptionsItems?.map((item) => ({
            id: String(item?.id),
            label: item?.name,
          }))}
          label="Select Extra Options"
        />
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
        <MultipleSelect
          value={safetyAndSecurity}
          setValue={setSafetyAndSecurity}
          options={safetyAndSecurityOptions?.map((item) => ({
            id: String(item?.id),
            label: item?.name,
          }))}
          label="Select Security Options"
        />
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
          <option value={`available`}>Yes</option>
          <option value={`unavailable`}>No</option>
        </Select>
      </div>

      {/* previous and continue buttons */}
      <div className=" w-full flex justify-center md:justify-end mt-10">
        <div className=" flex items-center flex-col md:flex-row justify-between gap-4">
          <div className=" w-fit">
            <LinkButton
              url={
                id
                  ? `/apartments/edit-apartment/apartment-details/${id}`
                  : `/apartments/add-apartment/apartment-details`
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

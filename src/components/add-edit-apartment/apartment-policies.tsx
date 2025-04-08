import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { updateApartmentPolicies } from "../../stores/inAppDataInterations/addEditApartmentInfo";
import LinkButton from "../button/linkButton";
import LoadingButton from "../button";
import MultipleSelect from "../inputs/select/multipleSelect";
import useGetHouseRules from "../../services-hooks/useGetAllRules";
import Select from "../inputs/select";
import { requestPayload } from "../../types/apiData/apartment/request-payload";
import purgeEmptyPayload from "../../utils/remove-empty-payload";

export default function AddEditApartmentPolicies({
  id,
  isSubmitting,
  handleSubmit,
}: {
  id?: string;
  isSubmitting: boolean;
  handleSubmit: (payload: requestPayload) => void;
}) {
  const dispatch = useAppDispatch();
  const storeAptDataset = useAppSelector(
    (state) => state.addEditApartmentInfo.value.data
  );
  const { data: houseRules } = useGetHouseRules({ page: 1, limit: 20 });

  const [rules, setRules] = useState<string[]>([]);
  const [cancellationPolicy, setCancellationPolicy] = useState("");
  const [maxGuest, setMaxGuests] = useState("");
  const [cautionFee, setCautionFee] = useState("");
  // populate apartment details interface
  useEffect(() => {
    const { rules, cancellationPolicies, maxGuest, cautionFee } =
      storeAptDataset.apartmentPolicy;
    setRules(rules || []);
    setCancellationPolicy(cancellationPolicies || "");
    setMaxGuests(maxGuest || "");
    setCautionFee(cautionFee || "");
  }, []);

  //update redux store and naviagte to next timeline
  const uploadApartmentInformation = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const { apartmentDetails, apartmentFeatures } = storeAptDataset;
      const {
        building_id,
        name,
        roomOption,
        images,
        amount,
        location_group,
        location,
        aboutLocation,
        city,
        state,
        country,
        longitude,
        latitude,
      } = apartmentDetails;
      const {
        noBeds,
        noBaths,
        whatToExpect,
        pointOfInterest,
        extraOptions,
        safetyAndSecurity,
        availabilityStatus,
      } = apartmentFeatures;
      const uploadPayload = {
        name,
        description: aboutLocation,
        location: location,
        currency: "NGN",
        price: amount,
        caution_fee: cautionFee,
        tax_fee: "",
        no_of_bedrooms: noBeds,
        no_of_bathrooms: noBaths,
        max_guests: maxGuest,
        point_of_interest: pointOfInterest,
        cancellation_policy: cancellationPolicy,
        availability_status: availabilityStatus,
        rules: rules,
        amenities: whatToExpect,
        room_option: roomOption,
        safeties: safetyAndSecurity,
        images: images,
        extra_option_items: extraOptions,
        location_group, //ID
        building_id,
        city,
        state,
        country,
        longitude,
        latitude,
      };

      const purgePayloadResult = purgeEmptyPayload({ payload: uploadPayload });
      dispatch(
        updateApartmentPolicies({
          rules,
          cautionFee: cautionFee,
          maxGuest: maxGuest,
          cancellationPolicies: cancellationPolicy,
        })
      );
      try {
        handleSubmit(purgePayloadResult);
      } catch (error) {}
    },
    [rules, cancellationPolicy, maxGuest, cautionFee, storeAptDataset, id]
  );

  return (
    <form
      className=" flex flex-col gap-5"
      onSubmit={uploadApartmentInformation}
    >
      {/* apartment caution fee */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Caution Fee</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
          </p>
        </div>
        <div className="w-full p-3 rounded-lg border  bg-gray-200/15 flex justify-between">
          <input
            placeholder={"Amount"}
            required
            value={cautionFee}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCautionFee(e.target.value)
            }
            type={"text"}
            className=" w-full outline-none"
          />
          <span className=" bg-gray-200 rounded-md px-3 py-1 whitespace-nowrap">
            Per Night
          </span>
        </div>
      </div>
      {/* apartment max guests */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Maximum Number of Guest</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
          </p>
        </div>
        <Select
          isRequired={true}
          value={maxGuest}
          setValue={setMaxGuests}
          id="no-of-baths"
        >
          <option value="" disabled>
            Select maximum number of guests
          </option>
          {Array.from({ length: 8 }, (_, index) => (
            <option key={index} value={`${index + 1}`}>
              {index + 1}
            </option>
          ))}
        </Select>
      </div>
      {/* number of bathroom*/}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Apartment Rules</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
          </p>
        </div>
        <MultipleSelect
          value={rules}
          setValue={setRules}
          options={houseRules?.map((item) => ({
            id: String(item?.id),
            label: item?.name,
          }))}
          label="Select Rules"
        />
      </div>
      {/* cancellation policies */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-start">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Cancellation Policies</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
          </p>
        </div>
        {/* <MultipleSelect
          value={cancellationPolicy}
          setValue={setCancellationPolicy}
          options={cancellationOptions}
          label="Select Cancellation Policies"
        /> */}
        <Select
          isRequired={true}
          value={cancellationPolicy}
          setValue={setCancellationPolicy}
          id="cancellation-policy"
        >
          <option value="" disabled>
            Select cancellation policy
          </option>
          <option value="2 days notice">2 days notice</option>
          <option value="7 days notice">7 days notice</option>
        </Select>
      </div>

      {/* submit and cancel buttons */}
      <div className=" w-full flex justify-center md:justify-end mt-10">
        <div className=" flex items-center flex-col md:flex-row justify-between gap-4">
          <div className=" w-fit">
            <LinkButton
              url={
                id
                  ? `/apartments/edit-apartment/apartment-features/${id}`
                  : `/apartments/add-apartment/apartment-features`
              }
              label="Previous Page"
              variant={2}
            />
          </div>

          <div className=" w-fit">
            <LoadingButton
              label="Save and upload"
              type="submit"
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import Select from "../inputs/select";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { useNavigate } from "react-router-dom";
import {
  clearAllApartmentInfo,
  updateApartmentPolicies,
} from "../../stores/inAppDataInterations/addEditApartmentInfo";
import LinkButton from "../button/linkButton";
import LoadingButton from "../button";
import TextAreaInput from "../inputs/textArea";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import {
  addApartmentToList,
  replaceApartmentInList,
} from "../../stores/apiData/apartment-lists";

export default function AddEditApartmentPolicies({ id }: { id?: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storeAptDataset = useAppSelector(
    (state) => state.addEditApartmentInfo.value.data
  );

  const [rules, setRules] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  // populate apartment details interface
  useEffect(() => {
    const { rules, cancellationPolicies } = storeAptDataset.apartmentPolicy;
    setRules(rules);
    setCancellationPolicy(cancellationPolicies);
  }, []);

  //update redux store and naviagte to next timeline
  const uploadApartmentInformation = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      const { apartmentDetails, apartmentFeatures } = storeAptDataset;
      const payload = {
        ...apartmentDetails,
        ...apartmentFeatures,
        rules,
        cancellationPolicy,
      };
      dispatch(
        updateApartmentPolicies({
          rules,
          cancellationPolicies: cancellationPolicy,
        })
      );
      try {
        if (id) {
          console.log({ payload });
          dispatch(
            openSnackbar({
              message: "Apartment informaton successfully updated",
              isError: false,
            })
          );
          dispatch(
            replaceApartmentInList({
              id: id,
              image: apartmentDetails?.images[0],
              name: apartmentDetails?.name,
              location: apartmentDetails?.location,
              noOfGuests: 0,
              category: 3,
              characteristics: 2,
              units: 2,
              status: apartmentFeatures?.availabilityStatus,
            })
          );
        } else {
          dispatch(
            openSnackbar({
              message: "Apartment informaton successfully created",
              isError: false,
            })
          );
          dispatch(
            addApartmentToList({
              id: "random-data",
              image: apartmentDetails?.images[0],
              name: apartmentDetails?.name,
              location: apartmentDetails?.location,
              noOfGuests: 0,
              category: 3,
              characteristics: 2,
              units: 2,
              status: apartmentFeatures?.availabilityStatus,
            })
          );
        }
        dispatch(clearAllApartmentInfo());
        navigate("/apartments");
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    },
    [rules, cancellationPolicy, storeAptDataset, id]
  );

  return (
    <form
      className=" flex flex-col gap-5"
      onSubmit={uploadApartmentInformation}
    >
      {/* number of bathroom*/}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <div className=" max-w-md">
          <h6 className=" text-lg font-semibold">Apartment Rules</h6>
          <p className=" text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            labore.
          </p>
        </div>
        <Select
          isRequired={true}
          value={rules}
          setValue={setRules}
          id="no-of-baths"
        >
          <option value="" disabled>
            Select Apartment Rules
          </option>
          <option value="no-smoking">No Smoking</option>
          <option value="no-loud-music">No Loud music</option>
        </Select>
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
        <TextAreaInput
          isRequired={true}
          value={cancellationPolicy}
          setValue={setCancellationPolicy}
          id="cancellation-policies"
          placeholder="Cancellation Policies"
        />
      </div>

      {/* submit and cancel buttons */}
      <div className=" w-full flex justify-end mt-10">
        <div className=" flex items-center justify-between gap-4">
          <div className=" w-fit">
            <LinkButton
              url={
                id
                  ? `/edit-apartment/apartment-features/${id}`
                  : `/add-apartment/apartment-features`
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

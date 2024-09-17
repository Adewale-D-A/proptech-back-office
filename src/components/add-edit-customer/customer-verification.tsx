import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../inputs/textInput";
import LoadingButton from "../button";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import LinkButton from "../button/linkButton";
import { updateCustomerVerification } from "../../stores/inAppDataInterations/addEditCustomerInfo";

export default function AddEditCustomerVerification({ id }: { id?: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storeAptDetails = useAppSelector(
    (state) => state.addEditCustomerInfo.value.data.customerVerification
  );

  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idImage, setIdImage] = useState("");
  const [pinGenerated, setPinGenerated] = useState("");
  const [notes, setNotes] = useState("");

  // populate apartment details interface
  useEffect(() => {
    const { placeOfBirth, idType, idNumber, idImage, pinGenerated, notes } =
      storeAptDetails;
    setPlaceOfBirth(placeOfBirth);
    setIdType(idType);
    setIdNumber(idNumber);
    setIdImage(idImage);
    setPinGenerated(pinGenerated);
    setNotes(notes);
  }, [storeAptDetails]);

  //update redux store and naviagte to next timeline
  const addCustoemrDetails = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      if (idImage) {
        const payload = {
          placeOfBirth,
          idType,
          idNumber,
          idImage,
          pinGenerated,
          notes,
        };
        dispatch(updateCustomerVerification(payload));
        if (id) {
          navigate(`/edit-customer/customer-verification/${id}`);
        } else {
          navigate(`/add-customer/customer-verification`);
        }
      } else {
        dispatch(
          openSnackbar({ message: "image upload is required", isError: true })
        );
      }
    },
    [placeOfBirth, idType, idNumber, idImage, pinGenerated, notes, id]
  );

  return (
    <form className=" flex flex-col gap-5" onSubmit={addCustoemrDetails}>
      {/* apartment name */}
      <div className=" w-full grid grid-cols-1  gap-3 md:gap-5 items-end">
        <TextInput
          inputType="text"
          isRequired={true}
          value={placeOfBirth}
          setValue={setPlaceOfBirth}
          id="place-of-birth"
          placeholder="Place of birth"
          label="Place of Birth"
        />
        <TextInput
          inputType="text"
          isRequired={true}
          value={idNumber}
          setValue={setIdNumber}
          id="id-number"
          placeholder="id number"
          label="id number*"
        />
      </div>

      {/* submit and cancel buttons */}
      <div className=" w-full flex justify-end mt-10">
        <div className=" flex items-center justify-between w-full max-w-sm gap-4">
          <LinkButton url="/customers" label="Back" variant={2} />
          <LinkButton url="#" label="Skip & Continue" variant={2} />
          <LoadingButton
            label="Save and continue"
            type="submit"
            isLoading={false}
          />
        </div>
      </div>
    </form>
  );
}

import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../inputs/textInput";
import LoadingButton from "../button";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import LinkButton from "../button/linkButton";
import { updateCustomerVerification } from "../../stores/inAppDataInterations/addEditCustomerInfo";
import Select from "../inputs/select";
import FileInput from "../inputs/fileInput";
import TextAreaInput from "../inputs/textArea";

export default function AddEditCustomerVerification({ id }: { id?: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storeAptDetails = useAppSelector(
    (state) => state.addEditCustomerInfo.value.data.customerVerification
  );

  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idImage, setIdImage] = useState<{
    name: string;
    size: number;
    preview: string;
  }>({} as any);
  const [pinGenerated, setPinGenerated] = useState("");
  const [notes, setNotes] = useState("");

  // populate apartment details interface
  useEffect(() => {
    const {
      place_of_birth,
      id_type,
      id_number,
      identity_document,
      password,
      notes,
    } = storeAptDetails;
    setPlaceOfBirth(place_of_birth);
    setIdType(id_type);
    setIdNumber(id_number);
    setIdImage(identity_document);
    setPinGenerated(password);
    setNotes(notes);
  }, [storeAptDetails]);

  const generatePassword = useCallback(() => {
    const randomString = Math.random().toString(20).substr(2, 8);
    setPinGenerated(randomString);
  }, []);
  //update redux store and naviagte to next timeline
  const addCustoemrDetails = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      if (idImage) {
        const payload = {
          place_of_birth: placeOfBirth,
          id_type: idType,
          id_number: idNumber,
          identity_document: idImage,
          password: pinGenerated,
          notes,
        };
        dispatch(updateCustomerVerification(payload));
        if (id) {
          navigate(`/customers/edit-customer/customer-company/${id}`);
        } else {
          navigate(`/customers/add-customer/customer-company`);
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
    <form
      className=" flex flex-col gap-5 items-center"
      onSubmit={addCustoemrDetails}
    >
      <div className="w-full flex flex-col gap-5 max-w-screen-lg">
        <div className=" w-full grid grid-cols-1  gap-3 md:gap-5 items-end">
          <TextInput
            inputType="text"
            isRequired={false}
            value={placeOfBirth}
            setValue={setPlaceOfBirth}
            id="place-of-birth"
            placeholder=""
            label="Place of Birth"
          />
          <Select
            isRequired={false}
            value={idType}
            setValue={setIdType}
            id="id-type"
            label="ID type"
          >
            <option value="" disabled>
              ID Type
            </option>
            <option value="voter-card">Voter's Card</option>
            <option value="driving-license">Driving License</option>
            <option value="passport">Passport</option>
          </Select>
          <TextInput
            inputType="text"
            isRequired={false}
            value={idNumber}
            setValue={setIdNumber}
            id="id-number"
            placeholder=""
            label="ID Number"
          />
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 items-end gap-3">
            <FileInput
              value={idImage}
              setValue={setIdImage}
              label="ID Scan Image"
              isRequired={false}
              id="id-scan-image"
            />
            {!id && (
              <div className=" flex items-end">
                <TextInput
                  inputType="text"
                  isRequired={true}
                  value={pinGenerated}
                  setValue={setPinGenerated}
                  id="pin-password"
                  placeholder=""
                  label="Password"
                />
                <div className=" w-fit">
                  <LoadingButton
                    type="button"
                    variant={3}
                    className="border border-primary rounded-md hover:border-primary/30 hover:text-primary transition-all"
                    isLoading={false}
                    label="Generate Password"
                    clickHandler={() => generatePassword()}
                  />
                </div>
              </div>
            )}
          </div>
          <TextAreaInput
            isRequired={false}
            value={notes}
            setValue={setNotes}
            id="notes"
            placeholder=""
            label="Notes"
          />
        </div>
      </div>

      {/* submit and cancel buttons */}
      <div className=" w-full flex justify-end mt-10">
        <div className=" flex items-center gap-4">
          <div className=" w-fit">
            <LinkButton
              url={
                id
                  ? `/customers/edit-customer/customer-details/${id}`
                  : "/customers/add-customer/customer-details"
              }
              label="Back"
              variant={2}
            />
          </div>
          <div className=" w-fit">
            <LinkButton
              url={
                id
                  ? `/customers/edit-customer/customer-company/${id}`
                  : "/customers/add-customer/customer-company"
              }
              label="Skip & Continue"
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

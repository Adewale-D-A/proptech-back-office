import { useNavigate } from "react-router-dom";
import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import TextInput from "../inputs/textInput";
import AddressAutocompleteInput from "../inputs/addressAutocompleteInout";
import LoadingButton from "../button";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import LinkButton from "../button/linkButton";
import { updateCustomerDetails } from "../../stores/inAppDataInterations/addEditCustomerInfo";

export default function AddEditCustomerDetails({ id }: { id?: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storeAptDetails = useAppSelector(
    (state) => state.addEditCustomerInfo.value.data.customerDetails
  );

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // populate apartment details interface
  useEffect(() => {
    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      profileImg,
      gender,
      dob,
      country,
      state,
      city,
      address,
    } = storeAptDetails;
    setFirstname(firstname);
    setLastname(lastname);
    setEmail(email);
    setPhoneNumber(phoneNumber);
    setProfileImg(profileImg);
    setGender(gender);
    setDob(dob);
    setCountry(country);
    setState(state);
    setCity(city);
    setAddress(address);
  }, [storeAptDetails]);

  //update redux store and naviagte to next timeline
  const addCustoemrDetails = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      if (profileImg) {
        const payload = {
          firstname,
          lastname,
          email,
          phoneNumber,
          profileImg,
          gender,
          dob,
          country,
          state,
          city,
          address,
        };
        dispatch(updateCustomerDetails(payload));
        if (id) {
          navigate(`/edit-customer/customer-features/${id}`);
        } else {
          navigate(`/add-customer/customer-features`);
        }
      } else {
        dispatch(
          openSnackbar({ message: "image upload is required", isError: true })
        );
      }
    },
    [
      firstname,
      lastname,
      email,
      phoneNumber,
      profileImg,
      gender,
      dob,
      country,
      state,
      city,
      address,
      id,
    ]
  );

  return (
    <form className=" flex flex-col gap-5" onSubmit={addCustoemrDetails}>
      {/* apartment name */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
        <TextInput
          inputType="text"
          isRequired={true}
          value={firstname}
          setValue={setFirstname}
          id="first-name"
          placeholder="First name"
          label="First Name*"
        />
        <TextInput
          inputType="text"
          isRequired={true}
          value={lastname}
          setValue={setLastname}
          id="last-name"
          placeholder="Last name"
          label="Last Name*"
        />
        <TextInput
          inputType="email"
          isRequired={true}
          value={email}
          setValue={setLastname}
          id="email"
          placeholder="Email address"
          label="Email Address*"
        />
      </div>
      <AddressAutocompleteInput value={address} setValue={setAddress} />

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

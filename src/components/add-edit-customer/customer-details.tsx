import { useNavigate, useSearchParams } from "react-router-dom";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../inputs/textInput";
import AddressAutocompleteInput from "../inputs/addressAutocompleteInout";
import LoadingButton from "../button";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import LinkButton from "../button/linkButton";
import {
  updateCustomerDetails,
  updateCustomerInfoId,
} from "../../stores/inAppDataInterations/addEditCustomerInfo";
import PhoneInput from "../inputs/phoneInput";
import FileInput from "../inputs/fileInput";
import Select from "../inputs/select";
import DateInput from "../inputs/dateInput";
import countries from "../../assets/Countries.json";

export default function AddEditCustomerDetails({ id }: { id?: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storeAptDetails = useAppSelector(
    (state) => state.addEditCustomerInfo.value.data.customerDetails
  );

  const [usertype, setUsertype] = useState("user");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+234+Nigeria");
  const [profileImg, setProfileImg] = useState<{
    name: string;
    size: number;
    preview: string;
  }>({} as any);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // populate apartment details interface
  useEffect(() => {
    const {
      type,
      first_name,
      last_name,
      email,
      phone,
      profile_photo,
      gender,
      dob,
      country,
      state,
      city,
      address,
    } = storeAptDetails;
    setUsertype(type || "user");
    setFirstname(first_name || "");
    setLastname(last_name || "");
    setEmail(email || "");
    setPhoneNumber(phone || "");
    setProfileImg(profile_photo);
    setGender(gender || "");
    setDob(dob || "");
    setCountry(country);
    setState(state);
    setCity(city);
    setAddress(address);
  }, [storeAptDetails]);

  //update redux store and naviagte to next timeline
  const addCustomerDetails = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      const payload = {
        type: usertype,
        first_name: firstname,
        last_name: lastname,
        email,
        phone: phoneNumber?.includes("+")
          ? phoneNumber
          : `+${countryCode?.split("+")[1]}${phoneNumber}`,
        profile_photo: profileImg?.name ? profileImg : "",
        gender,
        dob,
        country,
        state,
        city,
        address,
      };
      dispatch(updateCustomerDetails(payload));
      dispatch(updateCustomerInfoId({ id: "updated" }));
      if (id) {
        navigate(`/customers/edit-customer/customer-verification/${id}`);
      } else {
        navigate(`/customers/add-customer/customer-verification`);
      }
    },
    [
      usertype,
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
    <form
      className="w-full flex flex-col gap-5 items-center"
      onSubmit={addCustomerDetails}
    >
      <div className="w-full flex flex-col gap-5 max-w-screen-lg">
        <div>
          <Select
            isRequired={true}
            value={usertype}
            setValue={setUsertype}
            id="user-type"
            label="Usertype *"
          >
            <option value="" disabled>
              User type
            </option>
            <option value="owner">Owner user</option>
            <option value="user">Customer user</option>
          </Select>
        </div>
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
          <TextInput
            inputType="text"
            isRequired={true}
            value={firstname}
            setValue={setFirstname}
            id="first-name"
            placeholder=""
            label="First Name*"
          />
          <TextInput
            inputType="text"
            isRequired={true}
            value={lastname}
            setValue={setLastname}
            id="last-name"
            placeholder=""
            label="Last Name*"
          />
          <TextInput
            inputType="email"
            isRequired={true}
            value={email}
            setValue={setEmail}
            id="email"
            placeholder=""
            label="Email Address*"
          />
          <PhoneInput
            isRequired={true}
            number={phoneNumber}
            setNumber={setPhoneNumber}
            coutryCode={countryCode}
            setCountryCode={setCountryCode}
            id="phone-number"
            label="Phone number*"
          />
          <FileInput
            value={profileImg}
            setValue={setProfileImg}
            label="Profile Image"
            isRequired={false}
            id="profile-image"
          />
          <Select
            isRequired={true}
            value={gender}
            setValue={setGender}
            id="gender"
            label="Gender"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
          <DateInput
            inputType="date"
            isRequired={true}
            value={dob}
            setValue={setDob}
            id="dob"
            placeholder=""
            label="Date of Birth"
          />
          <Select
            isRequired={false}
            value={country}
            setValue={setCountry}
            id="country"
            label="Country *"
          >
            <option value="" disabled>
              Country
            </option>
            {countries.map((country) => (
              <option key={country.code} value={`${country?.name}`}>
                {`${country?.flag} - ${country?.name}`}
              </option>
            ))}
          </Select>
          <TextInput
            inputType="text"
            isRequired={false}
            value={state}
            setValue={setState}
            id="state"
            placeholder=""
            label="State/Province"
          />
          <TextInput
            inputType="text"
            isRequired={false}
            value={city}
            setValue={setCity}
            id="city"
            placeholder=""
            label="City"
          />
        </div>
        <AddressAutocompleteInput
          label="Address"
          placeholder="Search Address"
          value={address}
          setValue={setAddress}
        />
      </div>

      {/* submit and cancel buttons */}
      <div className=" w-full flex justify-end mt-10">
        <div className=" flex items-center gap-4">
          <div className=" w-fit">
            <LinkButton
              url={
                searchParams?.get("redirect")
                  ? `${searchParams?.get("redirect")}`
                  : `/customers`
              }
              label="Back"
              variant={2}
            />
          </div>
          {/* <div className=" w-fit">
            <LinkButton
              url={
                id
                  ? `/customers/edit-customer/customer-verification/${id}`
                  : "/customers/add-customer/customer-verification"
              }
              label="Skip & Continue"
              variant={2}
            />
          </div> */}
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

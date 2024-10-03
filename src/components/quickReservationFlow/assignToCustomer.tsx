import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../inputs/textInput";
import LoadingButton from "../button";
import Search from "../inputs/search";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import {
  closeAssignToCustomerView,
  updateAssignToCustomerData,
} from "../../stores/inAppDataInterations/assignCustomer";
import PhoneInput from "../inputs/phoneInput";

export default function AssignCustomer() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.assignCustomer.value);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] =
    useState("+234+Nigeria");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [searchedUser, setSearcchedUser] = useState({} as any);
  const [isAssigning, setIsAssigning] = useState(false);

  useEffect(() => {
    const {
      userId,
      firstname,
      lastname,
      email,
      countryCode,
      phoneNumber,
      address,
    } = data;
    if (firstname) {
      setFirstName(firstname);
      setLastname(lastname);
      setEmail(email);
      setAddress(address);
      setSelectedCountryCode(countryCode);
      setPhoneNumber(phoneNumber);
    }
  }, [data]);

  useEffect(() => {
    const { firstname, lastname, email, phoneNumber, address } = searchedUser;
    if (firstname) {
      setFirstName(firstname);
      setLastname(lastname);
      setEmail(email);
      setAddress(address);
      setSelectedCountryCode("+234+Nigeria");
      setPhoneNumber(phoneNumber);
    }
  }, [searchedUser]);

  const close = useCallback(() => {
    dispatch(closeAssignToCustomerView());
  }, []);

  const assignToCustomer = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsAssigning(true);
      try {
        dispatch(
          updateAssignToCustomerData({
            userId: "",
            firstname,
            lastname,
            email,
            phoneNumber,
            countryCode: selectedCountryCode,
            address,
          })
        );
        dispatch(closeAssignToCustomerView());
      } catch (error) {
      } finally {
        setIsAssigning(false);
      }
    },
    [firstname, lastname, email, phoneNumber, selectedCountryCode, address]
  );

  return (
    <div className="w-full">
      <form className=" flex flex-col gap-5" onSubmit={assignToCustomer}>
        <div className=" w-full grid grid-cols-1 gap-5">
          <label htmlFor="exisitng-customer" className=" font-semibold">
            Existing User
          </label>
          <Search
            id="exisitng-customer"
            placeholder="Exisitng customer name, ID, etc..."
            componentId="customer"
            setValue={setSearcchedUser}
          />
        </div>
        <div className=" w-full grid grid-cols-1 gap-5">
          <label htmlFor="" className=" font-semibold">
            Fill these details
          </label>
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <TextInput
              inputType="text"
              isRequired={true}
              value={firstname}
              setValue={setFirstName}
              id="firstname"
              placeholder="First name"
            />
            <TextInput
              inputType="text"
              isRequired={true}
              value={lastname}
              setValue={setLastname}
              id="lastname"
              placeholder="Last name"
            />
          </div>
          <TextInput
            inputType="email"
            isRequired={true}
            value={email}
            setValue={setEmail}
            id="customer-email"
            placeholder="Customer Email"
          />

          <PhoneInput
            coutryCode={selectedCountryCode}
            setCountryCode={setSelectedCountryCode}
            number={phoneNumber}
            setNumber={setPhoneNumber}
            label={""}
            isRequired={true}
            id="phone-number"
          />
          <TextInput
            inputType="text"
            isRequired={true}
            value={address}
            setValue={setAddress}
            id="customer-address"
            placeholder="Enter address"
          />
        </div>
        <div className=" flex items-center gap-5">
          <LoadingButton
            type="button"
            label="Cancel"
            variant={2}
            disabled={false}
            isLoading={false}
            clickHandler={() => close()}
          />

          <LoadingButton
            type="submit"
            label="Apply"
            disabled={false}
            isLoading={isAssigning}
          />
        </div>
      </form>
    </div>
  );
}

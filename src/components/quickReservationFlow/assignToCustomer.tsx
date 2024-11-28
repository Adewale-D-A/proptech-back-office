import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../inputs/textInput";
import LoadingButton from "../button";
import Search from "../inputs/search";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import {
  clearAssignToCustomerData,
  closeAssignToCustomerView,
  updateAssignToCustomerData,
} from "../../stores/inAppDataInterations/assignCustomer";
import PhoneInput from "../inputs/phoneInput";
import { customersById } from "../../types/apiData/customers";
import AddressAutocompleteInput from "../inputs/addressAutocompleteInout";
import BinIcon from "../../assets/icons/bin-icon";

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

  const [searchedUser, setSearcchedUser] = useState<customersById>({} as any);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const { id, first_name, last_name, email, phone, address } = data || {};
    if (first_name) {
      setFirstName(first_name);
      setLastname(last_name || "");
      setEmail(email || "");
      setAddress(address || "");
      // setSelectedCountryCode(countryCode);
      setPhoneNumber(phone || "");
      setIsSelected(id ? true : false);
    } else {
      setIsSelected(false);
    }
  }, [data]);

  useEffect(() => {
    const { id, first_name, last_name, email, phone, address } =
      searchedUser || {};
    if (first_name) {
      setFirstName(first_name);
      setLastname(last_name || "");
      setEmail(email || "");
      setAddress(address || "");
      // setSelectedCountryCode(countryCode);
      setPhoneNumber(phone || "");
      setIsSelected(id ? true : false);
    }
  }, [searchedUser]);

  const close = useCallback(() => {
    dispatch(closeAssignToCustomerView());
    dispatch(clearAssignToCustomerData());
  }, []);

  const assignToCustomer = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const splitDigits = phoneNumber.split("");
      if (splitDigits[0] === "0") {
        splitDigits.shift();
      }
      const phoneAndCountryCode =
        `+${selectedCountryCode?.split("+")[1]}` + splitDigits.join("");
      const payload = {
        first_name: firstname,
        last_name: lastname,
        email,
        phone: phoneAndCountryCode,
        address,
      };
      dispatch(
        updateAssignToCustomerData(searchedUser?.id ? searchedUser : payload)
      );
      dispatch(closeAssignToCustomerView());
    },
    [searchedUser, lastname, email, phoneNumber, selectedCountryCode, address]
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
          <label htmlFor="" className=" font-semibold flex items-center gap-3">
            <span>Fill these details</span>
            {isSelected && (
              <button
                type="button"
                className=" border px-3 p-1 rounded-md font-normal flex items-center gap-2 hover:text-red-500 hover:border-red-500 transition-all"
                onClick={() => dispatch(clearAssignToCustomerData())}
              >
                <span>clear data </span>
                <BinIcon />
              </button>
            )}
          </label>
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <TextInput
              inputType="text"
              isRequired={true}
              value={firstname}
              setValue={setFirstName}
              id="firstname"
              placeholder="First name"
              readonly={isSelected}
            />
            <TextInput
              inputType="text"
              isRequired={true}
              value={lastname}
              setValue={setLastname}
              id="lastname"
              placeholder="Last name"
              readonly={isSelected}
            />
          </div>
          <TextInput
            inputType="email"
            isRequired={true}
            value={email}
            setValue={setEmail}
            id="customer-email"
            placeholder="Customer Email"
            readonly={isSelected}
          />

          <PhoneInput
            coutryCode={selectedCountryCode}
            setCountryCode={setSelectedCountryCode}
            number={phoneNumber}
            setNumber={setPhoneNumber}
            label={""}
            isRequired={true}
            id="phone-number"
            readOnly={isSelected}
          />
          <AddressAutocompleteInput
            value={address}
            setValue={setAddress}
            placeholder="Enter address"
            readOnly={isSelected}
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
            isLoading={false}
          />
        </div>
      </form>
    </div>
  );
}

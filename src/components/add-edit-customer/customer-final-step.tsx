import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../inputs/textInput";
import AddressAutocompleteInput from "../inputs/addressAutocompleteInout";
import LoadingButton from "../button";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import LinkButton from "../button/linkButton";
import { clearAllCustomerInfo } from "../../stores/inAppDataInterations/addEditCustomerInfo";
import countries from "../../assets/Countries.json";
import Select from "../inputs/select";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import {
  addCustomersToList,
  replaceCustomersInList,
} from "../../stores/apiData/customers-lists";

export default function AddEditCustomerFinalStep({ id }: { id?: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storeCustomerDatast = useAppSelector(
    (state) => state.addEditCustomerInfo.value.data
  );
  const storeCustomerCompany = useAppSelector(
    (state) => state.addEditCustomerInfo.value.data.customerCompany
  );

  const [companyName, setCompanyName] = useState("");
  const [VATid, setVATid] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companyCountry, setCompanyCountry] = useState("");
  const [companyState, setCountryState] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  // populate apartment details interface
  useEffect(() => {
    const {
      companyName,
      VATid,
      companyEmail,
      companyId,
      companyCountry,
      companyState,
      companyCity,
      companyAddress,
    } = storeCustomerCompany;
    setCompanyName(companyName);
    setVATid(VATid);
    setCompanyEmail(companyEmail);
    setCompanyId(companyId);
    setCompanyCountry(companyCountry);
    setCountryState(companyState);
    setCompanyCity(companyCity);
    setCompanyAddress(companyAddress);
  }, [storeCustomerCompany]);

  //update redux store and naviagte to next timeline
  const uploadCustomerInformation = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      const { customerDetails, customerVerification, customerCompany } =
        storeCustomerDatast;
      const payload = {
        ...customerDetails,
        ...customerVerification,
        ...customerCompany,
        isSalesChannel: false,
        salesChannelName: "",
        salesChannelCommision: "",
        calculateCommissionOn: "",
        applyCommissionOn: "",
      };
      try {
        if (id) {
          console.log({ payload });
          dispatch(
            openSnackbar({
              message: "Customer's informaton successfully updated",
              isError: false,
            })
          );
          dispatch(
            replaceCustomersInList({
              id: id,
              firstname: customerDetails?.first_name,
              lastname: customerDetails?.last_name,
              phoneNumber: customerDetails?.phone,
              country: customerDetails?.country,
              bookings: "nil",
            })
          );
        } else {
          dispatch(
            openSnackbar({
              message: "Customer informaton successfully created",
              isError: false,
            })
          );
          dispatch(
            addCustomersToList({
              id: "randomized",
              firstname: customerDetails?.first_name,
              lastname: customerDetails?.last_name,
              phoneNumber: customerDetails?.phone,
              country: customerDetails?.country,
              bookings: "nil",
            })
          );
        }
        dispatch(clearAllCustomerInfo());
        navigate(`/customers`);
      } catch (error) {}
    },
    [storeCustomerDatast, id]
  );

  return (
    <form
      className=" flex flex-col gap-5 items-center"
      onSubmit={uploadCustomerInformation}
    >
      <div className="w-full flex flex-col gap-5 max-w-screen-lg">
        <div className=" w-full grid grid-cols-1  gap-3 md:gap-5 items-end">
          <TextInput
            inputType="text"
            isRequired={true}
            value={companyName}
            setValue={setCompanyName}
            id="company-name"
            placeholder=""
            label="Company Name"
          />
          <TextInput
            inputType="text"
            isRequired={true}
            value={VATid}
            setValue={setVATid}
            id="VAT-id"
            placeholder=""
            label="VAT ID"
          />
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3">
            <TextInput
              inputType="email"
              isRequired={true}
              value={companyEmail}
              setValue={setCompanyEmail}
              id="companu-email"
              placeholder=""
              label="Company Email"
            />
            <TextInput
              inputType="text"
              isRequired={true}
              value={companyId}
              setValue={setCompanyId}
              id="company-id"
              placeholder=""
              label="Company ID"
            />
            <Select
              isRequired={true}
              value={companyCountry}
              setValue={setCompanyCountry}
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
              value={companyState}
              setValue={setCountryState}
              id="state"
              placeholder=""
              label="State/Province"
            />
            <TextInput
              inputType="text"
              isRequired={false}
              value={companyCity}
              setValue={setCompanyCity}
              id="city"
              placeholder=""
              label="City"
            />
            <AddressAutocompleteInput
              value={companyAddress}
              setValue={setCompanyAddress}
              label="Company Address"
              placeholder="Search company address"
            />
          </div>
        </div>
      </div>

      {/* submit and cancel buttons */}
      <div className=" w-full flex justify-end mt-10">
        <div className=" flex items-center justify-between w-full max-w-sm gap-4">
          <div className=" w-fit">
            <LinkButton
              url={
                id
                  ? `/edit-customer/customer-verification/${id}`
                  : "/add-customer/customer-verification"
              }
              label="Back"
              variant={2}
            />
          </div>
          <LoadingButton
            label="Save and continue"
            type="submit"
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </form>
  );
}

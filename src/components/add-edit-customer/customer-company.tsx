import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../inputs/textInput";
import AddressAutocompleteInput from "../inputs/addressAutocompleteInout";
import LoadingButton from "../button";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import LinkButton from "../button/linkButton";
import { updateCustomerCompany } from "../../stores/inAppDataInterations/addEditCustomerInfo";
import countries from "../../assets/Countries.json";
import Select from "../inputs/select";

export default function AddEditCustomerCompany({ id }: { id?: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  // populate apartment details interface
  useEffect(() => {
    const {
      company_name,
      vat_id,
      company_email,
      company_id,
      company_country,
      company_state,
      company_city,
      company_address,
    } = storeCustomerCompany;
    setCompanyName(company_name);
    setVATid(vat_id);
    setCompanyEmail(company_email);
    setCompanyId(company_id);
    setCompanyCountry(company_country);
    setCountryState(company_state);
    setCompanyCity(company_city);
    setCompanyAddress(company_address);
  }, [storeCustomerCompany]);

  //update redux store and naviagte to next timeline
  const addCustoemrDetails = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      const payload = {
        company_name: companyName,
        vat_id: VATid,
        company_email: companyEmail,
        company_id: companyId,
        company_country: companyCountry,
        company_state: companyState,
        company_city: companyCity,
        company_address: companyAddress,
      };
      dispatch(updateCustomerCompany(payload));
      if (id) {
        navigate(`/edit-customer/customer-sales-channel/${id}`);
      } else {
        navigate(`/add-customer/customer-sales-channel`);
      }
    },
    [
      companyName,
      VATid,
      companyEmail,
      companyId,
      companyCountry,
      companyState,
      companyCity,
      companyAddress,
      id,
    ]
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
        <div className=" flex items-center justify-between gap-4">
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
          <div className=" w-fit">
            <LinkButton
              url={
                id
                  ? `/edit-customer/customer-sales-channel/${id}`
                  : "/add-customer/customer-sales-channel"
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

import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import CustomersSingleSearch from "../inputs/search/customer-single-search";
import { customersById } from "../../types/apiData/customers";
import { apartmentById } from "../../types/apiData/apartment";
import TextInput from "../inputs/textInput";
import ApartmentSingleSearch from "../inputs/search/apartment-single-search";
import DateInput from "../inputs/dateInput";
import Select from "../inputs/select";
import LoadingButton from "../button";
import TextAreaInput from "../inputs/textArea";
import FileInputDesignTwo from "../inputs/fileInput/design-two/file-upload";
import MultipleFileInputDesignTwo from "../inputs/fileInput/design-two/multiple-image-files";
import useAxiosMultipart from "../../useHooks/useAxiosMultipart";
import { useAppDispatch } from "../../stores/hooks";
import {
  addRequisitionRequestToList,
  replaceRequisitionRequestInList,
} from "../../stores/apiData/requisition-requests";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import CancelIcon from "../../assets/icons/cancel";
import useGetRequisitionRequest from "../../services-hooks/userGetRequisitionRequest";
import Switch from "../switch";
import PhoneInput from "../inputs/phoneInput";
import countries from "../../assets/Countries.json";
import AddressAutocompleteInput from "../inputs/addressAutocompleteInout";
import UsersIcon from "../../assets/icons/users";
import PenIcon from "../../assets/icons/pen";
import UserPlusIcon from "../../assets/icons/user-plus";

export default function AddEmployee({
  id,
  setOpen,
}: {
  id?: string;
  setOpen: (open: boolean) => void;
}) {
  const axios = useAxiosMultipart({});
  const dispatch = useAppDispatch();
  const [markAsPaid, setMarkAsPaid] = useState(false);
  const [employee, setEmployee] = useState<customersById>({} as any);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+234+Nigeria");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [shiftDays, setShiftDays] = useState("");
  const [shiftHours, setShiftHours] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [apartment, setApartment] = useState<apartmentById>({} as any);
  const [requestDate, setRequestDate] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorAccountName, setVendorAccountName] = useState("");
  const [vendorBank, setVendorBank] = useState("");
  const [vendorAccountNumber, setVendorAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [invoice, setInvoice] = useState<{
    name: string;
    size: number;
    preview: string;
    id?: number;
  }>({} as any);
  const [attachedImages, setAttachedImaged] = useState<
    { name: string; size: number; preview: string; id?: number }[]
  >([]);

  const [loading, setLoading] = useState(false);

  const { data } = useGetRequisitionRequest({ id });

  //   populate field provided id is available denoting update functionality
  useEffect(() => {
    if (id && data?.id) {
      const toDate = new Date(data?.request_date)?.toISOString()?.slice(0, 10);
      setEmail(data?.user?.email || "");
      setAmount(String(data?.amount || ""));
      setCurrency(data?.currency || "");
      setRequestDate(toDate || "");
    }
  }, [id, data]);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setLoading(true);
      const payload = {
        employee: employee.id,
        email,
        fullName,
        shortlet: apartment.id,
        request_date: requestDate,
        vendor_name: vendorName,
        vendor_account_name: vendorAccountName,
        vendor_bank: vendorBank,
        vendor_account_number: vendorAccountNumber,
        amount,
        currency,
        additional_note: additionalNotes,
        invoice: invoice,
        attachedImages: attachedImages,
        mark_as_paid: markAsPaid,
      };
      const dummytResponse = {
        id: 14,
        employee: { id: 1, first_name: "John", last_name: "Doe" },
        email: "john.doe@example.com",
        shortlet: {
          id: 32,
          name: "Apartment 32",
        },
        amount: amount,
        currency: currency,
        status: "pending",
        request_date: new Date(),
        created_at: new Date(),
      };
      try {
        if (id) {
          //   const response = await axios.put(`/admin/requisition-request/${id}`,payload)
          //   const data = response?.data;
          dispatch(replaceRequisitionRequestInList(dummytResponse));
          dispatch(
            openSnackbar({
              message: "Requisition request successfully updated",
              isError: false,
            })
          );
        } else {
          //   const response = axios.post("/admin/requisition-request",payload)
          //   const data = response?.data;
          dispatch(addRequisitionRequestToList(dummytResponse));
          dispatch(
            openSnackbar({
              message: "Requisition request successfully added",
              isError: false,
            })
          );
        }
        setOpen(false);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [
      id,
      markAsPaid,
      employee,
      email,
      apartment,
      requestDate,
      vendorName,
      vendorAccountName,
      vendorBank,
      vendorAccountNumber,
      amount,
      currency,
      additionalNotes,
      invoice,
      attachedImages,
    ]
  );

  const denyRequest = useCallback(async () => {
    try {
      const response = await axios.put(`/admin/requisition-request/${id}`, {
        status: "deny",
      });

      // const data = {};
      // dispatch(replaceRequisitionRequestInList(data));
      dispatch(
        openSnackbar({
          message: "Requisition request successfully denied",
          isError: false,
        })
      );
      setOpen(false);
    } catch (error) {}
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="w-full mb-8">
        <h2 className="uppercase text-[#98A2B3] font-bold text-sm mb-6">
          Personal details
        </h2>
        <div className="flex gap-7 items-center">
          <p className="font-medium text-sm text-[#344054]">Profile image</p>
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <UserPlusIcon />
            </div>
            <div className="absolute bottom-[-0.7px] right-0 bg-white rounded-full p-1.5">
              {/* <FaEdit className="text-gray-600" /> */}
              <PenIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
        <TextInput
          id="fullName"
          placeholder="John Doe"
          isRequired={true}
          value={fullName}
          setValue={setFullName}
          inputType="text"
          label="Full name"
        />
        <TextInput
          id="email"
          placeholder="example@example.com"
          isRequired={true}
          value={email}
          setValue={setEmail}
          inputType="email"
          label="Email address"
        />
        <DateInput
          inputType="date"
          isRequired={false}
          value={dob}
          setValue={setDob}
          id="date-of-birth"
          placeholder="01/01/2001"
          label="Date of birth"
          staticLabel="Date of birth"
        />

        <PhoneInput
          isRequired={true}
          number={phoneNumber}
          setNumber={setPhoneNumber}
          coutryCode={countryCode}
          setCountryCode={setCountryCode}
          id="phone-number"
          label="Phone number"
        />
        <Select
          isRequired={false}
          value={country}
          setValue={setCountry}
          id="country"
          label="Country"
        >
          <option value="" disabled>
            {/* Country */}
          </option>
          {countries.map((country) => (
            <option key={country.code} value={`${country?.name}`}>
              {`${country?.flag} - ${country?.name}`}
            </option>
          ))}
        </Select>

        <Select
          isRequired={true}
          value={state}
          setValue={setState}
          id="state"
          label="State of origin"
        >
          <option value="" disabled></option>
          {/* <option value="NGN">NGN</option>
          <option value="USD">USD</option> */}
        </Select>
      </div>
      <div className="w-full pt-6 ">
        <AddressAutocompleteInput
          label="Full Address"
          placeholder="Type address"
          value={address}
          setValue={setAddress}
        />
      </div>
      <div className="w-full pt-6">
        <h2 className="uppercase text-[#98A2B3] font-bold text-sm mb-6">
          Employee information
        </h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
          <DateInput
            inputType="date"
            isRequired={false}
            value={joinDate}
            setValue={setJoinDate}
            id="join-date"
            placeholder="01/01/2001"
            label=""
            staticLabel="Join date"
          />
          <Select
            isRequired={true}
            value={shiftDays}
            setValue={setShiftDays}
            id="shift-days"
            label="Shift days"
          >
            <option value="" disabled></option>
            {/* <option value="NGN">NGN</option>
          <option value="USD">USD</option> */}
          </Select>

          <Select
            isRequired={true}
            value={shiftHours}
            setValue={setShiftHours}
            id="shift-hours"
            label="Shift hours"
          >
            <option value="" disabled></option>
            {/* <option value="NGN">NGN</option>
          <option value="USD">USD</option> */}
          </Select>
          <Select
            isRequired={true}
            value={department}
            setValue={setDepartment}
            id="department"
            label="Department"
          >
            <option value="" disabled></option>
            {/* <option value="NGN">NGN</option>
          <option value="USD">USD</option> */}
          </Select>
          <Select
            isRequired={true}
            value={role}
            setValue={setRole}
            id="role"
            label="Role"
          >
            <option value="" disabled></option>
            {/* <option value="NGN">NGN</option>
          <option value="USD">USD</option> */}
          </Select>
          <Select
            isRequired={true}
            value={status}
            setValue={setStatus}
            id="status"
            label="Status"
          >
            <option value="" disabled></option>
            {/* <option value="NGN">NGN</option>
          <option value="USD">USD</option> */}
          </Select>
        </div>
        <div className=" flex items-center gap-5 mt-10">
          <LoadingButton
            type="button"
            label="Cancel"
            variant={2}
            disabled={false}
            isLoading={false}
            clickHandler={() => setOpen(false)}
          />

          <LoadingButton
            type="submit"
            label={id ? "Update" : "Create"}
            disabled={false}
            isLoading={loading}
          />
        </div>
      </div>
    </form>
  );
}

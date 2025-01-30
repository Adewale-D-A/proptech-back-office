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
        <ApartmentSingleSearch
          placeholder="Select company/apartment"
          selected={apartment}
          setSelected={setApartment}
          label="Apartment"
        />

        <TextInput
          id="vendor-name"
          placeholder="Who is the vendor?"
          isRequired={true}
          value={vendorName}
          setValue={setVendorName}
          inputType="text"
          label="Vendor's name"
        />
        <Select
          isRequired={true}
          value={vendorBank}
          setValue={setVendorBank}
          id="vendor-bank"
          label="Vendor's Bank"
        >
          <option value="" disabled>
            Select bank
          </option>
          <option value="access">Access Bank</option>
        </Select>
        <TextInput
          id="account-name"
          placeholder="What's the account name?"
          isRequired={true}
          value={vendorAccountName}
          setValue={setVendorAccountName}
          inputType="text"
          label="Account name"
        />
        <TextInput
          id="account-number"
          placeholder="12345698700"
          isRequired={true}
          value={vendorAccountNumber}
          setValue={setVendorAccountNumber}
          inputType="number"
          label="Account number"
        />
        <TextInput
          id="amount"
          placeholder="Amount"
          isRequired={true}
          value={amount}
          setValue={setAmount}
          inputType="number"
          label="Amount"
        />
        <Select
          isRequired={true}
          value={currency}
          setValue={setCurrency}
          id="currency"
          label="Currency"
        >
          <option value="" disabled>
            Select currency
          </option>
          <option value="NGN">NGN</option>
          <option value="USD">USD</option>
        </Select>
      </div>
      <div className="w-full flex flex-col gap-2">
        <FileInputDesignTwo
          value={invoice}
          setValue={setInvoice}
          id="attach-invoice"
          label="Attach invoice"
        />
        <p className=" text-sm text-gray-500">
          .pdf files only. Max file size: 10Mb
        </p>
        <MultipleFileInputDesignTwo
          value={attachedImages}
          setValue={setAttachedImaged}
          id="images-upload"
        />
        <p className=" text-sm text-gray-500">
          .jpg and .png files only. Max file size: 10Mb
        </p>
        <TextAreaInput
          isRequired={false}
          value={additionalNotes}
          setValue={setAdditionalNotes}
          id="additional-noted"
          placeholder="Leave addition notes"
          label="Additional comments/Notes"
        />
        <p className=" text-sm text-gray-500">
          Specify all apartments if it is a joint invoice. Also a description
          should be added if its just one payment.
        </p>
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

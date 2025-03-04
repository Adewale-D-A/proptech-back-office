import { useCallback, useState } from "react";
import Switch from "../../../components/switch";
import AddEditMaintenanceRequest from "../../../components/maintenance-requests/newRequest";
import TextInput from "../../../components/inputs/textInput";
import Select from "../../../components/inputs/select";
import FileInputDesignTwo from "../../../components/inputs/fileInput/design-two/file-upload";
import {
  requisitionRequestFormMain,
  requisitionRequestFormSecondary,
} from "../../../types/apiData/requisition-request";
import purgeEmptyPayload from "../../../utils/remove-empty-payload";

export default function RequisitionRequestForm({
  id,
  setOpen,
  type = "requisition",
  handleFormSubmission,
  submitting,
}: {
  id?: string;
  setOpen: (open: boolean) => void;
  type?: "convert" | "requisition";
  handleFormSubmission: (
    payload: requisitionRequestFormMain & requisitionRequestFormSecondary
  ) => void;
  submitting?: boolean;
}) {
  const [markAsPaid, setMarkAsPaid] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const [vendorBank, setVendorBank] = useState("");
  const [vendorAccountName, setVendorAccountName] = useState("");
  const [vendorAccountNumber, setVendorAccountNumber] = useState("");
  const [invoice, setInvoice] = useState<{
    name: string;
    size: number;
    preview: string;
    id?: number;
    is_local: boolean;
  }>({} as any);

  const handleSubmit = useCallback(
    async (payload: requisitionRequestFormMain) => {
      try {
        const newPayload = {
          ...payload,
          images: payload?.images?.filter((item) => item?.is_local),
          vendor_name: vendorName,
          vendor_bank: vendorBank,
          account_name: vendorAccountName,
          account_number: vendorAccountNumber,
          invoice_file: invoice?.is_local ? invoice : "",
          is_paid: markAsPaid,
        };
        const updatedPayload = purgeEmptyPayload({ payload: newPayload });
        handleFormSubmission(updatedPayload);
        setOpen(false);
      } catch (error) {}
    },
    [
      id,
      vendorName,
      vendorAccountName,
      vendorBank,
      vendorAccountNumber,
      invoice,
      markAsPaid,
    ]
  );

  return (
    <div className=" w-full">
      {type === "requisition" && (
        <div className=" flex items-center gap-3 justify-center p-2 bg-primary/10 rounded-lg">
          <span className=" font-semibold">Mark as paid</span>
          <Switch
            id="mark-as-paid"
            value={markAsPaid}
            setValue={setMarkAsPaid}
          />
        </div>
      )}
      <AddEditMaintenanceRequest
        id={id}
        setOpen={setOpen}
        handleExternalSubmit={handleSubmit}
        type={type}
        submitting={submitting}
      >
        <div className=" flex flex-col gap-3">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
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
          </div>
        </div>
      </AddEditMaintenanceRequest>
    </div>
  );
}

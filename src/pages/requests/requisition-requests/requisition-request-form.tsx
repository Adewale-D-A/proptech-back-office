import { useCallback, useEffect, useState } from "react";
import Switch from "../../../components/switch";
import AddEditMaintenanceRequest from "../../../components/maintenance-requests/newRequest";
import TextInput from "../../../components/inputs/textInput";
import FileInputDesignTwo from "../../../components/inputs/fileInput/design-two/file-upload";
import {
  requisitionRequestFormMain,
  requisitionRequestFormSecondary,
} from "../../../types/apiData/requisition-request";
import purgeEmptyPayload from "../../../utils/remove-empty-payload";
import useGetRequisitionRequest from "../../../services-hooks/userGetRequisitionRequest";
import BankSearch from "../../../components/inputs/search/bank-search";
import { Bank } from "../../../types/apiData/banks";
import useVerifyBank from "../../../services-hooks/useVerifyBank";

export default function RequisitionRequestForm({
  id, //maintenance_request_id
  requisition_id, //requisition request id
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
  ) => Promise<any>;
  submitting?: boolean;
  requisition_id?: string;
}) {
  const [markAsPaid, setMarkAsPaid] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const [vendorBank, setVendorBank] = useState<Bank>({} as any);
  const [vendorAccountName, setVendorAccountName] = useState("");
  const [vendorAccountNumber, setVendorAccountNumber] = useState("");
  const [invoice, setInvoice] = useState<{
    name: string;
    size: number;
    preview: string;
    id?: number;
    is_local: boolean;
  }>({} as any);

  const { data: verfiedResult } = useVerifyBank({
    bankCode: vendorBank?.code,
    accountNumber: vendorAccountNumber,
  });
  const { data } = useGetRequisitionRequest({ id: requisition_id });
  //   populate field provided id is available denoting update functionality
  useEffect(() => {
    if (requisition_id && data?.id) {
      const {
        id,
        is_paid,
        vendor_name,
        vendor_bank,
        account_name,
        account_number,
        invoice_file_path,
      } = data;
      setMarkAsPaid(Boolean(is_paid));
      setVendorName(vendor_name || "");
      setVendorBank({ name: vendor_bank || "" } as any);
      setVendorAccountName(account_name || "");
      setVendorAccountNumber(account_number || "");
      setInvoice({
        name: "",
        size: 0,
        preview: invoice_file_path,
        id: id,
        is_local: false,
      });
    }
  }, [requisition_id, data]);

  // POPULATE field on bank verification
  useEffect(() => {
    if (verfiedResult?.account_name) {
      setVendorAccountName(verfiedResult?.account_name);
    }
  }, [verfiedResult]);

  const handleSubmit = useCallback(
    async (payload: requisitionRequestFormMain) => {
      try {
        const newPayload = {
          ...payload,
          vendor_name: vendorName,
          vendor_bank: vendorBank?.name,
          account_name: vendorAccountName,
          account_number: vendorAccountNumber,
          invoice_file: invoice?.id ? "" : invoice,
          is_paid: markAsPaid ? "yes" : "no",
        };
        const updatedPayload = purgeEmptyPayload({ payload: newPayload });
        await handleFormSubmission(updatedPayload);
      } catch (error) {}
    },
    [
      vendorName,
      vendorAccountName,
      vendorBank,
      vendorAccountNumber,
      invoice,
      markAsPaid,
      handleFormSubmission,
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
        id={String(id || data?.maintenance_request_id || "")}
        setOpen={setOpen}
        handleExternalSubmit={handleSubmit}
        type={type}
        submitting={submitting}
        existing_fields_dataset={data}
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
            <BankSearch
              placeholder="Search bank"
              label="Vendor's Bank"
              selected={vendorBank}
              setSelected={setVendorBank}
            />
            {/* <Select
              isRequired={true}
              value={vendorBank}
              setValue={setVendorBank}
              id="vendor-bank"
              label="Vendor's Bank"
            >
              <option value="" disabled>
                Select bank
              </option>
              {banks.map((item) => (
                <option key={item?.id} value={item?.code}>
                  {item?.name}
                </option>
              ))}
            </Select> */}
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
              id="account-name"
              placeholder="What's the account name?"
              isRequired={true}
              // readonly={true}
              value={vendorAccountName}
              setValue={setVendorAccountName}
              inputType="text"
              label="Account name"
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

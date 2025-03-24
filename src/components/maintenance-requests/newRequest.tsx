import {
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { apartmentById } from "../../types/apiData/apartment";
import TextInput from "../inputs/textInput";
import ApartmentSingleSearch from "../inputs/search/apartment-single-search";
import DateInput from "../inputs/dateInput";
import Select from "../inputs/select";
import LoadingButton from "../button";
import TextAreaInput from "../inputs/textArea";
// import FileInputDesignTwo from "../inputs/fileInput/design-two/file-upload";
import MultipleFileInputDesignTwo from "../inputs/fileInput/design-two/multiple-image-files";
import useAxiosMultipart from "../../useHooks/useAxiosMultipart";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import {
  addMaintenanceRequestToList,
  replaceMaintenanceRequestInList,
} from "../../stores/apiData/maintenance-requests";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import CancelIcon from "../../assets/icons/cancel";
import useGetMaintenanceRequestById from "../../services-hooks/useGetMaintenanceRequestById";
import AdminSingleSearch from "../inputs/search/admins-single-search";
import { admin } from "../../types/apiData/admins";
import useGetRequestCategories from "../../services-hooks/useGetRequestCategories";
import purgeEmptyPayload from "../../utils/remove-empty-payload";
import useAxios from "../../useHooks/useAxios";
import { requisitionRequest } from "../../types/apiData/requisition-request";

export default function AddEditMaintenanceRequest({
  id,
  setOpen,
  type = "maintenance",
  handleExternalSubmit,
  children,
  submitting,
  existing_fields_dataset, //Since the component is being shared with requisition requests,
}: // sometimes, requisition request may not be link with maintenance request,
// making the id parameter null or undefined, in that case, the fields like employee,
// shortlet, request date ... will be needed to prepopulate the fields, hence the need for this prop
{
  id?: string;
  setOpen: (open: boolean) => void;
  type?: "maintenance" | "requisition" | "convert";
  handleExternalSubmit?: (payload: any) => Promise<any>;
  children?: ReactNode;
  submitting?: boolean;
  existing_fields_dataset?: requisitionRequest;
}) {
  const axios = useAxiosMultipart({});
  const axiosVanilla = useAxios({});
  const dispatch = useAppDispatch();

  const removedImageIdSet = useAppSelector(
    (state) => state.addEditApartmentInfo.value.data?.removeImages
  );
  const [employee, setEmployee] = useState<admin>({} as any);
  const [email, setEmail] = useState("");
  const [apartment, setApartment] = useState<apartmentById>({} as any);
  const [category, setCategory] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [item, setItem] = useState("");
  const [frequency, setFrequency] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [attachedImages, setAttachedImaged] = useState<
    {
      name: string;
      size: number;
      preview: string;
      id?: number;
      is_local?: boolean;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [isDenying, setIsDenying] = useState(false);

  const { data } = useGetMaintenanceRequestById({ id });
  const { data: requestCategories } = useGetRequestCategories({
    page: 1,
    limit: 1000,
  });

  //   populate field provided id is available denoting update functionality
  useEffect(() => {
    if ((id && data?.id) || existing_fields_dataset?.shortlet_id) {
      const {
        images,
        category_id,
        item,
        frequency,
        note,
        admin,
        amount,
        currency,
        request_date,
      } = data;
      const toDate = new Date(
        request_date
          ? request_date
          : existing_fields_dataset?.request_date || ""
      )
        ?.toISOString()
        ?.slice(0, 10);
      // setEmployee("")
      // setApartment("")
      setCategory(
        String(category_id || existing_fields_dataset?.category_id || "")
      );
      setItem(item || existing_fields_dataset?.item || "");
      setFrequency(frequency || existing_fields_dataset?.frequency || "");
      setAdditionalNotes(note || existing_fields_dataset?.note || "");
      setAmount(String(amount || existing_fields_dataset?.amount || ""));
      setCurrency(currency || existing_fields_dataset?.currency || "");
      setRequestDate(toDate || "");
      setAttachedImaged(
        images?.map((item) => ({
          name: String(item?.id),
          size: 0,
          preview: item?.image,
          id: item?.id,
        })) ||
          existing_fields_dataset?.images?.map((item) => ({
            name: String(item?.id),
            size: 0,
            preview: item?.image,
            id: item?.id,
          })) ||
          []
      );
    }
  }, [id, data, existing_fields_dataset]);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setLoading(true);
      const payload = {
        admin_id: employee?.id,
        shortlet_id: apartment?.id,
        // email,
        category_id: category,
        request_date: requestDate,
        amount,
        currency,
        item,
        frequency,
        note: additionalNotes,
        images: attachedImages?.filter((item) => !Boolean(item?.id)) || [],
        remove_images: removedImageIdSet,
        // vendor_name: vendorName,
        // vendor_account_name: vendorAccountName,
        // vendor_bank: vendorBank,
        // vendor_account_number: vendorAccountNumber,
        // additional_note: additionalNotes,
        // invoice: invoice,
        // mark_as_paid: markAsPaid,
      };
      const newPayload = purgeEmptyPayload({ payload });
      // const dummytResponse = {
      //   id: 14,
      //   employee: { id: 1, first_name: "John", last_name: "Doe" },
      //   email: "john.doe@example.com",
      //   shortlet: {
      //     id: 32,
      //     name: "Apartment 32",
      //   },
      //   category,
      //   amount: amount,
      //   currency: currency,
      //   status: "pending",
      //   request_date: new Date(),
      //   created_at: new Date(),
      // };
      try {
        if (type === "maintenance") {
          if (id) {
            const response = await axios.post(
              `/admin/maintenance-request/update/${id}`,
              newPayload
            );
            const { maintenance_request } = response?.data?.data;
            dispatch(
              replaceMaintenanceRequestInList({
                ...maintenance_request,
                admin: employee,
                shortlet: apartment,
                category: requestCategories?.find(
                  (item) => String(item?.id) === String(category)
                ),
                status: data?.status || existing_fields_dataset?.status || "",
              })
            );
            dispatch(
              openSnackbar({
                message: "Maintenance request successfully updated",
                isError: false,
              })
            );
          } else {
            const response = await axios.post(
              "/admin/maintenance-request",
              newPayload
            );
            const { maintenance_request } = response?.data?.data;
            dispatch(
              addMaintenanceRequestToList({
                ...maintenance_request,
                admin: employee,
                shortlet: apartment,
                category: requestCategories?.find(
                  (item) => String(item?.id) === String(category)
                ),
                status: "pending",
              })
            );
            dispatch(
              openSnackbar({
                message: "Maintenance request successfully added",
                isError: false,
              })
            );
          }
        } else if (handleExternalSubmit) {
          await handleExternalSubmit(newPayload);
        }
        setOpen(false);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [
      id,
      employee,
      email,
      apartment,
      category,
      requestDate,
      amount,
      currency,
      item,
      frequency,
      additionalNotes,
      attachedImages,
      requestCategories,
      data,
      existing_fields_dataset,
      handleExternalSubmit,
    ]
  );

  const denyRequest = useCallback(async () => {
    try {
      setIsDenying(true);
      const response = await axiosVanilla.put(
        `/admin/maintenance-request/update-status/${id}`,
        {
          status: "closed",
          close_reason: "Denied",
        }
      );
      const { maintenance_request } = response?.data?.data;
      // const data = {};
      dispatch(
        replaceMaintenanceRequestInList({
          ...maintenance_request,
          admin: employee,
          shortlet: apartment,
          category: requestCategories?.find(
            (item) => String(item?.id) === String(category)
          ),
        })
      );
      dispatch(
        openSnackbar({
          message: "Maintenance request successfully denied",
          isError: false,
        })
      );
      setOpen(false);
    } catch (error) {
    } finally {
      setIsDenying(false);
    }
  }, [employee, apartment, requestCategories]);

  return (
    <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 gap-3">
      <div className="space-y-4">
        <ApartmentSingleSearch
          placeholder="Search apartment..."
          selected={apartment}
          setSelected={setApartment}
          label="Apartment"
          defaultId={String(
            data?.shortlet_id || existing_fields_dataset?.shortlet_id || ""
          )}
        />
        <AdminSingleSearch
          placeholder="Choose employee"
          selected={employee}
          setSelected={setEmployee}
          label="Requesting employee"
          defaultId={String(
            data?.admin_id || existing_fields_dataset?.admin_id || ""
          )}
        />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        <DateInput
          inputType="date"
          isRequired={false}
          value={requestDate}
          setValue={setRequestDate}
          id="request-date"
          placeholder="Request date"
          label="Request Date"
          staticLabel="Request Date"
        />
        <Select
          isRequired={true}
          value={frequency}
          setValue={setFrequency}
          id="frequency"
          label="Frequency"
        >
          <option value="" disabled>
            Select frequency
          </option>
          <option value="One-off">on - off</option>
        </Select>
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
        <TextInput
          id="amount"
          placeholder="Amount"
          isRequired={true}
          value={amount}
          setValue={setAmount}
          inputType="number"
          label="Amount"
        />
        {/* <TextInput
          id="category"
          placeholder="others"
          isRequired={true}
          value={category}
          setValue={setCategory}
          inputType="text"
          label="Category"
        /> */}

        <Select
          isRequired={true}
          value={category}
          setValue={setCategory}
          id="category"
          label="Category"
        >
          <option value="" disabled>
            Select category
          </option>
          {requestCategories?.map((item) => (
            <option key={item?.id} value={item?.id}>
              {item?.name}
            </option>
          ))}
        </Select>
        {/* <Select
          isRequired={true}
          value={item}
          setValue={setItem}
          id="item"
          label="Item"
        >
          <option value="" disabled>
            Something
          </option>
          <option value="on - off">something</option>
        </Select> */}

        <TextInput
          id="item"
          placeholder="Item"
          isRequired={true}
          value={item}
          setValue={setItem}
          inputType="string"
          label="Item"
        />
      </div>
      {children}
      <div className="w-full flex flex-col gap-2">
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
        {data?.status === "closed" ||
        existing_fields_dataset?.status === "closed" ? (
          <div className=" w-full p-3 bg-red-100">
            <h4 className=" font-semibold text-lg text-red-500">Closed</h4>
            <p className=" text-sm text-gray-500">
              This maintenance request has been closed due to:{" "}
              <span className=" p-2 rounded-md bg-red-300 text-white font-semibold">
                {data?.close_reason || existing_fields_dataset?.status}
              </span>
            </p>
          </div>
        ) : (
          <div className=" flex items-center gap-5 mt-10">
            <LoadingButton
              type="button"
              label="Cancel"
              variant={2}
              disabled={false}
              isLoading={false}
              clickHandler={() => setOpen(false)}
            />

            {id && type === "maintenance" && (
              <LoadingButton
                type="button"
                label="Deny request"
                variant={3}
                disabled={false}
                isLoading={isDenying}
                clickHandler={() => denyRequest()}
                className=" bg-red-500/10 text-red-500"
                startIcon={<CancelIcon />}
              />
            )}
            <LoadingButton
              type="submit"
              label={
                type === "convert"
                  ? "Convert"
                  : id || existing_fields_dataset?.id
                  ? "Update"
                  : "Create"
              }
              disabled={false}
              isLoading={loading || submitting || false}
            />
          </div>
        )}
      </div>
    </form>
  );
}

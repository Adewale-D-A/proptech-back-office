import { SyntheticEvent, useCallback, useState } from "react";
import { useAppDispatch } from "../../stores/hooks";
import { customersById } from "../../types/apiData/customers";
import useAxios from "../../useHooks/useAxios";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import useGetBookingsByUserId from "../../services-hooks/bookings/bookingsByUserId";
import Search from "../../components/inputs/search";
import Select from "../../components/inputs/select";
import LoadingButton from "../../components/button";
import TextAreaInput from "../../components/inputs/textArea";
import DateInput from "../../components/inputs/dateInput";
import { addAdditionalServicesToList } from "../../stores/apiData/additional-services-lists";
import useGetServiceTypes from "../../services-hooks/useGetServiceTypes";
import TextInput from "../../components/inputs/textInput";
import CustomersSingleSearch from "../../components/inputs/search/customer-single-search";

export default function AddEditAdditionalService({
  setIsOpen,
}: {
  setIsOpen: (val: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [seletedCustomer, setSelectedCustomer] = useState<customersById>(
    {} as any
  );
  const [bookingId, setBookingId] = useState<string>("");
  const [serviceTypeId, setServiceTypeId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Admin");
  const [status, setStatus] = useState("Payment Confirmed");

  const [isAdding, setIsAdding] = useState(false);

  const { data: user_bookings } = useGetBookingsByUserId({
    id: String(seletedCustomer?.id || ""),
  });

  const { data: service_types } = useGetServiceTypes({});

  const addService = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      if (seletedCustomer?.id) {
        try {
          setIsAdding(true);
          const payload = {
            booking_id: bookingId,
            service_type_id: serviceTypeId,
            user_id: seletedCustomer?.id,
            quantity: quantity,
            request_date: date,
            description: description,
            // payment_method: paymentMethod,
            status: status, //Payment Confirmed or Awating Payment
          };
          const response = await axios.post(
            "/admin/additional-service",
            payload
          );
          const { additional_service } = response?.data?.data || {};
          dispatch(addAdditionalServicesToList(additional_service));
          dispatch(
            openSnackbar({
              message: "Additional service successfully created",
              isError: false,
            })
          );
          setIsOpen(false);
        } catch (error) {
        } finally {
          setIsAdding(false);
        }
      } else {
        dispatch(
          openSnackbar({
            message:
              "Please select a customer and also the active booking associated with this additional service",
            isError: true,
          })
        );
      }
    },
    [
      bookingId,
      serviceTypeId,
      seletedCustomer,
      quantity,
      date,
      description,
      paymentMethod,
      status,
    ]
  );
  return (
    <form onSubmit={addService} className="w-full flex flex-col gap-3">
      <CustomersSingleSearch
        placeholder="Search customer to assign to"
        setSelected={setSelectedCustomer}
        selected={seletedCustomer}
      />

      <Select
        isRequired={true}
        value={bookingId}
        setValue={setBookingId}
        id="select-booking"
        label="Booking"
      >
        <option value="" disabled>
          Select applicable active booking
        </option>
        {user_bookings?.map((item) => (
          <option value={item?.id}>{item?.shortlet?.name}</option>
        ))}
      </Select>
      <Select
        isRequired={true}
        value={serviceTypeId}
        setValue={setServiceTypeId}
        id="service-type"
      >
        <option value="" disabled>
          Select applicable service type
        </option>
        {service_types?.map((item) => (
          <option value={item?.id}>{item?.name}</option>
        ))}
      </Select>

      <TextInput
        id="quantity"
        placeholder="Quantity"
        isRequired={true}
        value={quantity}
        setValue={setQuantity}
        inputType="number"
      />
      <DateInput
        inputType="date"
        isRequired={true}
        value={date}
        setValue={setDate}
        id="check-in-date"
        placeholder="Select Date"
        label="select-date"
      />
      <TextAreaInput
        isRequired={true}
        value={description}
        setValue={setDescription}
        id="description"
        placeholder="Description"
      />
      {/* <Select
        isRequired={true}
        value={paymentMethod}
        setValue={setPaymentMethod}
        id="payment-method"
      >
        <option value="" disabled>
          Select payment method
        </option>
        <option value="Admin">Admin</option>
      </Select> */}
      <Select isRequired={true} value={status} setValue={setStatus} id="status">
        <option value="" disabled>
          Select payment status
        </option>
        <option value="Payment Confirmed">Payment Confirmed</option>
        <option value="Awating Payment">Awating Payment</option>
      </Select>
      <div className=" flex items-center gap-5 mt-10">
        <LoadingButton
          type="button"
          label="Cancel"
          variant={2}
          disabled={false}
          isLoading={false}
          clickHandler={() => setIsOpen(false)}
        />

        <LoadingButton
          type="submit"
          label="Add Request"
          disabled={false}
          isLoading={isAdding}
        />
      </div>
    </form>
  );
}

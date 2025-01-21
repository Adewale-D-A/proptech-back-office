import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import Select from "../inputs/select";
import UserPlusIcon from "../../assets/icons/user-plus";
import TextAreaInput from "../inputs/textArea";
import LoadingButton from "../button";
import Switch from "../switch";
import DateInput from "../inputs/dateInput";
import TimeInput from "../inputs/timeInput";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { openAssignToCustomerView } from "../../stores/inAppDataInterations/assignCustomer";
import { apartmentById } from "../../types/apiData/apartment";
import useAxios from "../../useHooks/useAxios";
import { addBookingsToList } from "../../stores/apiData/bookings-lists";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import AssignCustomer from "./assignToCustomer";
import { useParams } from "react-router-dom";
import useGetApartmentById from "../../services-hooks/useGetApartmentById";
import TextInput from "../inputs/textInput";
import reservationValidator from "../../utils/reservation-validator";
import ApartmentSingleSearch from "../inputs/search/apartment-single-search";

export default function QuickReservationFlow({
  variant = 1,
  apartment_name,
  apartment_id,
  setSelectedApt,
  setOpen,
  allowApartmentUpdate = true,
  defaultDateTime,
}: {
  variant?: number;
  apartment_id?: string;
  apartment_name?: string;
  setSelectedApt?: (data: apartmentById) => void;
  setOpen?: (st: boolean) => void;
  allowApartmentUpdate?: boolean;
  defaultDateTime?: {
    checkIn: string;
    checkOut: string;
    checkInTime: string;
    checkOutTime: string;
  };
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { open: openAssignToCustomer } = useAppSelector(
    (state) => state.assignCustomer.value
  );

  const { data: apartment_info } = useGetApartmentById(id ? id : undefined);

  const { data } = useAppSelector((state) => state.assignCustomer.value);
  const [apartment, setApartment] = useState<apartmentById>({} as any);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [guestNo, setGuestNo] = useState("");
  const [payment, setPayment] = useState("");
  // const [rate, setRate] = useState("");
  const [email, setEmail] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [closeRoom, setCloseRoom] = useState(false);

  const [customerMetaData, setCustomerMetadata] = useState("");
  const [isMakingReservation, setIsMakingReservation] = useState(false);

  // update selected apartment
  useEffect(() => {
    if (setSelectedApt) {
      setSelectedApt(apartment?.id ? apartment : apartment_info);
    }
  }, [apartment, apartment_info]);
  // auto populate email on customer assignment
  useEffect(() => {
    setEmail(data?.email || "");
  }, [data]);

  // auto populate datetime based of tracked changes
  useEffect(() => {
    if (defaultDateTime) {
      setCheckInDate(defaultDateTime?.checkIn || "");
      setCheckOutDate(defaultDateTime?.checkOut || "");
      setCheckInTime(defaultDateTime?.checkInTime || "");
      setCheckOutTime(defaultDateTime?.checkOutTime || "");
    }
  }, [defaultDateTime]);

  const assignCustomer = useCallback(() => {
    dispatch(openAssignToCustomerView());
  }, []);

  const makeReservation = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const validatorResponse = reservationValidator({
        data: {
          "Check in date": checkInDate,
          "Check out date": checkOutDate,
          "Check in time": checkInTime,
          "Check out time": checkOutTime,
        },
      });
      if (!validatorResponse?.success) {
        dispatch(
          openSnackbar({
            message: validatorResponse?.message,
            isError: true,
          })
        );
        return;
      }
      // if (checkInDate && checkOutDate && checkInTime && checkOutTime) {
      setIsMakingReservation(true);
      try {
        const payload = {
          shortlet_id: apartment_id || apartment?.id || apartment_info?.id,
          check_in_day: checkInDate,
          check_out_day: checkOutDate,
          check_in_time: checkInTime,
          check_out_time: checkOutTime,
          number_of_guests: guestNo,
          // "custom_rate" : {
          //     "booking_cost" : 50000,
          //     "tax_fee" : 5000,
          //     "caution_fee" : 4000.99,
          //     "currency" : "NGN",//USD or USD
          //     "exchange_rate" : 1
          // },
          payment_method: payment,
          status: bookingStatus, //Payment Confirmed or Awaiting Payment
          user_id: data?.id,
          first_name: data?.first_name, // required if no user_id
          last_name: data?.last_name, // required if no user_id
          email: data?.email, // required if no user_id
          phone: data?.phone, // required if no user_id
        };
        // conditionally remove from payload if no change was made
        const newPayload = Object.fromEntries(
          Object.entries(payload).filter(([key]) =>
            (key === "first_name" ||
              key === "last_name" ||
              key === "email" ||
              key === "phone") &&
            payload?.user_id
              ? false
              : key === "user_id" && !payload?.user_id
              ? false
              : true
          )
        );
        const response = await axios.post("/admin/booking", newPayload);
        const added_response = response?.data?.data;
        dispatch(addBookingsToList(added_response));
        dispatch(
          openSnackbar({
            message: "Apartment successfully booked",
            isError: false,
          })
        );
        if (setOpen) {
          setOpen(false);
        }
      } catch (error) {
      } finally {
        setIsMakingReservation(false);
      }
    },
    [
      apartment_id,
      apartment,
      apartment_info,
      checkInDate,
      checkOutDate,
      checkInTime,
      checkOutTime,
      guestNo,
      payment,
      bookingStatus,
      data,
    ]
  );

  const clearSeletecApartment = useCallback(() => {
    if (setSelectedApt) {
      setSelectedApt({} as any);
    }
  }, [setSelectedApt]);

  return (
    <>
      {openAssignToCustomer ? (
        <AssignCustomer />
      ) : (
        <div className="w-full">
          {variant === 1 && (
            <h4 className=" font-semibold text-xl mb-8">Quick Reservation</h4>
          )}
          <form className=" flex flex-col gap-5" onSubmit={makeReservation}>
            <div
              className={`w-full grid ${
                variant === 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
              }  gap-5`}
            >
              {/* <Select
            isRequired={true}
            value={apartment}
            setValue={setApartment}
            id="select-apartment"
            readOnly={true}
          >
            <option value="">1 Bedroom apartment</option>
          </Select> */}
              {variant === 2 && allowApartmentUpdate ? (
                <ApartmentSingleSearch
                  placeholder="Search apartment by name"
                  selected={apartment}
                  setSelected={setApartment}
                />
              ) : (
                <div className="w-full p-3 rounded-lg border  bg-gray-200/15 flex justify-between">
                  <span className="">{apartment_name}</span>
                </div>
              )}
              {/* <ApartmentSingleSearch
                placeholder="Search apartment by name"
                selected={apartment}
                setSelected={setApartment}
                readOnly={apartment_name}
              /> */}
              <Select
                isRequired={true}
                value={payment}
                setValue={setPayment}
                id="method-of-payment"
              >
                <option value="" disabled>
                  Select Method of payment
                </option>
                <option value="paystack">Paystack</option>
              </Select>
              <DateInput
                inputType="date"
                isRequired={false}
                value={checkInDate}
                setValue={setCheckInDate}
                id="check-in-date"
                placeholder="Check-in Date"
                label="Check-in Date"
              />
              <TimeInput
                inputType="time"
                isRequired={false}
                value={checkInTime}
                setValue={setCheckInTime}
                id="check-in-time"
                placeholder="Check-in Time"
                label="Check-in Time"
              />
              <DateInput
                inputType="date"
                isRequired={false}
                value={checkOutDate}
                setValue={setCheckOutDate}
                id="check-out-date"
                placeholder="Check-out Date"
                label="Check-out Date"
              />
              <TimeInput
                inputType="time"
                isRequired={false}
                value={checkOutTime}
                setValue={setCheckOutTime}
                id="check-out-time"
                placeholder="Check-out Time"
                label="Check-out Time"
              />
              <Select
                isRequired={true}
                value={guestNo}
                setValue={setGuestNo}
                id="no-of-guests"
              >
                <option value="" disabled>
                  No of Guests
                </option>
                {Array.from({ length: 8 }, (_, index) => (
                  <option key={index} value={`${index + 1}`}>
                    {index + 1}
                  </option>
                ))}
              </Select>
              <Select
                isRequired={true}
                value={bookingStatus}
                setValue={setBookingStatus}
                id="booking-status"
              >
                <option value="" disabled>
                  Select Booking Status
                </option>
                <option value="Payment Confirmed">Payment Confirmed</option>
                <option value="Awaiting Payment">Awaiting Payment</option>
              </Select>
              <div className=" w-full flex items-center justify-between">
                <label htmlFor="close-date">Close room in these dates</label>
                <Switch
                  id="close-date"
                  value={closeRoom}
                  setValue={setCloseRoom}
                />
              </div>
              <div className="w-full flex">
                <label className=" border p-3 rounded-l-md w-full">
                  {data?.first_name
                    ? `${data?.first_name} ${data?.last_name}`
                    : "Assign to Customer"}
                </label>
                <button
                  type="button"
                  onClick={() => assignCustomer()}
                  title="assign customer"
                  className=" text-primary rounded-r-md border-primary border flex justify-center items-center p-3"
                >
                  <UserPlusIcon />
                </button>
              </div>
            </div>
            {/* <Select
              isRequired={true}
              value={rate}
              setValue={setRate}
              id="seclect-custom-rate"
            >
              <option value="">Select Custom Rate</option>
            </Select> */}
            <TextInput
              inputType="email"
              isRequired={true}
              value={email}
              setValue={setEmail}
              id="customer-email-quick-reservation"
              placeholder="Customer Email"
              readonly={data?.email ? true : false}
            />
            <TextAreaInput
              value={customerMetaData}
              setValue={setCustomerMetadata}
              id="customer-information"
              isRequired={true}
              placeholder="Customer information"
            />
            <LoadingButton
              type="submit"
              label="Save Bookings"
              disabled={false}
              isLoading={isMakingReservation}
            />
          </form>
        </div>
      )}
    </>
  );
}

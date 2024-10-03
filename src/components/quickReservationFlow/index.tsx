import { SyntheticEvent, useCallback, useState } from "react";
import Select from "../inputs/select";
import TextInput from "../inputs/textInput";
import UserPlusIcon from "../../assets/icons/user-plus";
import TextAreaInput from "../inputs/textArea";
import LoadingButton from "../button";
import Switch from "../switch";
import DateInput from "../inputs/dateInput";
import TimeInput from "../inputs/timeInput";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { openAssignToCustomerView } from "../../stores/inAppDataInterations/assignCustomer";
import Search from "../inputs/search";

export default function QuickReservationFlow({
  variant = 1,
}: {
  variant?: number;
}) {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.assignCustomer.value);
  const [apartment, setApartment] = useState({} as any);
  const [payment, setPayment] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [rate, setRate] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [email, setEmail] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestNo, setGuestNo] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [closeRoom, setCloseRoom] = useState(false);
  const [customerInfo, setCustomerInfo] = useState("");

  const [isMakingReservation, setIsMakingReservation] = useState(false);

  const assignCustomer = useCallback(() => {
    dispatch(openAssignToCustomerView());
  }, []);

  const makeReservation = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMakingReservation(true);
    try {
    } catch (error) {
    } finally {
      setIsMakingReservation(false);
    }
  }, []);

  return (
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
          {variant === 2 ? (
            <Search
              id="apartment-search"
              placeholder="Search apartment by name"
              componentId="apartment"
              setValue={setApartment}
            />
          ) : (
            <span className="w-full p-3 rounded-lg border  bg-gray-200/15 ">
              1 Bedroom Apartment
            </span>
          )}
          <Select
            isRequired={true}
            value={payment}
            setValue={setPayment}
            id="method-of-payment"
          >
            <option value="">Select Method of payment</option>
          </Select>
          <DateInput
            inputType="date"
            isRequired={true}
            value={checkInDate}
            setValue={setCheckInDate}
            id="check-in-date"
            placeholder="Check-in Date"
            label="Check-in Date"
          />
          <Select
            isRequired={true}
            value={rate}
            setValue={setRate}
            id="seclect-custom-rate"
          >
            <option value="">Select Custom Rate</option>
          </Select>
          <TimeInput
            inputType="time"
            isRequired={true}
            value={checkInTime}
            setValue={setCheckInTime}
            id="check-in-time"
            placeholder="Check-in Time"
            label="Check-in Time"
          />
          <TextInput
            inputType="email"
            isRequired={true}
            value={email}
            setValue={setEmail}
            id="customer-email"
            placeholder="Customer Email"
          />
          <DateInput
            inputType="date"
            isRequired={true}
            value={checkOutDate}
            setValue={setCheckOutDate}
            id="check-out-date"
            placeholder="Check-out Date"
            label="Check-out Date"
          />
          <Select
            isRequired={true}
            value={guestNo}
            setValue={setGuestNo}
            id="no-of-guests"
          >
            <option value="">No of Guests</option>
          </Select>
          <TimeInput
            inputType="time"
            isRequired={true}
            value={checkOutTime}
            setValue={setCheckOutTime}
            id="check-out-time"
            placeholder="Check-out Time"
            label="Check-out Time"
          />
          <Select
            isRequired={true}
            value={bookingStatus}
            setValue={setBookingStatus}
            id="booking-status"
          >
            <option value="">Select Booking Status</option>
          </Select>
          <div className=" w-full flex items-center justify-between">
            <label htmlFor="close-date">Close room in these dates</label>
            <Switch id="close-date" value={closeRoom} setValue={setCloseRoom} />
          </div>
          <div className="w-full flex">
            <label className=" border p-3 rounded-l-md w-full">
              {data?.firstname ? data?.firstname : "Assign to Customer"}
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
        <TextAreaInput
          value={customerInfo}
          setValue={setCustomerInfo}
          id="customer-information"
          isRequired={true}
          placeholder="customer information"
        />
        <LoadingButton
          type="submit"
          label="Save Bookings"
          disabled={false}
          isLoading={isMakingReservation}
        />
      </form>
    </div>
  );
}

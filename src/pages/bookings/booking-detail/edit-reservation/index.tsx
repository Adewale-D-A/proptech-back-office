import { useParams } from "react-router-dom";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import CalendarIcon from "../../../../assets/icons/calendar";
import { useAppDispatch } from "../../../../stores/hooks";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import WriteIcon from "../../../../assets/icons/write";
import LoadingButton from "../../../../components/button";
import BinIcon from "../../../../assets/icons/bin-icon";
import DeleteConfirmation from "../../../../components/infoModal/delete-confirmation";
import CustomerInfoCard from "../../../../components/booking-detail/customer-info-card";
import BookingByIdList from "../../../../components/tables/bookingList";
import DateInput from "../../../../components/inputs/dateInput";
import TimeInput from "../../../../components/inputs/timeInput";
import BuildingIcon from "../../../../assets/icons/building";
import Select from "../../../../components/inputs/select";
import TextInput from "../../../../components/inputs/textInput";
import CheckboxInput from "../../../../components/inputs/checkbox/checkbox";
import PlusIcon from "../../../../assets/icons/plus";
import RadioInputs from "../../../../components/inputs/radio-buttons";
import ExchangeRateInput from "../../../../components/inputs/exchangeRateInput";
import SwitchArrowIcon from "../../../../assets/icons/switch";
import ModalTemplate from "../../../../components/modal";
import SplitStay from "../../../../components/booking-detail/split-stay";
import AddRoom from "../../../../components/booking-detail/add-room";

export default function EditBookingReservation() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const breadCrumb = useMemo(
    () => [
      {
        url: "/bookings",
        label: "Bookings",
        icon: <CalendarIcon />,
      },
      {
        url: `/booking-details/${id}`,
        label: "Booking Details",
        icon: "",
      },
      {
        url: "#",
        label: "Edit Reservation",
        icon: "",
      },
    ],
    [id]
  );

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Edit Apartment Details",
        pageDescription: "Edit apartment details",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, [breadCrumb]);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openSplitStay, setOpenSplitStay] = useState(false);
  const [openAddRoom, setOpenAddRoom] = useState(false);

  const [checkInDate, setCheckInDate] = useState("2024-09-26");
  const [checkInTime, setCheckInTime] = useState("12:04");
  const [checkOutDate, setCheckOutDate] = useState("2024-09-26");
  const [checkOutTime, setCheckOutTime] = useState("12:04");

  const [rooms, setRooms] = useState("");
  const [guests, setGuests] = useState("");

  // travellers details
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [travellersNoGuests, setTravellerNoGuests] = useState("");

  // price type
  const [priceType, setPriceType] = useState("");
  const [amount, setAmount] = useState("");
  // taxes and options
  const [taxes, setTaxes] = useState("");
  // meal plans
  const [dinner, setDinner] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [breakfast, setBreakfast] = useState(false);

  // exchange rate
  const [countryOne, setCountryOne] = useState("");
  const [amountOne, setAmountOne] = useState("");
  const [countryTwo, setCountryTwo] = useState("");
  const [amountTwo, setAmountTwo] = useState("");

  const deleteReservation = useCallback(() => {
    console.log({ id });
    setOpenDeleteConfirmation(false);
  }, [id]);

  const saveReservation = useCallback(() => {
    console.log({ id });
  }, [id]);

  return (
    <>
      <section className="w-full flex flex-col items-center">
        <div className="w-full max-w-screen-xl flex flex-col gap-10">
          <BookingByIdList />
          <div className="w-full flex gap-5 flex-col md:flex-row justify-center items-center md:justify-between md:items-end  border-b">
            <h2 className="text-xl font-semibold flex items-center gap-3 border-b-2 border-primary pb-3 text-primary">
              <WriteIcon /> <span>Edit Reservation</span>
            </h2>
            <div className=" flex items-center flex-col md:flex-row gap-3 text-sm pb-2">
              <LoadingButton
                isLoading={isDeleting}
                clickHandler={() => setOpenDeleteConfirmation(true)}
                type="button"
                label="Delete Reservation"
                variant={3}
                className=" text-red-500"
                startIcon={<BinIcon className="h-5 w-5" />}
              />
              <LoadingButton
                isLoading={false}
                type="button"
                clickHandler={() => setOpenSplitStay(true)}
                label="Split Stay"
                variant={3}
                className=" px-3 p-2 text-primary bg-primary/15 hover:bg-primary/30 transition-all"
              />
              <LoadingButton
                isLoading={isSaving}
                clickHandler={() => saveReservation()}
                type="button"
                label="Save Reservation"
              />
            </div>
          </div>
          <div className="w-full max-w-screen-xl flex flex-col gap-10">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className=" flex flex-col gap-5">
                <div className=" w-full flex flex-col gap-4 border rounded-md">
                  {/* Customer Details */}
                  <h4 className="text-lg font-semibold border-b p-3">
                    Customer Details
                  </h4>
                  <div className=" p-3 flex flex-col gap-6">
                    <CustomerInfoCard />
                  </div>
                </div>
                <div className=" w-full flex flex-col gap-4 border rounded-md">
                  {/* Customer Details */}
                  <h4 className="text-lg font-semibold border-b p-3">
                    Check-in Details
                  </h4>
                  <div className=" p-3 flex flex-col gap-5">
                    <DateInput
                      inputType="date"
                      isRequired={true}
                      value={checkInDate}
                      setValue={setCheckInDate}
                      id="check-in-date"
                      placeholder="Check-in Date"
                      label="Check-in Date"
                    />
                    <TimeInput
                      inputType="time"
                      isRequired={true}
                      value={checkInTime}
                      setValue={setCheckInTime}
                      id="check-in-time"
                      placeholder="Check-in Time"
                      label="Check-in Time"
                    />
                    <DateInput
                      inputType="date"
                      isRequired={true}
                      value={checkOutDate}
                      setValue={setCheckOutDate}
                      id="check-in-date"
                      placeholder="Check-in Date"
                      label="Check-in Date"
                    />
                    <TimeInput
                      inputType="time"
                      isRequired={true}
                      value={checkOutTime}
                      setValue={setCheckOutTime}
                      id="check-in-time"
                      placeholder="Check-in Time"
                      label="Check-in Time"
                    />
                  </div>
                </div>
              </div>
              <div className=" flex flex-col gap-5">
                <div className=" w-full rounded-md border flex flex-col gap-3">
                  <h4 className="text-lg font-semibold border-b p-3">
                    Apartment Info
                  </h4>
                  <div className=" px-3 flex flex-col gap-3">
                    <div className=" p-3 flex items-center gap-3 bg-gray-200 rounded-lg">
                      <BuildingIcon /> <h6>Garden Roese 99</h6>
                    </div>
                    <Select
                      isRequired={true}
                      value={rooms}
                      setValue={setRooms}
                      id="no-of-rooms"
                    >
                      <option value="">Edit Room</option>
                      <option value="switch">Switch Room</option>
                      <option value="split">Split Stays</option>
                    </Select>
                    <Select
                      isRequired={true}
                      value={guests}
                      setValue={setGuests}
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
                  </div>
                  <div></div>
                </div>
                <div className=" w-full rounded-md border flex flex-col gap-3">
                  <div className=" border-b flex flex-col gap-3 pb-5">
                    <h4 className="text-lg font-semibold border-b p-3">
                      Travellers Details
                    </h4>
                    <div className=" px-3 flex flex-col gap-3">
                      <TextInput
                        inputType="text"
                        isRequired={true}
                        value={firstname}
                        setValue={setFirstname}
                        id="first-name"
                        placeholder="First name"
                      />
                      <TextInput
                        inputType="text"
                        isRequired={true}
                        value={lastname}
                        setValue={setLastname}
                        id="last-name"
                        placeholder="Last name"
                      />
                      <Select
                        isRequired={true}
                        value={travellersNoGuests}
                        setValue={setTravellerNoGuests}
                        id="tavellers-no-of-guests"
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
                    </div>
                  </div>
                  <div className=" border-b">
                    <h4 className="text-lg font-semibold border-b p-3">
                      Price Type
                    </h4>
                    <div className=" p-3 flex flex-col gap-3">
                      <RadioInputs
                        name="price-type"
                        values={[
                          {
                            id: "standard-rate",
                            title: "N110,000",
                            value: "standard-rate",
                            defaultChecked: true,
                            label: "Standard Rate",
                          },
                          {
                            id: "custom-rate",
                            title: "Custom rate",
                            value: "custom-rate",
                            defaultChecked: false,
                            label: "Set Custom Rate",
                          },
                        ]}
                        setValue={setPriceType}
                      />
                      {priceType === "custom-rate" && (
                        <TextInput
                          inputType="text"
                          isRequired={true}
                          value={amount}
                          setValue={setAmount}
                          id="custom-rate-amount"
                          placeholder="Enter amount"
                        />
                      )}
                    </div>
                  </div>
                  <div className=" border-b">
                    <h4 className="text-lg font-semibold border-b p-3">
                      Meal Plans Included
                    </h4>
                    <div className=" p-3 flex items-center justify-between gap-4 flex-wrap">
                      <CheckboxInput
                        id="breakfast"
                        label="Breakfast"
                        value={breakfast}
                        setValue={setBreakfast}
                      />
                      <CheckboxInput
                        id="lunch"
                        label="Lunch"
                        value={lunch}
                        setValue={setLunch}
                      />
                      <CheckboxInput
                        id="dinner"
                        label="Dinner"
                        value={dinner}
                        setValue={setDinner}
                      />
                    </div>
                  </div>
                  <div className=" border-b">
                    <h4 className="text-lg font-semibold border-b p-3">
                      Option/Taxes/Fees
                    </h4>
                    <div className=" p-3">
                      <RadioInputs
                        name="taxes-fees"
                        values={[
                          {
                            id: "caution-fee",
                            title: "Caution Fee (N50,000)",
                            value: "caution-fee",
                            defaultChecked: true,
                          },
                        ]}
                        setValue={setTaxes}
                      />
                    </div>
                  </div>

                  <div className=" p-3 flex justify-between items-center">
                    <h4 className="text-lg font-semibold">Extra Services</h4>
                    <div className=" w-fit">
                      <LoadingButton
                        isLoading={false}
                        type="button"
                        variant={2}
                        startIcon={<PlusIcon />}
                        label="Add"
                        clickHandler={() => setOpenAddRoom(true)}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full rounded-md border flex flex-col gap-3">
                  <h4 className="text-lg font-semibold border-b p-3">
                    Exchange Rate
                  </h4>
                  <div className=" flex flex-col gap-3 p-3 items-center">
                    <ExchangeRateInput
                      country={countryOne}
                      setCountry={setCountryOne}
                      amount={amountOne}
                      setAmount={setAmountOne}
                      id="country-one"
                    />
                    <SwitchArrowIcon className=" h-8 w-8 text-primary" />
                    <ExchangeRateInput
                      country={countryTwo}
                      setCountry={setCountryTwo}
                      amount={amountTwo}
                      setAmount={setAmountTwo}
                      id="country-two"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeleteConfirmation
        confirmationHandler={deleteReservation}
        isLoading={isDeleting}
        btnTitle="Yes, I want to"
        title="Delete Reservation"
        description="Are you sure you want to delete this reservation"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />

      <ModalTemplate
        open={openSplitStay}
        setOpen={setOpenSplitStay}
        showXicon={true}
        title="Split Stay"
        className=" max-w-md"
      >
        <SplitStay id={id} setValue={setOpenSplitStay} />
      </ModalTemplate>
      <ModalTemplate
        open={openAddRoom}
        setOpen={setOpenAddRoom}
        showXicon={true}
        title="Add Room"
        className=" max-w-md"
      >
        <AddRoom id={id} setValue={setOpenAddRoom} />
      </ModalTemplate>
    </>
  );
}

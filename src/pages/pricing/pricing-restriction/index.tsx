import { SyntheticEvent, useCallback, useLayoutEffect, useState } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ReceiptIcon from "../../../assets/icons/receipt";
import Select from "../../../components/inputs/select";
import TextInput from "../../../components/inputs/textInput";
import Switch from "../../../components/switch";
import LoadingButton from "../../../components/button";
import DateInput from "../../../components/inputs/dateInput";
import WeekdaysSelect from "../../../components/inputs/select/weekdaysSelect";

const breadCrumb = [
  {
    url: "#",
    label: "Pricing",
    icon: <ReceiptIcon />,
  },
  {
    url: "#",
    label: "New Restriction",
    icon: "",
  },
];
export default function NewPricingRestrictions() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "New Pricing Restriction",
        pageDescription: "New pricing restriction",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const [restrictionName, setRestrictionName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isAllRooms, setIsAllRooms] = useState(false);
  const [minNights, setMinNights] = useState("");
  const [multipleMinNights, setMultipleMinNights] = useState(false);
  const [maxNights, setMaxNights] = useState("");
  const [daysClosedArrival, setDaysClosedArrival] = useState(false);
  const [daysClosedDeparture, setDaysClosedDeparture] = useState(false);
  const [forcedArrival, setForcedArrival] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const submitSpecialPrices = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
  }, []);

  return (
    <section className="w-full flex flex-col items-center my-10">
      <div className=" w-full flex flex-col gap-4">
        <div className=" rounded-md border">
          <h4 className="text-lg font-semibold border-b  p-3">Details</h4>
          <form onSubmit={submitSpecialPrices}>
            <div className="w-full p-5 flex flex-col gap-8">
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Restriction Name *</h6>
                  <p className=" text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
                  </p>
                </div>
                <TextInput
                  inputType="text"
                  isRequired={true}
                  value={restrictionName}
                  setValue={setRestrictionName}
                  id="restriction-name"
                  placeholder="Restriction Name"
                />
              </div>
              {/* from - to  */}
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">From Date</h6>
                  <p className=" text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
                  </p>
                </div>{" "}
                <DateInput
                  inputType="date"
                  isRequired={true}
                  value={from}
                  setValue={setFrom}
                  id="from-date"
                  placeholder="From"
                  label="From"
                />
              </div>
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">To Date</h6>
                  <p className=" text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
                  </p>
                </div>
                <DateInput
                  inputType="date"
                  isRequired={true}
                  value={to}
                  setValue={setTo}
                  id="to-date"
                  placeholder="To"
                  label="To"
                />
              </div>

              <div className=" w-full flex justify-between items-center gap-3">
                <h6 className=" text-lg">Apply to all rooms</h6>
                <Switch
                  id="apply-to-all-rooms"
                  value={isAllRooms}
                  setValue={setIsAllRooms}
                />
              </div>
              {/* select */}
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">
                    Min Num of Nights *
                  </h6>
                  <p className=" text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
                  </p>
                </div>
                <Select
                  isRequired={true}
                  value={minNights}
                  setValue={setMinNights}
                  id="min-nights"
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {Array.from({ length: 8 }, (_, index) => (
                    <option key={index} value={`${index + 1}`}>
                      {index + 1}
                    </option>
                  ))}
                </Select>
              </div>
              <div className=" w-full flex justify-between items-center gap-3">
                <h6 className=" text-lg">Multiply Min number of Nights</h6>
                <Switch
                  id="apply-to-all-rooms"
                  value={multipleMinNights}
                  setValue={setMultipleMinNights}
                />
              </div>
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Max Num of Nights</h6>
                  <p className=" text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
                  </p>
                </div>
                <Select
                  isRequired={true}
                  value={maxNights}
                  setValue={setMaxNights}
                  id="max-nights"
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {Array.from({ length: 8 }, (_, index) => (
                    <option key={index} value={`${index + 1}`}>
                      {index + 1}
                    </option>
                  ))}
                </Select>
              </div>
              <div className=" w-full flex justify-between items-center gap-3">
                <h6 className=" text-lg">Set Days Closed to Arrival (CTA)</h6>
                <Switch
                  id="days-closed-for-arrival"
                  value={daysClosedArrival}
                  setValue={setDaysClosedArrival}
                />
              </div>
              <div className=" w-full flex justify-between items-center gap-3">
                <h6 className=" text-lg">Set Days Closed to Departure (CTD)</h6>
                <Switch
                  id="days-closed-to-departure"
                  value={daysClosedDeparture}
                  setValue={setDaysClosedDeparture}
                />
              </div>
              {/* select */}
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">
                    Force Arrival Week Day
                  </h6>
                  <p className=" text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
                  </p>
                </div>
                <WeekdaysSelect
                  isRequired={true}
                  value={forcedArrival}
                  setValue={setForcedArrival}
                  id="force-arrival-day"
                />
              </div>
            </div>
            <div className=" flex items-center justify-end gap-4 my-10 p-4">
              <div className=" w-fit">
                <LoadingButton
                  type="button"
                  label="Back"
                  variant={2}
                  isLoading={isSaving}
                />
              </div>
              <div className=" w-fit">
                <LoadingButton
                  type="submit"
                  label="Save"
                  isLoading={isSaving}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

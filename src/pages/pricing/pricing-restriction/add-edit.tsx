import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import Select from "../../../components/inputs/select";
import TextInput from "../../../components/inputs/textInput";
import Switch from "../../../components/switch";
import LoadingButton from "../../../components/button";
import DateInput from "../../../components/inputs/dateInput";
import WeekdaysSelect from "../../../components/inputs/select/weekdaysSelect";
import useAxios from "../../../useHooks/useAxios";
import Search from "../../../components/inputs/search";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import {
  addRestrictionssToList,
  replaceRestrictionssInList,
} from "../../../stores/apiData/restrictions";
import useGetRestriction from "../../../services-hooks/pricing/useGetRestrictionById";
import LinkButton from "../../../components/button/linkButton";

export default function AddEditRestriction({ id }: { id?: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const { data } = useGetRestriction({ id });

  const [restrictionName, setRestrictionName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [minNights, setMinNights] = useState("");
  const [maxNights, setMaxNights] = useState("");
  const [multipleMinNights, setMultipleMinNights] = useState(false);
  const [daysClosedArrival, setDaysClosedArrival] = useState(false);
  const [daysClosedDeparture, setDaysClosedDeparture] = useState(false);
  const [isAllRooms, setIsAllRooms] = useState(false);
  const [forcedArrival, setForcedArrival] = useState("");
  const [appliacleToApartment, setApplicableToApartment] = useState("all");
  const [selectedApt, setSelectedApt] = useState<
    { id: string; name: string }[]
  >([]);

  const [isSaving, setIsSaving] = useState(false);

  // update and populate fields
  useEffect(() => {
    if (data?.name && id) {
      const {
        name,
        from_date,
        to_date,
        min_no_of_nights,
        max_no_of_nights,
        multiply_min_no_of_nights,
        force_arrival_week_day,
        applicable_to_shortlet,
        set_days_closed_to_arrival,
        set_days_closed_to_departure,
      } = data;

      const new_from_date = new Date(from_date)?.toISOString()?.slice(0, 10);
      const new_to_date = new Date(to_date)?.toISOString()?.slice(0, 10);
      setRestrictionName(name || "");
      setFrom(new_from_date || "");
      setTo(new_to_date || "");
      setMinNights(String(min_no_of_nights || ""));
      setMaxNights(String(max_no_of_nights || ""));
      setMultipleMinNights(Boolean(multiply_min_no_of_nights || ""));
      setDaysClosedArrival(Boolean(set_days_closed_to_arrival));
      setDaysClosedDeparture(Boolean(set_days_closed_to_departure));
      // setIsAllRooms(false);
      setForcedArrival(force_arrival_week_day?.toLowerCase() || "");
      setApplicableToApartment(applicable_to_shortlet || "all");
    }
  }, [data]);

  const submitRestriction = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      try {
        setIsSaving(true);
        const payload = {
          name: restrictionName,
          from_date: from,
          to_date: to,
          min_no_of_nights: minNights,
          max_no_of_nights: maxNights,
          multiply_min_no_of_nights: multipleMinNights,
          set_days_closed_to_arrival: daysClosedArrival,
          set_days_closed_to_departure: daysClosedDeparture,
          set_days_closed_to_stay: false, //TODO: Get what this means
          force_arrival_week_day: forcedArrival,
          applicable_to_shortlet: appliacleToApartment, // all or specific
          applicable_shortlets: selectedApt?.map((item) => item?.id), // required if applicable_to_shortlet is specific
        };
        const newPayload = Object.fromEntries(
          Object.entries(payload).filter(([key]) =>
            key === "applicable_shortlets" &&
            !(payload?.applicable_to_shortlet === "specific")
              ? false
              : true
          )
        );
        if (id) {
          const putPaload = {
            name: restrictionName,
            applicable_to_shortlet: appliacleToApartment,
            remove_shortlets: [],
          };
          const response = await axios.put("/admin/restriction", putPaload);
          const { data, message } = response?.data || {};
          const response_data = data?.restriction;
          dispatch(replaceRestrictionssInList(response_data));
          dispatch(
            openSnackbar({
              message: message || "Restriction successfully updated",
              isError: false,
            })
          );
        } else {
          const response = await axios.post("/admin/restriction", newPayload);
          const { data, message } = response?.data || {};
          const response_data = data?.restriction;
          dispatch(addRestrictionssToList(response_data));
          dispatch(
            openSnackbar({
              message: message || "Restriction created successfully",
              isError: false,
            })
          );
        }
        navigate("/pricing/restrictions");
      } catch (error) {
      } finally {
        setIsSaving(false);
      }
    },
    [
      id,
      restrictionName,
      from,
      to,
      minNights,
      maxNights,
      multipleMinNights,
      daysClosedArrival,
      daysClosedDeparture,
      forcedArrival,
      appliacleToApartment,
      selectedApt,
    ]
  );

  return (
    <section className="w-full flex flex-col items-center my-10">
      <div className=" w-full flex flex-col gap-4">
        <div className=" rounded-md border">
          <h4 className="text-lg font-semibold border-b  p-3">Details</h4>
          <form onSubmit={submitRestriction}>
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
                  isRequired={false}
                  value={maxNights}
                  setValue={setMaxNights}
                  id="max-nights"
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {Array.from({ length: 30 }, (_, index) => (
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
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-center">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">
                    Applicable Shortlet
                  </h6>
                  <p className=" text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
                  </p>
                </div>
                <div className=" flex flex-col gap-3">
                  <Select
                    isRequired={true}
                    value={appliacleToApartment}
                    setValue={setApplicableToApartment}
                    id="apartment"
                  >
                    <option value="" disabled>
                      Applicable to apartment
                    </option>
                    <option value="all">All</option>
                    <option value="specific">Specific</option>
                  </Select>
                  {appliacleToApartment === "specific" && (
                    <Search
                      id="apartment-search"
                      componentId="apartment"
                      placeholder="Apartment name..."
                      updatelist={setSelectedApt}
                      multipleSelect={true}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-end gap-4 my-10 p-4">
              <div className=" w-fit">
                <LinkButton
                  url="/pricing/restrictions"
                  label="Back"
                  variant={2}
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

import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ReceiptIcon from "../../../assets/icons/receipt";
import Select from "../../../components/inputs/select";
import TextInput from "../../../components/inputs/textInput";
import TimeIcon from "../../../assets/icons/time";
import Switch from "../../../components/switch";
import LoadingButton from "../../../components/button";
// import WeekdaysSelect from "../../../components/inputs/select/weekdaysSelect";
// import ApartmentSingleSearch from "../../../components/inputs/search/apartment-single-search";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import {
  addSpecialPricesToList,
  replaceSpecialPricesInList,
} from "../../../stores/apiData/special-prices";
import useAxios from "../../../useHooks/useAxios";
import useGetSpecialPrice from "../../../services-hooks/pricing/useSpecialPrice";
import LinkButton from "../../../components/button/linkButton";
import Search from "../../../components/inputs/search";
import DateInput from "../../../components/inputs/dateInput";
import reservationValidator from "../../../utils/reservation-validator";
import MultipleSelect from "../../../components/inputs/select/multipleSelect";
import monthsDays from "../../../assets/days-months.json";
import { useNavigate } from "react-router-dom";
import purgeEmptyPayload from "../../../utils/remove-empty-payload";
import { formatDateToString } from "../../../utils/isoDateConverter";
import { clearRemovableIdStore } from "../../../stores/inAppDataInterations/addEditApartmentInfo";
const breadCrumb = [
  {
    url: "/pricing/special-prices",
    label: "Pricing",
    icon: <ReceiptIcon />,
  },
  {
    url: "#",
    label: "Special Prices",
    icon: "",
  },
];
export default function AddEditSpecialPrices({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data } = useGetSpecialPrice({ id });
  const navigate = useNavigate();
  const removedAptIdSet = useAppSelector(
    (state) => state.addEditApartmentInfo.value.data?.removeImages
  );

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Sepcial Prices",
        pageDescription: "Special prices",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const [name, setName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [weekdays, setWeekdays] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [isYearly, setIsYearly] = useState(false);
  const [seasonCheckin, setSeasonalCheckin] = useState(false);
  const [promotion, setPromotion] = useState(false);
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [validity, setValidity] = useState("temporary");
  const [rountInt, setRoundInt] = useState(false);
  const [applicableApartment, setApplicableToApartment] = useState("all");
  const [selectedApt, setSelectedApt] = useState<
    { id: string; name: string }[]
  >([]);
  const [priceType, setPriceType] = useState("percentage");
  const [resuseable, setReusable] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  // update and populate fields
  useEffect(() => {
    if (data?.name && id) {
      const {
        name,
        check_in_date,
        check_out_date,
        weekday,
        days,
        tied_to_year,
        at_season_beginning,
        promotion,
        type,
        price,
        percentage,
        round_to_integer,
        applicable_to_shortlet,
        price_type,
        // applicable_shortlets,
      } = data;
      const new_check_in_date = formatDateToString(new Date(check_in_date));
      const new_check_out_date = formatDateToString(new Date(check_out_date));
      setName(name || "");
      setCheckIn(new_check_in_date || "");
      setCheckOut(new_check_out_date || "");
      setWeekdays(weekday || "");
      setDays(days || []);
      setIsYearly(Boolean(tied_to_year || 0));
      setSeasonalCheckin(Boolean(at_season_beginning || 0));
      setPromotion(Boolean(promotion || 0));
      setType(type);
      setValue(String(price || percentage));
      setRoundInt(Boolean(round_to_integer));
      setApplicableToApartment(applicable_to_shortlet || "all");
      setPriceType(price_type || "percentage");
    }
  }, [data]);

  const submitSpecialPrices = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const validatorResponse = reservationValidator({
        data: {
          "Check in date": checkIn,
          "Check out date": checkOut,
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
      try {
        setIsSaving(true);
        const payload = {
          name: name,
          check_in_date: checkIn,
          check_out_date: checkOut,
          days: days,
          // weekday: weekdays,
          tied_to_year: isYearly,
          at_season_beginning: seasonCheckin,
          promotion: promotion,
          round_to_integer: rountInt,
          applicable_to_shortlet: applicableApartment, // all or specific
          type: type,
          price_type: priceType, //percentage or price
          validity: validity, //temporary or permanent
          is_reusable: resuseable ? "yes" : "no", // yes or no
          applicable_shortlets: selectedApt?.map((item) => item?.id), // required if applicable_to_shortlet is specific
          price: priceType === "price" ? value : "", //required if price_type is price
          percentage: priceType === "percentage" ? value : "", //required if price_type is percentage,
          remove_shortlets: removedAptIdSet,
        };

        const newPayload = Object.fromEntries(
          Object.entries(payload).filter(([key]) =>
            key === "applicable_shortlets" &&
            !(payload?.applicable_to_shortlet === "specific")
              ? false
              : true
          )
        );
        const updatePayload = purgeEmptyPayload({ payload: newPayload });
        if (id) {
          // const putPaload = {
          //   name: name,
          //   applicable_shortlets: selectedApt?.map((item) => item?.id),
          //   price: value,
          // };
          const response = await axios.put(
            `/admin/special-price/${id}`,
            updatePayload
          );
          const { data, message } = response?.data || {};
          dispatch(replaceSpecialPricesInList(data));
          dispatch(
            openSnackbar({
              message: message || "Special Prices successfully updated",
              isError: false,
            })
          );
        } else {
          const response = await axios.post(
            "/admin/special-price",
            updatePayload
          );
          const { data, message } = response?.data || {};
          const result = data?.special_price;
          dispatch(addSpecialPricesToList(result));
          dispatch(
            openSnackbar({
              message: message || "Special Prices successfully created",
              isError: false,
            })
          );
        }
        dispatch(clearRemovableIdStore());
        navigate("/pricing/special-prices");
      } catch (error) {
      } finally {
        setIsSaving(false);
      }
    },
    [
      name,
      checkIn,
      checkOut,
      weekdays,
      days,
      isYearly,
      seasonCheckin,
      promotion,
      rountInt,
      applicableApartment,
      type,
      priceType,
      validity,
      selectedApt,
      value,
      resuseable,
      removedAptIdSet,
    ]
  );

  return (
    <section className="w-full flex flex-col items-center my-10">
      <div className=" w-full flex flex-col gap-4">
        <div className=" rounded-md border">
          <div className=" w-full flex items-center justify-between gap-3  border-b  p-3">
            <h4 className="text-lg font-semibold flex items-center gap-3">
              <span>Seasons and Week Days</span> <TimeIcon />
            </h4>
          </div>
          <form onSubmit={submitSpecialPrices}>
            <div className="w-full p-5 flex flex-col gap-8">
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Check-In</h6>
                  <p className=" text-gray-500">Start date of pricing.</p>
                </div>
                <DateInput
                  inputType="date"
                  isRequired={false}
                  value={checkIn}
                  setValue={setCheckIn}
                  id="check-in-date"
                  placeholder="Check-in Date"
                  label="Check-in Date"
                  // allowOnlyFutureDates={true}
                />
              </div>
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Check-Out</h6>
                  <p className=" text-gray-500">End date of pricing.</p>
                </div>
                <DateInput
                  inputType="date"
                  isRequired={false}
                  value={checkOut}
                  setValue={setCheckOut}
                  id="check-out-date"
                  placeholder="Check-out Date"
                  label="Check-out Date"
                  // allowOnlyFutureDates={true}
                />
              </div>
              {/* select */}
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Weekdays</h6>
                  <p className=" text-gray-500">Number of days applicable.</p>
                </div>
                <MultipleSelect
                  value={days}
                  setValue={setDays}
                  label="weekdays"
                  options={monthsDays?.fulldays?.map((item) => ({
                    id: item?.toLowerCase(),
                    label: item,
                  }))}
                />
                {/* <WeekdaysSelect
                  isRequired={true}
                  value={weekdays}
                  setValue={setWeekdays}
                  id="weekdays"
                /> */}
              </div>
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Special Price Name</h6>
                  <p className=" text-gray-500">
                    The official or marketed name of the price.
                  </p>
                </div>
                <TextInput
                  inputType="text"
                  isRequired={true}
                  value={name}
                  setValue={setName}
                  id="price-name"
                  placeholder="Enter Name"
                />
              </div>

              <div className=" w-full flex justify-between items-center gap-3">
                <div className=" max-w-md">
                  <h6 className=" text-lg">Tied to the Year</h6>
                  <p className=" text-gray-500">
                    If disabled, the pricing rule will be applied on the
                    selected range of dates regardless of the year.
                  </p>
                </div>
                <Switch
                  id="tied-to-year"
                  value={isYearly}
                  setValue={setIsYearly}
                />
              </div>
              <div className=" w-full flex justify-between items-center gap-3">
                <div className=" max-w-md">
                  <h6 className=" text-lg">
                    Check-in Date must be after the beginning of season
                  </h6>
                  <p className=" text-gray-500">
                    If enabled, the rule will be applied only if the check-in
                    date for the stay is included in the range of dates.
                  </p>
                </div>
                <Switch
                  id="seasonal-checkin"
                  value={seasonCheckin}
                  setValue={setSeasonalCheckin}
                />
              </div>
              <div className=" w-full flex justify-between items-center gap-3">
                <div className=" max-w-md">
                  <h6 className=" text-lg">Promotion</h6>
                  <p className=" text-gray-500">
                    Make this pricing rule a "Promotion" to display it in the
                    front-end booking process (Slashed price/Sale).
                  </p>
                </div>
                <Switch
                  id="promotion"
                  value={promotion}
                  setValue={setPromotion}
                />
              </div>
              {/* select */}
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Type</h6>
                  <p className=" text-gray-500">
                    Is it an additional charge or a discount.
                  </p>
                </div>
                <Select
                  isRequired={true}
                  value={type}
                  setValue={setType}
                  id="type"
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="additional-charge">Additional Charge</option>
                  <option value="discount">Discount</option>
                </Select>
              </div>

              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Type of Price</h6>
                  <p className=" text-gray-500">
                    Is it an additional charge or a discount.
                  </p>
                </div>
                <Select
                  isRequired={true}
                  value={priceType}
                  setValue={setPriceType}
                  id="price-type"
                >
                  <option value="" disabled>
                    Price Type
                  </option>
                  <option value="price">Price</option>
                  <option value="percentage">Percentage</option>
                </Select>
              </div>
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">
                    {priceType === "price" ? "Price" : "Percentage"}
                  </h6>
                  <p className=" text-gray-500">
                    {priceType === "price"
                      ? "Fixed price value"
                      : "Percentage value (0 - 100)"}
                  </p>
                </div>
                <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                  <TextInput
                    inputType="text"
                    isRequired={true}
                    value={value}
                    setValue={setValue}
                    id="value"
                    placeholder="Enter value"
                  />
                  <Select
                    isRequired={true}
                    value={validity}
                    setValue={setValidity}
                    id="value-select"
                  >
                    <option value="" disabled>
                      Validity
                    </option>
                    <option value="temporary">Temporary</option>
                    <option value="permanent">Permanent</option>
                  </Select>
                </div>
              </div>
              {/* select */}
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Round To Integer</h6>
                  <p className=" text-gray-500">
                    Should the final value be rounded up or rounded down.
                  </p>
                </div>
                <Switch
                  id="round-int"
                  value={rountInt}
                  setValue={setRoundInt}
                />
              </div>
              {/* select */}
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-center">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">
                    Applicable Shortlet
                  </h6>
                  <p className=" text-gray-500">
                    Select all the apartments applicable.
                  </p>
                </div>
                <div className=" flex flex-col gap-3">
                  <Select
                    isRequired={true}
                    value={applicableApartment}
                    setValue={setApplicableToApartment}
                    id="apartment"
                  >
                    <option value="" disabled>
                      Applicable to apartment
                    </option>
                    <option value="all">All</option>
                    <option value="specific">Specific</option>
                  </Select>
                  {applicableApartment === "specific" && (
                    <Search
                      id="apartment-search"
                      componentId="apartment"
                      placeholder="Apartment name..."
                      updatelist={setSelectedApt}
                      multipleSelect={true}
                      defaultValues={data?.applicable_shortlets}
                    />
                  )}
                </div>
              </div>

              <div className=" w-full flex justify-between items-center gap-3">
                <div className=" max-w-md">
                  <h6 className=" text-lg">Is resuable</h6>
                  <p className=" text-gray-500">
                    Is this a one-time use or is it reusable.
                  </p>
                </div>
                <Switch
                  id="reusable"
                  value={resuseable}
                  setValue={setReusable}
                />
              </div>
            </div>
            <div className=" flex items-center justify-end gap-4 my-10 p-4">
              <div className=" w-fit">
                <LinkButton
                  url="/pricing/special-prices"
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

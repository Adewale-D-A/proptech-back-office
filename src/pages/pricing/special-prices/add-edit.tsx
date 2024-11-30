import { SyntheticEvent, useCallback, useLayoutEffect, useState } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ReceiptIcon from "../../../assets/icons/receipt";
import Select from "../../../components/inputs/select";
import TextInput from "../../../components/inputs/textInput";
import TimeIcon from "../../../assets/icons/time";
import Switch from "../../../components/switch";
import ApartmentSingleSelect from "../../../components/inputs/select/apartmentSelect";
import LoadingButton from "../../../components/button";
import WeekdaysSelect from "../../../components/inputs/select/weekdaysSelect";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import { addSpecialPricesToList } from "../../../stores/apiData/special-prices";
import useAxios from "../../../useHooks/useAxios";

const breadCrumb = [
  {
    url: "#",
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
  const axios = useAxios();
  const dispatch = useAppDispatch();

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

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [weekdays, setWeekdays] = useState("");
  const [isYearly, setIsYearly] = useState(false);
  const [seasonCheckin, setSeasonalCheckin] = useState(false);
  const [promotion, setPromotion] = useState(false);
  const [priceName, setPriceName] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [valueSelect, setValueSelect] = useState("");
  const [rountInt, setRoundInt] = useState("");
  const [apartment, setApartment] = useState("");
  const [priceType, setPriceType] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const submitSpecialPrices = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const payload = {
        name: "October Special Price",
        check_in_date: "2025-10-24",
        check_out_date: "2025-12-11",
        weekday: "lorem ipsum",
        tied_to_year: true,
        at_season_beginning: true,
        promotion: true,
        round_to_integer: true,
        applicable_to_shortlet: "specific", // all or specific
        type: "lorem ipsum",
        price_type: "percentage", //percentage or price
        validity: "permanent", //temporary or permanent
        is_reusable: "yes", // yes or no
        applicable_shortlets: [1, 2], // required if applicable_to_shortlet is specific
        price: 50000, //required if price_type is price
        percentage: 20, //required if price_type is percentage
      };
      const newPayload = Object.fromEntries(
        Object.entries(payload).filter(([key]) =>
          key === "applicable_shortlets" &&
          !(payload?.applicable_to_shortlet === "specific")
            ? false
            : true
        )
      );
      const response = await axios.post("/admin/restriction", newPayload);
      const { data, message } = response?.data || {};
      const response_data = data?.special_price;
      dispatch(addSpecialPricesToList(response_data));
      dispatch(
        openSnackbar({
          message: message || "Restriction created successfully",
          isError: false,
        })
      );
    } catch (error) {
    } finally {
      setIsSaving(false);
    }
  }, []);

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
                  <p className=" text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
                  </p>
                </div>
                <TextInput
                  inputType="text"
                  isRequired={true}
                  value={checkIn}
                  setValue={setCheckIn}
                  id="check-in-date"
                  placeholder="Check-in date"
                />
              </div>
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Check-Out</h6>
                  <p className=" text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
                  </p>
                </div>
                <TextInput
                  inputType="text"
                  isRequired={true}
                  value={checkOut}
                  setValue={setCheckOut}
                  id="check-out"
                  placeholder="Check-out"
                />
              </div>
              {/* select */}
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Weekdays</h6>
                  <p className=" text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
                  </p>
                </div>
                <WeekdaysSelect
                  isRequired={true}
                  value={weekdays}
                  setValue={setWeekdays}
                  id="weekdays"
                />
              </div>
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Special Price Name</h6>
                  <p className=" text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
                  </p>
                </div>
                <TextInput
                  inputType="text"
                  isRequired={true}
                  value={priceName}
                  setValue={setPriceName}
                  id="price-name"
                  placeholder="Enter Name"
                />
              </div>

              <div className=" w-full flex justify-between items-center gap-3">
                <h6 className=" text-lg">Tied to the Year</h6>
                <Switch
                  id="tied-to-year"
                  value={isYearly}
                  setValue={setIsYearly}
                />
              </div>
              <div className=" w-full flex justify-between items-center gap-3">
                <h6 className=" text-lg">
                  Check-in Date must be after the beginning of season
                </h6>
                <Switch
                  id="seasonal-checkin"
                  value={seasonCheckin}
                  setValue={setSeasonalCheckin}
                />
              </div>
              <div className=" w-full flex justify-between items-center gap-3">
                <h6 className=" text-lg">Promotion</h6>
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
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
                  <option value="regular">Regular</option>
                </Select>
              </div>
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Value</h6>
                  <p className=" text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
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
                    value={valueSelect}
                    setValue={setValueSelect}
                    id="value-select"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="one">1</option>
                  </Select>
                </div>
              </div>
              {/* select */}
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Round To Integer</h6>
                  <p className=" text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
                  </p>
                </div>
                <Select
                  isRequired={true}
                  value={rountInt}
                  setValue={setRoundInt}
                  id="round-integer"
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="2">1</option>
                </Select>
              </div>
              {/* select */}
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Apartments</h6>
                  <p className=" text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
                  </p>
                </div>
                <ApartmentSingleSelect
                  isRequired={true}
                  value={apartment}
                  setValue={setApartment}
                  id="price-type"
                  placeholder="Select Apartment(s)"
                />
              </div>
              {/* select */}
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-end">
                <div className=" max-w-md">
                  <h6 className=" text-lg font-semibold">Type of Price</h6>
                  <p className=" text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae labore.
                  </p>
                </div>
                <Select
                  isRequired={true}
                  value={priceType}
                  setValue={setPriceType}
                  id="price-type"
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="regular">Regular</option>
                </Select>
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

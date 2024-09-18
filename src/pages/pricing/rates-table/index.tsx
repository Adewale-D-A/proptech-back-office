import { SyntheticEvent, useCallback, useLayoutEffect, useState } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ReceiptIcon from "../../../assets/icons/receipt";
import ImageCarousel from "../../../components/cards/image-carousel";
import LocationPinIcon from "../../../assets/icons/location";
import BathIcon from "../../../assets/icons/bath";
import Select from "../../../components/inputs/select";
import LoadingButton from "../../../components/button";
import DateInput from "../../../components/inputs/dateInput";
import TextInput from "../../../components/inputs/textInput";
import PriceRateList from "../../../components/tables/pricingRateLists";

const breadCrumb = [
  {
    url: "#",
    label: "Pricing",
    icon: <ReceiptIcon />,
  },
  {
    url: "#",
    label: "Rate Table",
    icon: "",
  },
];
export default function RateTable() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Rate Table",
        pageDescription: "Rate table",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const [apartment, setApartment] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rate, setRate] = useState("");
  const [cautionFee, setCautionFee] = useState("");

  const submitRate = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
  }, []);
  return (
    <section className="w-full flex flex-col items-center my-10">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className=" w-full rounded-md border p-2 flex flex-col gap-3">
            <Select
              isRequired={true}
              value={apartment}
              setValue={setApartment}
              id="all-status"
            >
              <option value="">Select any apartment</option>
              <option value="sunshine-apt">Sunshine - 2 Bedroom</option>
            </Select>
            <ImageCarousel
              images={[
                { url: "/temp/temp_apartment_1.jpg" },
                { url: "/temp/temp_apartment_2.jpg" },
                { url: "/temp/temp_apartment_2.jpg" },
              ]}
            />
            <div className=" flex flex-col gap-2 border-b py-3">
              <div className=" flex items-center justify-between gap-4">
                <h4 className="text-xl font-semibold">Sunshine - 2 Bedroom</h4>
              </div>
              <div className=" text-sm text-gray-500 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <LocationPinIcon className=" h-4 w-4" /> Lekki Phase II
                </span>
                <span className="flex items-center gap-1">
                  <BathIcon className=" h-4 w-4" /> 2 Bathrooms
                </span>
              </div>
            </div>
            <div className="pb-3">
              <form onSubmit={submitRate} className="flex flex-col gap-3">
                <h6 className="text-md font-semibold">Add Rates Per Night</h6>
                <DateInput
                  inputType="date"
                  isRequired={true}
                  value={from}
                  setValue={setFrom}
                  id="from-date"
                  placeholder="From"
                  label="From"
                />
                <DateInput
                  inputType="date"
                  isRequired={true}
                  value={to}
                  setValue={setTo}
                  id="to-date"
                  placeholder="To"
                  label="To"
                />
                <h6 className="text-md font-semibold border-t py-3">
                  Add Rates Per Night
                </h6>{" "}
                <TextInput
                  inputType="number"
                  isRequired={true}
                  value={rate}
                  setValue={setRate}
                  id="standate-rate"
                  placeholder="Enter Standard Rate"
                />
                <TextInput
                  inputType="number"
                  isRequired={true}
                  value={cautionFee}
                  setValue={setCautionFee}
                  id="caution-fee"
                  placeholder="Enter Caution Fee"
                />
                <LoadingButton label="Insert" isLoading={false} type="submit" />
              </form>
            </div>
          </div>
          <div className=" w-full flex flex-col gap-4">
            {/* Rate List */}
            <div className=" rounded-md border">
              <div className=" w-full flex items-center justify-between gap-3  border-b  p-3">
                <h4 className="text-lg font-semibold flex items-center gap-3">
                  <ReceiptIcon /> <span>Rate List</span>
                </h4>
                <div className=" w-fit">
                  <LoadingButton
                    label="Update Rates"
                    isLoading={false}
                    type="button"
                    variant={2}
                  />
                </div>
              </div>
              <div className="w-full">
                <PriceRateList
                  header={[
                    "S/N",
                    "Rates Per Nights",
                    "Standard Rates",
                    "Action",
                  ]}
                  data={[
                    {
                      id: 1,
                      nights: 2,
                      standardRate: "10000",
                    },
                    {
                      id: 2,
                      nights: 3,
                      standardRate: "40000",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

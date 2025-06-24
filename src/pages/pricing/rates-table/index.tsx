import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ReceiptIcon from "../../../assets/icons/receipt";
import ImageCarousel from "../../../components/cards/image-carousel";
import LocationPinIcon from "../../../assets/icons/location";
import BathIcon from "../../../assets/icons/bath";
import LoadingButton from "../../../components/button";
import TextInput from "../../../components/inputs/textInput";
import PriceRateList from "../../../components/tables/pricingRateLists";
import { apartmentById } from "../../../types/apiData/apartment";
import useAxios from "../../../useHooks/useAxios";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import ApartmentSingleSearch from "../../../components/inputs/search/apartment-single-search";

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
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
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

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rate, setRate] = useState("");
  const [cautionFee, setCautionFee] = useState("");
  const [freeNights, setFreeNights] = useState("");
  const [selectedAprt, setSelectedApt] = useState<apartmentById>({} as any);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitRate = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await axios.post(`/admin/rate-list`, {
          shortlet_id: selectedAprt?.id,
          from: from,
          to: to,
          price: rate,
          caution_fee: cautionFee,
          // free_nights: freeNights
        });
        dispatch(
          openSnackbar({
            message: "Success",
            isError: false,
          })
        );
        setFrom("");
        setTo("");
        setRate("");
        setCautionFee("");
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedAprt, rate, cautionFee, from, to, freeNights]
  );

  return (
    <section className="w-full flex flex-col items-center my-10">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className=" w-full rounded-md border p-2 flex flex-col gap-3">
            <ApartmentSingleSearch
              setSelected={setSelectedApt}
              selected={selectedAprt}
              placeholder="Apartment name..."
            />
            {selectedAprt?.id && (
              <div className=" flex flex-col gap-3">
                <ImageCarousel
                  images={selectedAprt?.images?.map((item) => ({
                    url: item?.path,
                  }))}
                />
                <div className=" flex flex-col gap-2 border-b py-3">
                  <div className=" flex items-center justify-between gap-4">
                    <h4 className="text-xl font-semibold">
                      {selectedAprt?.name}
                    </h4>
                  </div>
                  <div className=" text-sm text-gray-500 flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1">
                      <LocationPinIcon className=" h-4 w-4" />{" "}
                      {selectedAprt?.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <BathIcon className=" h-4 w-4" />{" "}
                      {selectedAprt?.no_of_bathrooms} Bathrooms
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="pb-3">
              <form onSubmit={submitRate} className="flex flex-col gap-3">
                <h6 className="text-md font-semibold">Add Rates Per Night</h6>
                <TextInput
                  inputType="number"
                  isRequired={true}
                  value={from}
                  setValue={setFrom}
                  id="from-date"
                  placeholder="From"
                />
                <TextInput
                  inputType="number"
                  isRequired={true}
                  value={to}
                  setValue={setTo}
                  id="to-date"
                  placeholder="To"
                />
                <h6 className="text-md font-semibold border-t py-3">
                  Add Rates Per Night
                </h6>{" "}
                {/* default standard rate */}
                <div className="font-bold text-primary italic p-2 rounded-lg bg-primary/20">
                  <p>
                    Standard Rate: {selectedAprt?.currency}{" "}
                    {selectedAprt?.price}
                  </p>
                </div>
                <TextInput
                  inputType="number"
                  isRequired={true}
                  value={rate}
                  setValue={setRate}
                  id="standate-rate"
                  placeholder="Enter Custom Rate"
                />
                {/* default standard caution fee rate */}
                <div className="font-bold text-primary italic p-2 rounded-lg bg-primary/20">
                  <p>Standard Caution Fee: {selectedAprt?.caution_fee}</p>
                </div>
                <TextInput
                  inputType="number"
                  isRequired={true}
                  value={cautionFee}
                  setValue={setCautionFee}
                  id="caution-fee"
                  placeholder="Enter Custom Caution Fee"
                />
                <TextInput
                  inputType="number"
                  isRequired={true}
                  value={freeNights}
                  setValue={setFreeNights}
                  id="free-nights"
                  placeholder="Enter number of free nights applicable"
                />
                <LoadingButton
                  label="Insert"
                  disabled={!Boolean(selectedAprt?.id)}
                  isLoading={isSubmitting}
                  type="submit"
                />
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
                {/* <div className=" w-fit">
                  <LoadingButton
                    label="Update Rates"
                    isLoading={false}
                    type="button"
                    variant={2}
                  />
                </div> */}
              </div>
              <div className="w-full">
                <PriceRateList apartmentId={String(selectedAprt?.id || "")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

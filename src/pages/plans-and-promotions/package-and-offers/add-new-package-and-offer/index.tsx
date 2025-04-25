import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import PercentageBadgeIcon from "../../../../assets/icons/percentage-badge";
import { useAppDispatch, useAppSelector } from "../../../../stores/hooks";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import LoadingButton from "../../../../components/button";
import DateInput from "../../../../components/inputs/dateInput";
import Select from "../../../../components/inputs/select";
import TextAreaInput from "../../../../components/inputs/textArea";
import TextInput from "../../../../components/inputs/textInput";
import FileInput from "../../../../components/inputs/fileInput";
import CheckboxInput from "../../../../components/inputs/checkbox/checkbox";
import Search from "../../../../components/inputs/search";
// import Switch from "../../../../components/switch";
import {
  addPackageAndOfferToList,
  replacePackageAndOfferInList,
} from "../../../../stores/apiData/packages-and-offers";
import { openSnackbar } from "../../../../stores/appFunctionality/snackbar";
import useAxiosMultipart from "../../../../useHooks/useAxiosMultipart";
import useGetOffer from "../../../../services-hooks/userGetOffer";
import { formatDateToString } from "../../../../utils/isoDateConverter";
import purgeEmptyPayload from "../../../../utils/remove-empty-payload";
import { clearRemovableIdStore } from "../../../../stores/inAppDataInterations/addEditApartmentInfo";
import LinkButton from "../../../../components/button/linkButton";

const breadCrumb = [
  {
    url: "/plans-and-promotions/packages-and-offers",
    label: "Plans & Promotions",
    icon: <PercentageBadgeIcon />,
  },
  {
    url: "#",
    label: "Add New Package & Offer",
    icon: "",
  },
];
export default function AddNewPackageAndOffer() {
  const { id } = useParams();
  const axios = useAxiosMultipart({
    disableSuccMssg: false,
    disableErrMssg: false,
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data } = useGetOffer({
    id,
  });
  const removedAptIdSet = useAppSelector(
    (state) => state.addEditApartmentInfo.value.data?.removeImages
  );

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Add New Package & Offer",
        pageDescription: "Add new package and offer",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [file, setFile] = useState<{
    name: string;
    size: number;
    preview: string;
  }>({} as any);
  const [validityStartDate, setValidityStartDate] = useState("");
  const [validityEndDate, setValidityEndDate] = useState("");
  // const [excludeDates, setExcludeDate] = useState(false);
  const [isAllRoomss, setIsAllRooms] = useState(false);
  const [selectApartments, setSelectedApartments] = useState<
    { id: string; name: string }[]
  >([]);
  const [minNights, setMinNights] = useState("");
  const [maxNights, setMaxNights] = useState("");
  // const [taxRate, setTaxRate] = useState("");
  const [type, setType] = useState("");
  const [cost, setCost] = useState("");
  const [percentage, setPercentage] = useState("");
  const [conditions, setConditions] = useState("");
  const [benefits, setBenefits] = useState("");
  // const [isPerPerson, setIsPerPerson] = useState(false);
  // const [roomOptions, setRoomOptions] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // auto populate
  useEffect(() => {
    if (data?.name) {
      const {
        name,
        image,
        start_date,
        end_date,
        applicable_to,
        type,
        applicable_shortlets,
        minimum_number_of_nights,
        maximum_number_of_nights,
        price,
        percentage,
        short_description,
        description,
        conditions,
        benefits,
      } = data;
      const startDateValue = formatDateToString(new Date(start_date));
      const endDateValue = formatDateToString(new Date(end_date));

      setName(name);
      setDescription(description);
      setShortDescription(short_description);
      setFile({ preview: image, size: 0, name: "image 1" });
      setValidityStartDate(startDateValue);
      setValidityEndDate(endDateValue);
      setIsAllRooms(applicable_to === "all" ? true : false);

      setMinNights(String(minimum_number_of_nights || ""));
      setMaxNights(String(maximum_number_of_nights || ""));
      setType(type || "");
      setCost(String(price) || "");
      setPercentage(String(percentage) || "");
      setConditions(conditions);
      setBenefits(benefits);
    }
  }, [data]);

  // const saveAndClose = useCallback(() => {
  //   navigate("/plans-and-promotions/packages-and-offers");
  // }, []);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      const payload = {
        name,
        description: description,
        image: file,
        start_date: validityStartDate,
        end_date: validityEndDate,
        applicable_to: isAllRoomss ? "all" : "specific",
        type: type,
        applicable_shortlets: selectApartments?.map((item) => item?.id),
        minimum_number_of_nights: minNights,
        maximum_number_of_nights: maxNights,
        price: cost,
        percentage,
        short_description: shortDescription,
        conditions: conditions,
        benefits: benefits,
        remove_shortlets: removedAptIdSet,
      };
      // conditionally filter payload based on the offer parameters
      const newPayload = Object.fromEntries(
        Object.entries(payload).filter(([key]) =>
          (key === "price" && type === "percentage") ||
          (key === "percentage" && type === "price") ||
          (key === "image" && file?.size < 10)
            ? false
            : true
        )
      );
      const updatedPayload = purgeEmptyPayload({ payload: newPayload });
      try {
        if (id) {
          delete updatedPayload?.start_date;
          delete updatedPayload?.end_date;
          const response = await axios.post(
            `/admin/offer/update/${id}`,
            updatedPayload
          );
          const dataset = response?.data?.data;
          dispatch(replacePackageAndOfferInList(dataset));
        } else {
          const response = await axios.post("/admin/offer", updatedPayload);
          const dataset = response?.data?.data;
          dispatch(addPackageAndOfferToList(dataset));
        }
        dispatch(
          openSnackbar({
            message: id
              ? "Offer succesffully updated"
              : "Package successfully added",
            isError: false,
          })
        );
        dispatch(clearRemovableIdStore());
        navigate("/plans-and-promotions/packages-and-offers");
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      id,
      name,
      description,
      file,
      validityEndDate,
      validityStartDate,
      isAllRoomss,
      type,
      selectApartments,
      minNights,
      maxNights,
      cost,
      percentage,
      shortDescription,
      conditions,
      benefits,
      removedAptIdSet,
    ]
  );
  return (
    <section className="w-full flex flex-col items-center my-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-screen-xl flex flex-col gap-10"
      >
        <div className="w-full flex gap-4 justify-between border-b py-4">
          <h3 className="font-semibold text-xl">Add New Package/Offer</h3>
          <div className=" flex items-center gap-3">
            {/* <LoadingButton
              type="button"
              isLoading={false}
              label="Close"
              variant={2}
              clickHandler={() => saveAndClose()}
            /> */}
            <LinkButton
              url="/plans-and-promotions/packages-and-offers"
              label="Close"
              variant={2}
            />
            <LoadingButton
              type="submit"
              isLoading={isSubmitting}
              label={id ? "Update Package" : "Save Package"}
            />
          </div>
        </div>{" "}
        <div className="w-full flex flex-col md:flex-row gap-5 items-stretch">
          <div className=" w-full rounded-md border flex-1 md:flex-[0.6] flex flex-col gap-3">
            <h4 className="text-xl font-semibold border-b  p-2">
              Package/Offer Details
            </h4>
            <div className="w-full p-2 flex flex-col gap-5">
              <TextInput
                isRequired={true}
                inputType="text"
                placeholder="Enter Package Name"
                id="package-name"
                value={name}
                setValue={setName}
              />
              <FileInput
                value={file}
                setValue={setFile}
                label="Upload Image"
                isRequired={false}
                id="image-upload"
              />
              <DateInput
                inputType="date"
                isRequired={true}
                value={validityStartDate}
                setValue={setValidityStartDate}
                id="validity-start-date"
                placeholder="Validity Start Date"
                label="Check-in Date"
                readonly={Boolean(id)}
              />
              <DateInput
                inputType="date"
                isRequired={true}
                value={validityEndDate}
                setValue={setValidityEndDate}
                id="validity-end-date"
                placeholder="Validity End Date"
                label="Check-in Date"
                readonly={Boolean(id)}
              />
              {/* <CheckboxInput
                value={excludeDates}
                setValue={setExcludeDate}
                label="Exclude Dates"
                id="exclude-date"
              /> */}
              <Search
                componentId="apartment"
                placeholder="Assign to apartments"
                id="search-apartments"
                multipleSelect={true}
                updatelist={setSelectedApartments}
                defaultValues={data?.applicable_shortlets}
              />
              <CheckboxInput
                value={isAllRoomss}
                setValue={setIsAllRooms}
                label="Select all rooms"
                id="exclude-date"
              />

              <TextInput
                isRequired={true}
                inputType="number"
                placeholder="Enter Min Number of Nights"
                id="min-nights"
                value={minNights}
                setValue={setMinNights}
              />
              <TextInput
                isRequired={true}
                inputType="number"
                placeholder="Enter Max Number of Nights"
                id="max-nights"
                value={maxNights}
                setValue={setMaxNights}
              />
              {/* <Select
                isRequired={true}
                value={taxRate}
                setValue={setTaxRate}
                id="select-tax-rate"
              >
                <option value="">Select Tax Rate</option>
                <option value="10%">10%</option>
                <option value="20%">20%</option>
              </Select> */}
              <Select
                isRequired={true}
                value={type}
                setValue={setType}
                id="select-cost-type"
              >
                <option value="" disabled>
                  Select Cost Type
                </option>
                <option value="price">Price</option>
                <option value="percentage">Percentage</option>
              </Select>
              {type === "price" && (
                <TextInput
                  isRequired={true}
                  inputType="number"
                  placeholder="Enter Package Cost"
                  id="price"
                  value={cost}
                  setValue={setCost}
                />
              )}
              {type === "percentage" && (
                <TextInput
                  isRequired={true}
                  inputType="number"
                  placeholder="Enter Package Perncetage"
                  id="percentage"
                  value={percentage}
                  setValue={setPercentage}
                />
              )}
              {/* <label
                htmlFor="is-per-person-cost"
                className=" w-full flex items-center justify-between"
              >
                <span>Cost Per Person</span>
                <Switch
                  id="is-per-person-cost"
                  value={isPerPerson}
                  setValue={setIsPerPerson}
                />
              </label> */}
              {/* <Select
                isRequired={true}
                value={roomOptions}
                setValue={setRoomOptions}
                id="select-room-option"
              >
                <option value="">Select Display Rooms Options</option>
                <option value="all">All Rooms</option>
                <option value="one-room">1 room</option>
              </Select> */}
            </div>
          </div>
          <div className=" w-full rounded-md border flex-1 md:flex-[0.4] flex flex-col gap-3">
            <div className=" flex items-center justify-between flex-col md:flex-row gap-3 border-b  p-2">
              <h4 className="text-xl font-semibold flex items-center gap-2">
                <span>Settings</span>
              </h4>
            </div>
            <div className="w-full p-2 flex flex-col gap-5">
              <TextAreaInput
                value={shortDescription}
                setValue={setShortDescription}
                id="short-description"
                isRequired={true}
                placeholder="Enter Package Short Description"
              />
              <TextAreaInput
                value={description}
                setValue={setDescription}
                id="package-description"
                isRequired={true}
                placeholder="Enter Package Description"
              />
              <TextAreaInput
                value={conditions}
                setValue={setConditions}
                id="conditions-for-package"
                isRequired={true}
                placeholder="Enter Condition for Package"
              />
              <TextAreaInput
                value={benefits}
                setValue={setBenefits}
                id="benefits-of-package"
                isRequired={true}
                placeholder="Enter Benefits of Package"
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

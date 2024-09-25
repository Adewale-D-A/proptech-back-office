import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useCallback, useLayoutEffect, useState } from "react";
import PercentageBadgeIcon from "../../../../assets/icons/percentage-badge";
import { useAppDispatch } from "../../../../stores/hooks";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import LoadingButton from "../../../../components/button";
import DateInput from "../../../../components/inputs/dateInput";
import Select from "../../../../components/inputs/select";
import TextAreaInput from "../../../../components/inputs/textArea";
import TextInput from "../../../../components/inputs/textInput";
import FileInput from "../../../../components/inputs/fileInput";
import CheckboxInput from "../../../../components/inputs/checkbox/checkbox";
import Search from "../../../../components/inputs/search";
import Switch from "../../../../components/switch";
import { addPackageAndOfferToList } from "../../../../stores/apiData/packages-and-offers";
import { openSnackbar } from "../../../../stores/appFunctionality/snackbar";

const breadCrumb = [
  {
    url: "/plans-and-promotions",
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
  const naviagte = useNavigate();
  const dispatch = useAppDispatch();
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
  const [file, setFile] = useState<{
    name: string;
    size: number;
    preview: string;
  }>({} as any);
  const [validityStartDate, setValidityStartDate] = useState("");
  const [validityEndDate, setValidityEndDate] = useState("");
  const [excludeDates, setExcludeDate] = useState(false);
  const [isAllRoomss, setIsAllRooms] = useState(false);
  const [minNights, setMinNights] = useState("");
  const [maxNights, setMaxNights] = useState("");
  const [cost, setCost] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [type, setType] = useState("");
  const [isPerPerson, setIsPerPerson] = useState(false);
  const [roomOptions, setRoomOptions] = useState("");

  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [conditions, setConditions] = useState("");
  const [benefits, setBenefits] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveAndClose = useCallback(() => {
    naviagte("/plans-and-promotions");
  }, []);

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        dispatch(
          addPackageAndOfferToList({
            id: "random",
            name,
            fromDate: validityStartDate,
            toDate: validityEndDate,
            price: cost,
            noOfRoomsAffected: roomOptions,
          })
        );
        dispatch(
          openSnackbar({
            message: "Package successfully added",
            isError: false,
          })
        );
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    },
    [name, validityStartDate, validityEndDate, cost, roomOptions]
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
            <LoadingButton
              type="button"
              isLoading={false}
              label="Save and Close"
              variant={2}
              clickHandler={() => saveAndClose()}
            />
            <LoadingButton
              type="submit"
              isLoading={isSubmitting}
              label="Save Package"
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
              />
              <DateInput
                inputType="date"
                isRequired={true}
                value={validityEndDate}
                setValue={setValidityEndDate}
                id="validity-end-date"
                placeholder="Validity End Date"
                label="Check-in Date"
              />
              <CheckboxInput
                value={excludeDates}
                setValue={setExcludeDate}
                label="Exclude Dates"
                id="exclude-date"
              />
              <Search placeholder="Search available rooms" id="search-room" />
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
              <TextInput
                isRequired={true}
                inputType="number"
                placeholder="Enter Package Cost Number"
                id="max-nights"
                value={cost}
                setValue={setCost}
              />
              <Select
                isRequired={true}
                value={taxRate}
                setValue={setTaxRate}
                id="select-tax-rate"
              >
                <option value="">Select Tax Rate</option>
                <option value="10%">10%</option>
                <option value="20%">20%</option>
              </Select>
              <Select
                isRequired={true}
                value={type}
                setValue={setType}
                id="select-cost-type"
              >
                <option value="">Select Cost Type</option>
                <option value="average">Average</option>
                <option value="new">New</option>
              </Select>
              <label
                htmlFor="is-per-person-cost"
                className=" w-full flex items-center justify-between"
              >
                <span>Cost Per Person</span>
                <Switch
                  id="is-per-person-cost"
                  value={isPerPerson}
                  setValue={setIsPerPerson}
                />
              </label>
              <Select
                isRequired={true}
                value={roomOptions}
                setValue={setRoomOptions}
                id="select-room-option"
              >
                <option value="">Select Display Rooms Options</option>
                <option value="all">All Rooms</option>
                <option value="one-room">1 room</option>
              </Select>
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

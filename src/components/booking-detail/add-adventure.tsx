import { SyntheticEvent, useCallback, useState } from "react";
import Select from "../inputs/select";
import LoadingButton from "../button";
import Search from "../inputs/search";
import TextInput from "../inputs/textInput";
import DateInput from "../inputs/dateInput";
import { useAppDispatch } from "../../stores/hooks";
import { addVendorServicesToList } from "../../stores/apiData/vendor-services-lists";
import FileInput from "../inputs/fileInput";
import CheckboxInput from "../inputs/checkbox/checkbox";

export default function NewAdventure({ setValue }: { setValue: Function }) {
  const dispatch = useAppDispatch();
  const [service, setService] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<{
    name: string;
    size: number;
    preview: string;
  }>({} as any);
  const [isAllRooms, setIsAllRooms] = useState(false);
  const [date, setDate] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const addService = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(
        addVendorServicesToList({
          id: "skaks",
          vendorName: vendorName,
          serviceType: service,
          description: description,
          date: date,
          price: "N30,000",
          bookingNo: "4/10",
        })
      );
      setValue(false);
    },
    [date, vendorName, service, description, description]
  );
  return (
    <form onSubmit={addService} className="w-full flex flex-col gap-3">
      <Select
        isRequired={true}
        value={service}
        setValue={setService}
        id="service-type"
      >
        <option value="" disabled>
          Select Service
        </option>
        <option value="internet">Internet</option>
        <option value="dstv">DSTV</option>
      </Select>

      <TextInput
        inputType="text"
        isRequired={true}
        value={vendorName}
        setValue={setVendorName}
        id="vendor-name"
        placeholder="Vendor Name"
      />

      <TextInput
        inputType="text"
        isRequired={true}
        value={description}
        setValue={setDescription}
        id="description"
        placeholder="Description"
      />
      <FileInput
        value={file}
        setValue={setFile}
        label="Upload Image"
        isRequired={false}
        id="upload-image"
      />
      <Search id="available-rooms" placeholder="Search available rooms" />
      <CheckboxInput
        value={isAllRooms}
        setValue={setIsAllRooms}
        id="select-all-rooms"
        label="Select all rooms"
      />
      <DateInput
        inputType="date"
        isRequired={true}
        value={date}
        setValue={setDate}
        id="available-date"
        placeholder="Available Dates"
        label="Available Date"
      />
      <div className=" flex items-center gap-5 mt-10">
        <LoadingButton
          type="button"
          label="Cancel"
          variant={2}
          disabled={false}
          isLoading={false}
          clickHandler={() => setValue(false)}
        />

        <LoadingButton
          type="submit"
          label="Save Service"
          disabled={false}
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
}

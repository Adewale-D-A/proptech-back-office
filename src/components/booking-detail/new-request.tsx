import { SyntheticEvent, useCallback, useState } from "react";
import Select from "../inputs/select";
import LoadingButton from "../button";
import Search from "../inputs/search";
import TextAreaInput from "../inputs/textArea";

export default function NewRequest({ setValue }: { setValue: Function }) {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addRoom = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    setValue(false);
  }, []);
  return (
    <form onSubmit={addRoom} className="w-full flex flex-col gap-3">
      <Search
        id="customers-search"
        placeholder="Search customer to assign to"
      />
      <Search id="customers-apartment" placeholder="Search apartment" />
      <Select
        isRequired={true}
        value={type}
        setValue={setType}
        id="request-type"
      >
        <option value="" disabled>
          Select Request Type
        </option>
        <option value="internet">Internet</option>
        <option value="dstv">DSTV</option>
      </Select>
      <TextAreaInput
        isRequired={true}
        value={description}
        setValue={setDescription}
        id="description"
        placeholder="Description"
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
          label="Add Request"
          disabled={false}
          isLoading={isAdding}
        />
      </div>
    </form>
  );
}

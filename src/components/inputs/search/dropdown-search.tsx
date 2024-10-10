import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import SearchIcon from "../../../assets/icons/search";
import { ChangeEvent, useCallback, useState } from "react";
import customers from "../../../assets/temp-api-mockup-data/customers.json";
import apartments from "../../../assets/temp-api-mockup-data/apartments.json";

export default function DropdownSearch({
  id,
  placeholder,
  componentId,
  setValue,
}: {
  id: string;
  placeholder: string;
  componentId?: "customer" | "apartment";
  setValue?: Function;
}) {
  const [selected, setSelected] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [filteredResult, setFilteredResult] = useState(
    componentId === "apartment" ? apartments?.data : customers?.data
  );

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setKeywords(value);
      if (componentId === "apartment") {
        const result = apartments.data.filter(
          (apartment) =>
            apartment?.name?.toLowerCase()?.includes(value.toLowerCase()) ||
            apartment?.location?.toLowerCase()?.includes(value.toLowerCase())
        );
        setFilteredResult(value === "" ? apartments?.data : result);
      } else {
        const result = customers.data.filter(
          (customer) =>
            customer?.firstname?.toLowerCase()?.includes(value.toLowerCase()) ||
            customer?.lastname?.toLowerCase()?.includes(value.toLowerCase())
        );
        setFilteredResult(value === "" ? customers?.data : result);
      }
    },
    [customers, apartments, componentId]
  );

  const onSelected = useCallback((item: any) => {
    setSelected(item);
    if (setValue) {
      setValue(item);
    }
    if (componentId === "apartment") {
      setKeywords(item ? `${item?.name}` : "");
    } else {
      setKeywords(item ? `${item?.firstname} ${item?.lastname}` : "");
    }
  }, []);

  return (
    <Combobox
      value={selected}
      onChange={onSelected}
      // onClose={() => setKeywords("")}
    >
      <label
        htmlFor={id}
        className=" p-1 flex items-center gap-2 border rounded-lg text-sm"
      >
        <SearchIcon />
        <ComboboxInput
          id={id}
          aria-label="Assignee"
          displayValue={() => keywords}
          onChange={(event) => handleSearch(event)}
          placeholder={placeholder}
          className=" focus:outline-none p-2 w-full"
        />
      </label>
      <ComboboxOptions
        anchor={{ to: "bottom start" }}
        className="empty:invisible flex flex-col items-start gap-1 bg-white border-2 rounded-md shadow-md"
      >
        {filteredResult?.map((item: any) => (
          <ComboboxOption
            key={item.id}
            value={item}
            className=" border-b hover:bg-primary hover:text-white focus:bg-primary focus:text-white  p-1 px-3 hover:cursor-pointer"
          >
            {componentId === "apartment"
              ? item?.name
              : `${item.firstname} ${item?.lastname}`}{" "}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}

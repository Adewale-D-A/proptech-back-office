import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import SearchIcon from "../../../assets/icons/search";
import apartments from "../../../assets/temp-api-mockup-data/apartments.json";
import CancelIcon from "../../../assets/icons/cancel";
import useGetAllCustomersLists from "../../../services-hooks/useGetAllCustomersList";
import LoaderIcon from "../../../assets/icons/loader";

export default function Search({
  id,
  placeholder,
  componentId,
  setValue,
  multipleSelect,
}: {
  id: string;
  placeholder: string;
  componentId?: "customer" | "apartment";
  setValue?: Function;
  multipleSelect?: boolean;
}) {
  const [keywords, setKeywords] = useState("");
  const [filteredResult, setFilteredResult] = useState<any>([]);
  // customers list
  const {
    data: customers,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction,
    pagination,
  } = useGetAllCustomersLists({
    page: 1,
    search: componentId === "customer" ? keywords : "",
  });

  // populate fultered list on data search
  useEffect(() => {
    setFilteredResult(
      componentId === "customer" ? customers : apartments?.data
    );
  }, [componentId, customers]);

  const [selectedList, setSelectedList] = useState<
    { id: string; name: string }[]
  >([]);
  const [selected, setSelected] = useState(null);

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
      }
    },
    [customers, apartments, componentId]
  );

  const addToList = useCallback((item: { id: string; name: string }) => {
    if (item?.id) {
      setSelectedList((prev) => [...prev, item]);
    }
  }, []);

  const onSelected = useCallback((item: any) => {
    setSelected(item);
    if (setValue) {
      setValue(item);
    }
    if (componentId === "apartment") {
      setKeywords(item ? `${item?.name}` : "");
      addToList(item);
    } else if (componentId === "customer") {
      setKeywords(item ? `${item?.first_name} ${item?.last_name}` : "");
      addToList({
        id: item?.id,
        name: `${item?.first_name} ${item?.last_name}`,
      });
    }
  }, []);

  const removeFromList = useCallback((id: string) => {
    setSelectedList((prev) => {
      return prev.filter((item) => item?.id !== id);
    });
  }, []);

  return (
    <Combobox
      value={selected}
      onChange={onSelected}
      // onClose={() => setKeywords("")}
    >
      {selectedList?.length > 0 && multipleSelect && (
        <div className=" flex gap-2 flex-wrap">
          {selectedList.map((item) => (
            <span
              key={item?.id}
              className=" p-2 bg-primary/20 text-primary flex items-center gap-1"
            >
              {item?.name}
              <button onClick={() => removeFromList(item?.id)}>
                <CancelIcon />
              </button>
            </span>
          ))}
        </div>
      )}
      <label
        htmlFor={id}
        className=" p-1 flex items-center gap-2 border rounded-lg text-sm"
      >
        {isLoading ? (
          <LoaderIcon className=" animate-spin size-6" />
        ) : (
          <SearchIcon />
        )}
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
              : `${item?.first_name} ${item?.last_name}`}{" "}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}

import { useCallback, useEffect, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import SearchIcon from "../../../assets/icons/search";
import CancelIcon from "../../../assets/icons/cancel";
import useGetAllCustomersLists from "../../../services-hooks/useGetAllCustomersList";
import LoaderIcon from "../../../assets/icons/loader";
import useGetAllApartmentLists from "../../../services-hooks/useGetAllApartmentLists";
import useGetLocationGroupings from "../../../services-hooks/apartment/useGetLocationGroupings";

export default function Search({
  id,
  placeholder,
  componentId,
  setValue,
  multipleSelect,
  updatelist,
}: {
  id: string;
  placeholder: string;
  componentId?: "customer" | "apartment" | "location-group";
  setValue?: Function;
  multipleSelect?: boolean;
  updatelist?: (item: { id: string; name: string }[]) => void;
}) {
  // states
  const [keywords, setKeywords] = useState("");
  const [filteredResult, setFilteredResult] = useState<any>([]);

  const [selectedList, setSelectedList] = useState<
    { id: string; name: string }[]
  >([]);
  const [selected, setSelected] = useState(null);

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
  // location group
  const {
    data: location_data,
    isLoading: location_loading,
    isFailed: location_failed,
    setIsFailed: location_set_failed,
    retryFunction: location_retry,
    pagination: location_pagination,
  } = useGetLocationGroupings({
    page: 1,
    search: componentId === "location-group" ? keywords : "",
  });
  // apartment lists
  const {
    data: apartments,
    isLoading: apt_loading,
    isFailed: apt_failed,
    setIsFailed: apt_setFailed,
    retryFunction: apt_retry,
    pagination: apt_pagination,
  } = useGetAllApartmentLists({
    page: 1,
    search: componentId === "apartment" ? keywords : "",
  });

  // populate fultered list on data search
  useEffect(() => {
    setFilteredResult(
      componentId === "customer"
        ? customers
        : componentId === "apartment"
        ? apartments
        : location_data
    );
  }, [componentId, customers, apartments, location_data]);

  useEffect(() => {
    if (updatelist) {
      updatelist(selectedList);
    }
  }, [selectedList]);

  const onSelected = useCallback((item: any) => {
    setSelected(item);
    if (setValue) {
      setValue(item);
    }
    if (componentId === "apartment") {
      setKeywords(item ? `${item?.name}` : "");
      addToList(item);
    } else if (componentId === "location-group") {
      setKeywords(item ? `${item?.name}` : "");
      addToList({
        id: item?.id,
        name: `${item?.name}`,
      });
    } else if (componentId === "customer") {
      setKeywords(item ? `${item?.first_name} ${item?.last_name}` : "");
      addToList({
        id: item?.id,
        name: `${item?.first_name} ${item?.last_name}`,
      });
    }
  }, []);

  const addToList = useCallback((item: { id: string; name: string }) => {
    if (item?.id) {
      setSelectedList((prev) => [...prev, item]);
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
        className=" p-1 flex items-center gap-2 border-gray-700 border rounded-lg text-sm"
      >
        {isLoading || apt_loading ? (
          <LoaderIcon className=" animate-spin size-6" />
        ) : (
          <SearchIcon />
        )}
        <ComboboxInput
          id={id}
          aria-label="Assignee"
          displayValue={() => keywords}
          onChange={(event) => setKeywords(event.target.value)}
          placeholder={placeholder}
          className=" focus:outline-none p-2 w-full "
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
            {componentId === "apartment" || componentId === "location-group"
              ? item?.name
              : `${item?.first_name} ${item?.last_name}`}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}

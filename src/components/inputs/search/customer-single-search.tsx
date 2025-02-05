import { useCallback, useEffect, useRef, useState } from "react";
import CaretDownIcon from "../../../assets/icons/caret-down";
import LoaderIcon from "../../../assets/icons/loader";
import SearchIcon from "../../../assets/icons/search";
import useGetAllCustomersLists from "../../../services-hooks/useGetAllCustomersList";
import { customersById } from "../../../types/apiData/customers";

export default function CustomersSingleSearch({
  placeholder,
  selected,
  setSelected,
  label,
}: {
  placeholder: string;
  selected: customersById;
  setSelected: (item: customersById) => void;
  label?: string;
}) {
  const wrapperRef = useRef(null) as any;
  const [isMenuDocked, setIsMenuDocked] = useState(true);
  const [keywords, setKeywords] = useState("");

  // logic to close referenced container when clicked outsite the element
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (wrapperRef?.current && !wrapperRef?.current?.contains(event.target)) {
      setIsMenuDocked(true);
    }
  };
  // logic to close referenced container when clicked outsite the element

  const {
    data: users_data,
    isLoading: users_loading,
    isFailed: users_failed,
    setIsFailed: users_setFailed,
    retryFunction: users_retry,
    pagination: users_pagination,
  } = useGetAllCustomersLists({
    page: 1,
    search: keywords,
  });

  const handleSelection = useCallback((selected: customersById) => {
    setSelected(selected);
    setIsMenuDocked(true);
  }, []);

  const toggleMenuDock = useCallback(() => {
    setIsMenuDocked((prev) => !prev);
  }, []);

  return (
    <div className=" w-full flex flex-col gap-2">
      {label && (
        <label
          htmlFor={"customer-search-feature"}
          className="  text-[#667085] font-sm font-medium"
        >
          {label}
        </label>
      )}
      <div className=" relative" ref={wrapperRef}>
        <button
          onClick={() => toggleMenuDock()}
          className="w-full p-3 rounded-lg border  bg-gray-200/15 flex justify-between"
        >
          {selected?.first_name ? (
            <span className="">
              {selected?.first_name} {selected?.last_name}
            </span>
          ) : (
            <div className=" flex items-center text-gray-400 gap-3">
              {users_loading ? (
                <LoaderIcon className=" animate-spin size-6" />
              ) : (
                <SearchIcon />
              )}
              <span className=" ">{placeholder}</span>
            </div>
          )}
          <CaretDownIcon
            className={`size-6 ${
              isMenuDocked ? "rotate-0" : "rotate-180"
            } transition-all`}
          />
        </button>
        {!isMenuDocked && (
          <div className="w-full p-2 border z-10 absolute top-14 left-0 bg-gray-50">
            <input
              id="customer-search-feature"
              placeholder={placeholder}
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className=" border rounded-md p-3 w-full bg-gray-100"
            />
            <div className=" flex flex-col gap-1 max-h-64 overflow-auto">
              {users_data.map((user) => (
                <button
                  key={user?.id}
                  onClick={() => handleSelection(user)}
                  className=" p-2 hover:border-primary hover:border transition-all text-left"
                >
                  {user?.first_name} {user?.last_name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

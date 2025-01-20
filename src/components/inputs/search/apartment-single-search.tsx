import { useCallback, useEffect, useRef, useState } from "react";
import CaretDownIcon from "../../../assets/icons/caret-down";
import useGetAllApartmentLists from "../../../services-hooks/useGetAllApartmentLists";
import { apartmentById } from "../../../types/apiData/apartment";
import LoaderIcon from "../../../assets/icons/loader";
import SearchIcon from "../../../assets/icons/search";

export default function ApartmentSingleSearch({
  placeholder,
  selected,
  setSelected,
  readOnly,
}: {
  placeholder: string;
  selected: apartmentById;
  readOnly?: boolean;
  setSelected: (item: apartmentById) => void;
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
    data: apartments,
    isLoading: apt_loading,
    isFailed: apt_failed,
    setIsFailed: apt_setFailed,
    retryFunction: apt_retry,
    pagination: apt_pagination,
  } = useGetAllApartmentLists({
    page: 1,
    search: keywords,
  });

  const handleSelection = useCallback((selected: apartmentById) => {
    setSelected(selected);
    setIsMenuDocked(true);
  }, []);

  const toggleMenuDock = useCallback(() => {
    setIsMenuDocked((prev) => !prev);
  }, []);

  return (
    <div className=" relative" ref={wrapperRef}>
      <div
        onClick={() => toggleMenuDock()}
        className="w-full p-3 rounded-lg border  bg-gray-200/15 flex justify-between"
      >
        {selected?.name ? (
          <span className="">{selected?.name}</span>
        ) : (
          <div className=" flex items-center text-gray-400 gap-3">
            {apt_loading ? (
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
      </div>
      {!isMenuDocked && (
        <div className="w-full p-2 border z-10 absolute top-14 left-0 bg-gray-50">
          <input
            id="search-feature"
            placeholder={placeholder}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className=" border rounded-md p-3 w-full bg-gray-100"
          />
          <div className=" flex flex-col gap-1 max-h-64 overflow-auto">
            {apartments.map((apartment) => (
              <button
                key={apartment?.id}
                onClick={() => handleSelection(apartment)}
                className=" p-2 hover:border-primary hover:border transition-all text-left"
              >
                {apartment?.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import CaretDownIcon from "../../../assets/icons/caret-down";
import useGetAllApartmentLists from "../../../services-hooks/useGetAllApartmentLists";
import { apartmentById } from "../../../types/apiData/apartment";
import LoaderIcon from "../../../assets/icons/loader";
import SearchIcon from "../../../assets/icons/search";
import useGetApartmentById from "../../../services-hooks/useGetApartmentById";
import { useSearchParams } from "react-router-dom";

export default function ApartmentSingleSearch({
  placeholder,
  selected,
  setSelected,
  defaultId,
  readOnly,
  default_apt_query_id = "apt_id",
  label,
}: {
  placeholder: string;
  selected: apartmentById;
  readOnly?: boolean;
  setSelected: (item: apartmentById) => void;
  default_apt_query_id?: "apt_id" | "apt_id_2";
  label?: string;
  defaultId?: string;
}) {
  const wrapperRef = useRef(null) as any;
  const [isMenuDocked, setIsMenuDocked] = useState(true);
  const [keywords, setKeywords] = useState("");
  const [searchParams] = useSearchParams();

  const { data: apartment_info } = useGetApartmentById(
    searchParams?.get(default_apt_query_id) || defaultId || undefined
  );

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
    limit: 100,
  });

  const handleSelection = useCallback((selected: apartmentById) => {
    setSelected(selected);
    setIsMenuDocked(true);
  }, []);

  const toggleMenuDock = useCallback(() => {
    setIsMenuDocked((prev) => !prev);
  }, []);

  // auto select apartment based on query params
  useEffect(() => {
    setSelected(apartment_info);
  }, [apartment_info]);

  return (
    <div className=" w-full flex flex-col gap-2">
      {label && (
        <label
          htmlFor={"customer-search-feature"}
          className="  text-[#344054] font-sm font-medium"
        >
          {label}
        </label>
      )}
      <div className=" relative" ref={wrapperRef}>
        <button
          type="button"
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
        </button>
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
    </div>
  );
}

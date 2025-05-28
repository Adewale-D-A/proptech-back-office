import { useCallback, useEffect, useRef, useState } from "react";
import CaretDownIcon from "../../../assets/icons/caret-down";
import LoaderIcon from "../../../assets/icons/loader";
import SearchIcon from "../../../assets/icons/search";
import useGetBanks from "../../../services-hooks/useGetBanks";
import { Bank } from "../../../types/apiData/banks";

export default function BankSearch({
  placeholder,
  selected,
  setSelected,
  label,
}: {
  placeholder: string;
  selected: Bank;
  setSelected: (item: Bank) => void;
  label?: string;
}) {
  const { data, isLoading } = useGetBanks();
  const [banks, setBanks] = useState<Bank[]>([]);
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

  useEffect(() => {
    if (keywords) {
      const filtered = data.filter((item) =>
        item?.name?.toLowerCase().includes(keywords?.toLowerCase())
      );
      setBanks(filtered);
    } else {
      setBanks(data);
    }
  }, [data, keywords]);

  const handleSelection = useCallback((selected: Bank) => {
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
          className="  text-[#344054] font-sm text-sm font-medium"
        >
          {label}
        </label>
      )}
      <div className=" relative" ref={wrapperRef}>
        <button
          // title="single-customer-search"
          // id="single-customer-search"
          type="button"
          onClick={() => toggleMenuDock()}
          className="w-full p-3 rounded-lg border  bg-gray-200/15 flex justify-between"
        >
          {selected?.name ? (
            <span className="">{selected?.name}</span>
          ) : (
            <div className=" flex items-center text-gray-400 gap-3">
              {isLoading ? (
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
              {banks.map((bank) => (
                <button
                  key={bank?.id}
                  onClick={() => handleSelection(bank)}
                  className=" p-2 hover:border-primary hover:border transition-all text-left"
                >
                  {bank?.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

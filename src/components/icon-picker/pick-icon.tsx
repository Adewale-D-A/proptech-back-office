import { useRef, useEffect, useState, useCallback } from "react";
import { iconPack, iconList } from "./icon-library";
import CaretDownIcon from "../../assets/icons/caret-down";
import SearchIcon from "../../assets/icons/search";

export default function PickIcon({
  handleSelection,
  label,
  placeholder,
  defaultIconName,
}: {
  handleSelection: (icon: iconPack) => void;
  label?: string;
  placeholder?: string;
  defaultIconName?: string;
}) {
  const wrapperRef = useRef(null) as any;
  const [isMenuDocked, setIsMenuDocked] = useState(true);

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

  const toggleMenuDock = useCallback(() => {
    setIsMenuDocked((prev) => !prev);
  }, []);
  // logic to close referenced container when clicked outsite the element

  const [availableIconList, setAvailableIconList] =
    useState<iconPack[]>(iconList);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<iconPack | null>(null);

  const selectIcon = useCallback((item: iconPack) => {
    handleSelection(item);
    setSelected(item);
    setIsMenuDocked(true);
  }, []);

  //   Populate with default
  useEffect(() => {
    const found =
      iconList?.find((item) => item?.value === defaultIconName) || null;
    setSelected(found);
  }, [iconList, defaultIconName]);

  // filter apartment calendar by apartment name
  useEffect(() => {
    if (search) {
      const filteredDataset = iconList?.filter((item) =>
        item?.label.toLowerCase().includes(search.toLowerCase())
      );
      setAvailableIconList(filteredDataset);
    } else {
      setAvailableIconList(iconList);
    }
  }, [search]);

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
          // title="single-customer-search"
          // id="single-customer-search"
          type="button"
          onClick={() => toggleMenuDock()}
          className="w-full p-3 rounded-lg border  bg-gray-200/15 flex justify-between"
        >
          {selected?.value ? (
            <span className="">
              {<selected.icon className=" text-lg text-primary" />}
            </span>
          ) : (
            <div className=" flex items-center text-gray-400 gap-3">
              <SearchIcon />
              <span className=" ">{placeholder || "Icon library"}</span>
            </div>
          )}
          <CaretDownIcon
            className={`size-6 ${
              isMenuDocked ? "rotate-0" : "rotate-180"
            } transition-all`}
          />
        </button>
        {!isMenuDocked && (
          <div className="w-full p-2 border z-10 absolute h-40  overflow-y-auto top-14 left-0 bg-gray-50 flex flex-col gap-2">
            <input
              id="search-icons"
              placeholder={placeholder || "Search icon"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" border rounded-md p-3 w-full bg-gray-100"
            />
            <div className=" flex justify-start gap-3 flex-wrap">
              {availableIconList.map((data) => (
                <button
                  type="button"
                  title={data?.label}
                  key={data?.value}
                  onClick={() => selectIcon(data)}
                  className={`${
                    selected?.value === data?.value
                      ? " bg-primary text-white"
                      : ""
                  } p-2  hover:scale-125 transition-all rounded-md hover:bg-primary hover:text-white`}
                >
                  <data.icon />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

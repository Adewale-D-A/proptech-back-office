import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import CaretDownIcon from "../../../assets/icons/caret-down";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

// interface Props {
//   children: React.ReactNode;
//   value: string;
//   setValue: Function;
//   label?: string;
//   isRequired?: boolean;
//   id: string;
//   readOnly?: boolean;
// }
export default function MultipleSelect({
  value,
  setValue,
  options,
  label,
}: {
  value: string[];
  setValue: Function;
  options: { id: string; label: string }[];
  label: string;
}) {
  const [displayedPreference, setDisplayedPreference] = useState<string[]>([]);

  const filterArray = useCallback(() => {
    const inclusive = options.filter((item) => {
      const foundItem = value.find((result) => result === item?.id);
      if (foundItem) {
        return true;
      } else {
        return false;
      }
    });
    setDisplayedPreference(() => inclusive.map((item) => item?.label));
  }, [options, value]);

  useEffect(() => {
    filterArray();
  }, [value]);

  //handle selection
  const handleShopPreference = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      const value = e.target.value;
      const name = e.target.name;
      if (checked) {
        setValue((prev: string[]) => [...prev, value]);
        setDisplayedPreference((prev: string[]) => [...prev, name]);
      } else {
        setValue((prev: string[]) => {
          const currentIndex = prev.findIndex((item) => value === item);
          const deepCopy = [...prev];
          deepCopy.splice(currentIndex, 1);
          return deepCopy;
        });
        setDisplayedPreference((prev: string[]) => {
          const currentIndex = prev.findIndex((item) => name === item);
          const deepCopy = [...prev];
          deepCopy.splice(currentIndex, 1);
          return deepCopy;
        });
      }
    },
    []
  );
  return (
    <div className=" w-full relative">
      <Menu>
        <MenuButton className="w-full p-3 flex items-center justify-between gap-4 text-left rounded-lg border  bg-gray-100/15 sm:text-md focus:ring-[#17594F] focus:border-[#17594F]">
          {displayedPreference.length > 0 ? (
            <div className=" flex items-start gap-3 flex-wrap">
              {displayedPreference.map((item) => (
                <span key={item}>{item},</span>
              ))}
            </div>
          ) : (
            <span>{label}</span>
          )}
          <CaretDownIcon className=" min-w-4 min-h-4 size-4" />
        </MenuButton>
        <MenuItems
          anchor={{ to: "bottom start" }}
          className="flex items-start gap-3 bg-white border-4 p-3 rounded-md shadow-md"
        >
          <div className=" flex items-center gap-4 p-3 flex-wrap max-w-80">
            {options.map((item) => (
              <label
                key={item?.id}
                htmlFor={item?.id}
                className=" flex items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={value.includes(item?.id)}
                  id={item?.id}
                  name={item?.label}
                  value={item?.id}
                  onChange={handleShopPreference}
                />
                <span className=" text-gray-600">{item?.label}</span>
              </label>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}

import React from "react";
import ChevronDownIcon from "../../../assets/icons/chevron-down";

interface Props {
  value: string;
  setValue: Function;
  label?: string;
  isRequired?: boolean;
  id: string;
  readOnly?: boolean;
  placeholder?: string;
}

const WeekdaysSelect: React.FC<Props> = ({
  value,
  setValue,
  label,
  isRequired = false,
  readOnly = false,
  id,
  placeholder,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className=" font-medium">
          {label}
        </label>
      )}
      <div className="w-full relative p-3 px-6 border rounded-md flex items-center gap-3">
        <select
          id={id}
          title={label}
          aria-readonly={readOnly}
          value={value}
          required={isRequired}
          onChange={(e) => setValue(e.target.value)}
          className="w-full appearance-none  sm:text-md bg-transparent"
        >
          <option value="" disabled>
            {placeholder || "Select"}
          </option>
          {[
            {
              id: 1,
              label: "Sunday",
              value: "sunday",
            },
            {
              id: 2,
              label: "Monday",
              value: "monday",
            },
            {
              id: 3,
              label: "Tuesday",
              value: "tuesday",
            },
            {
              id: 4,
              label: "Wednesday",
              value: "wednesday",
            },
            {
              id: 5,
              label: "Thursday",
              value: "thurday",
            },
            {
              id: 6,
              label: "Friday",
              value: "friday",
            },
            {
              id: 7,
              label: "Saturday",
              value: "saturday",
            },
          ].map((item) => (
            <option key={item?.id} value={item?.value}>
              {item?.label}
            </option>
          ))}
        </select>
        <label htmlFor={id} className="">
          <ChevronDownIcon className=" size-4" />
        </label>
      </div>
    </div>
  );
};

export default WeekdaysSelect;

import React from "react";

interface Props {
  value: string;
  setValue: Function;
  label?: string;
  isRequired?: boolean;
  id: string;
  readOnly?: boolean;
  placeholder?: string;
}

const ApartmentSingleSelect: React.FC<Props> = ({
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
      )}{" "}
      <label
        htmlFor={id}
        className="w-full relative p-3 px-6 border rounded-md flex items-center gap-3"
      >
        <select
          id={id}
          title={label}
          aria-readonly={readOnly}
          value={value}
          required={isRequired}
          onChange={(e) => setValue(e.target.value)}
          className="w-full sm:text-md bg-transparent"
        >
          {placeholder && <option value={""}>{placeholder}</option>}
          <option value={"all"}>All</option>
          {[
            {
              id: 1,
              label: "Sunshine - 2 Bedroom",
              value: "sunshine-2-bed",
            },
            {
              id: 2,
              label: "Moonlight - 2 Bedroom",
              value: "moonlight-2-bed",
            },
          ].map((item) => (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default ApartmentSingleSelect;

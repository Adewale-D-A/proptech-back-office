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
      )}
      <select
        id={id}
        title={label}
        aria-readonly={readOnly}
        value={value}
        required={isRequired}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 rounded-lg border  bg-gray-200/15 sm:text-md focus:ring-[#17594F] focus:border-[#17594F]"
      >
        {placeholder && <option value={""}>{placeholder}</option>}
        {[
          {
            id: 1,
            label: "Sunshine - 2 Bedroom",
            value: "sunshine-2-bed",
          },
        ].map((item) => (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ApartmentSingleSelect;

import React from "react";

interface Props {
  children: React.ReactNode;
  value: string;
  setValue: Function;
  label?: string;
  isRequired?: boolean;
  id: string;
}

const Select: React.FC<Props> = ({
  children,
  value,
  setValue,
  label,
  isRequired = false,
  id,
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
        value={value}
        required={isRequired}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-4 mt-3 rounded-[4px] border border-gray-300 bg-gray-200/15 sm:text-md focus:ring-[#17594F] focus:border-[#17594F]"
      >
        {children}
      </select>
    </div>
  );
};

export default Select;

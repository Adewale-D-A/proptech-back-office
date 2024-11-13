import React from "react";

interface Props {
  children: React.ReactNode;
  value: string;
  setValue: Function;
  label?: string;
  isRequired?: boolean;
  id: string;
  readOnly?: boolean;
}

const Select: React.FC<Props> = ({
  children,
  value,
  setValue,
  label,
  isRequired = false,
  readOnly = false,
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
        aria-readonly={readOnly}
        disabled={readOnly}
        value={value}
        required={isRequired}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 disabled:border-gray-300 disabled:text-gray-300 rounded-lg border  bg-gray-100/15 sm:text-md focus:ring-[#17594F] focus:border-[#17594F]"
      >
        {children}
      </select>
    </div>
  );
};

export default Select;

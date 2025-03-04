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
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-[#344054] text-sm font-medium">
          {label}
        </label>
      )}
      <label
        htmlFor={id}
        className="w-full relative  rounded-md border flex items-center gap-3"
      >
        <select
          id={id}
          title={label}
          aria-readonly={readOnly}
          disabled={readOnly}
          value={value}
          required={isRequired}
          onChange={(e) => setValue(e.target.value)}
          className="w-full sm:text-md bg-transparent p-3 px-6 disabled:border-gray-300 disabled:text-gray-300"
        >
          {children}
        </select>
      </label>
    </div>
  );
};

export default Select;

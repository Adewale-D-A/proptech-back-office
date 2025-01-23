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
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className=" font-medium">
          {label}
        </label>
      )}
      <label
        htmlFor={id}
        className="w-full relative p-3 px-6 rounded-md border flex items-center gap-3"
      >
        <select
          id={id}
          title={label}
          aria-readonly={readOnly}
          disabled={readOnly}
          value={value}
          required={isRequired}
          onChange={(e) => setValue(e.target.value)}
          className="w-full sm:text-md bg-transparent"
        >
          {children}
        </select>
      </label>
    </div>
  );
};

export default Select;

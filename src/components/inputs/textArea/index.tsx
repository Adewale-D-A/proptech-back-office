"use client";

import React, { ChangeEvent } from "react";

interface Props {
  value: string;
  setValue: Function;
  label?: string;
  isRequired: boolean;
  id: string;
  placeholder: string;
}

const TextAreaInput: React.FC<Props> = ({
  value,
  setValue,
  label,
  isRequired,
  id,
  placeholder,
}) => {
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className=" font-medium">
          {label}
        </label>
      )}
      <textarea
        id={id}
        placeholder={placeholder}
        required={isRequired}
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInput(e)}
        className="w-full p-3 focus:outline-none rounded-lg border  bg-gray-100/15 focus:ring-[#17594F] focus:border-[#17594F]"
        rows={4}
      />
    </div>
  );
};

export default TextAreaInput;

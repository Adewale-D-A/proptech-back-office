"use client";

import React from "react";
import countries from "../../../assets/Countries.json";

interface Props {
  coutryCode: string;
  setCountryCode: Function;
  number: string;
  setNumber: Function;
  label: string;
  isRequired?: boolean;
  id: string;
  readOnly?: boolean;
}

const PhoneInput: React.FC<Props> = ({
  coutryCode,
  setCountryCode,
  number,
  setNumber,
  label,
  isRequired = false,
  id,
  readOnly = false,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className=" text-sm font-medium">
        {label}
      </label>
      <div className="w-full flex pl-4 border rounded-lg bg-gray-200/15">
        <select
          id="country-code"
          title={label}
          value={coutryCode}
          disabled={readOnly}
          onChange={(e) => setCountryCode(e.target.value)}
          className=" max-w-28 bg-transparent"
        >
          {countries.map((country) => (
            <option
              key={country.code}
              value={`${country?.dial_code}+${country?.name}`}
            >
              {`${country?.flag} ${country?.dial_code} - ${country?.name}`}
            </option>
          ))}
        </select>
        <input
          type="number"
          id={id}
          value={number}
          readOnly={readOnly}
          required={isRequired}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="000-000-0000"
          className="w-full p-3 bg-transparent rounded-r-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default PhoneInput;

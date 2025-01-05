import React from "react";
import countries from "../../../assets/Countries.json";

interface Props {
  country: string;
  setCountry: Function;
  amount: string;
  setAmount: Function;
  label?: string;
  isRequired?: boolean;
  id: string;
  readOnly?: boolean;
}

const ExchangeRateInput: React.FC<Props> = ({
  country,
  setCountry,
  amount,
  setAmount,
  label,
  isRequired = false,
  id,
  readOnly = false,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className=" text-sm font-medium">
          {label}
        </label>
      )}
      <div className="w-full flex pl-4 border rounded-lg bg-gray-200/15">
        <select
          id="country-code"
          title={label}
          value={country}
          disabled={readOnly}
          onChange={(e) => setCountry(e.target.value)}
          className=" max-w-28 bg-transparent"
        >
          {countries.map((country) => (
            <option
              key={country.code}
              value={`${country?.dial_code}+${country?.name}`}
            >
              {`${country?.flag} - ${country?.name}`}
            </option>
          ))}
        </select>
        <input
          type="number"
          id={id}
          value={amount}
          readOnly={readOnly}
          required={isRequired}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-3 bg-transparent rounded-r-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default ExchangeRateInput;

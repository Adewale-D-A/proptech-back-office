import { ChangeEvent } from "react";
import CalendarIcon from "../../../assets/icons/calendar";
import TimeIcon from "../../../assets/icons/time";

interface Props {
  value: string;
  setValue: Function;
  inputType: string;
  label?: string;
  isRequired?: boolean;
  id: string;
  placeholder: string;
  readonly?: boolean;
}

export default function TimeInput({
  value,
  setValue,
  inputType,
  label,
  isRequired = false,
  id,
  readonly,
  placeholder,
}: Props) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="w-full group border rounded-md bg-gray-200/15">
      <input
        id={id}
        readOnly={readonly}
        disabled={readonly}
        placeholder={placeholder}
        required={isRequired}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(e)}
        type={inputType}
        className={`w-full disabled:border-gray-300 disabled:text-gray-300 date-input group-hover:block focus:block ${
          value ? "block" : "hidden"
        }  p-3 focus:ring-[#17594F] focus:border-[#17594F]`}
      />
      {!value && (
        <label
          htmlFor={id}
          className=" group-hover:hidden  p-3 label-input flex w-full justify-between items-center "
        >
          <span>{label}</span>
          <TimeIcon className={`h-6 w-6`} />
        </label>
      )}
    </div>
  );
}

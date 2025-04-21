import { ChangeEvent } from "react";
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
  staticLabel?: string;
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
  staticLabel,
}: Props) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className=" flex flex-col gap-1">
      {" "}
      <div>
        {staticLabel && (
          <label htmlFor={id} className=" text-[#344054] text-sm font-medium">
            {staticLabel}
          </label>
        )}
      </div>
      <div className="w-full relative group border rounded-lg bg-gray-200/15">
        <input
          id={id}
          readOnly={readonly}
          disabled={readonly}
          placeholder={placeholder}
          required={isRequired}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(e)}
          type={inputType}
          className={`w-full date-input bg-transparent disabled:border-gray-300 disabled:text-gray-300 p-3 focus:ring-[#17594F] focus:border-[#17594F]`}
        />
        {!value && (
          <label
            htmlFor={id}
            className="w-full h-full bg-white group-hover:hidden absolute top-0 left-0 px-3 label-input flex items-center justify-between"
          >
            <span>{label}</span>
            <TimeIcon />
          </label>
        )}
      </div>
    </div>
  );
}

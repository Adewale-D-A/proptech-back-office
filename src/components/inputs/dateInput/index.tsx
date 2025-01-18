import { ChangeEvent } from "react";

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

export default function DateInput({
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
    <div className="w-full relative group border rounded-md bg-gray-200/15">
      <input
        id={id}
        readOnly={readonly}
        disabled={readonly}
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(e)}
        type={inputType}
        className={`w-full date-input disabled:border-gray-300 disabled:text-gray-300 p-3 focus:ring-[#17594F] focus:border-[#17594F]`}
      />
      {!value && (
        <label
          htmlFor={id}
          className="w-fit h-full bg-white group-hover:hidden absolute top-0 left-0 px-3 label-input flex items-center"
        >
          <span>{label}</span>
        </label>
      )}
    </div>
  );
}

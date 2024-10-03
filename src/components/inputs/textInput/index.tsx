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

function TextInput({
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
    <div className="w-full">
      {label && (
        <label htmlFor={id} className=" font-medium">
          {label}
        </label>
      )}
      <input
        id={id}
        readOnly={readonly}
        placeholder={placeholder}
        required={isRequired}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(e)}
        type={inputType}
        className="w-full p-3 focus:outline-none rounded-lg border  bg-gray-100/15 focus:ring-[#17594F] focus:border-[#17594F]"
      />
    </div>
  );
}

export default TextInput;

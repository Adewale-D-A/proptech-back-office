import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react";
import TextInput from "../inputs/textInput";
import LoadingButton from "../button";
import CheckboxInput from "../inputs/checkbox/checkbox";

type valueProps = {
  id: string;
  name: string;
  amount: string;
  isCompound: boolean;
};
export default function AddTax({
  value,
  setValue,
  setOpen,
}: {
  value: valueProps[];
  setValue: Function;
  setOpen: Function;
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isCompound, setIsCompound] = useState(false);

  const addNewTax = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      setValue((prev: valueProps[]) => [
        ...prev,
        {
          id: Math?.random()?.toString(36)?.substr(2, 9),
          name: name,
          amount: `${amount}%`,
          isCompound: isCompound,
        },
      ]);
      setOpen(false);
    },
    [name, amount, isCompound]
  );

  return (
    <form className="w-full flex flex-col gap-5" onSubmit={addNewTax}>
      <div className=" w-full grid grid-cols-1 gap-5">
        <TextInput
          inputType="text"
          isRequired={true}
          value={name}
          setValue={setName}
          id="tax-name"
          placeholder="Enter Tax Name"
        />
        <div className="w-full flex items-stretch gap-3 p-1 px-3 rounded-lg border  bg-gray-100/15 focus:ring-[#17594F] focus:border-[#17594F]">
          <input
            placeholder="Enter Tax Amount"
            required={true}
            value={amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.value)
            }
            type={"text"}
            className=" w-full"
          />
          <div className="p-2 px-6 bg-gray-200 rounded-md flex items-center text-gray-400">
            <span>%</span>
          </div>
        </div>
        <CheckboxInput
          value={isCompound}
          setValue={setIsCompound}
          id="tax-compound"
          label="Select as Compound Tax"
        />
      </div>
      <div className=" flex items-center gap-5 mt-10">
        <LoadingButton
          type="button"
          label="Cancel"
          variant={2}
          disabled={false}
          isLoading={false}
          clickHandler={() => setOpen(false)}
        />
        <LoadingButton
          type="submit"
          label={"Save Tax"}
          disabled={false}
          isLoading={false}
        />
      </div>
    </form>
  );
}

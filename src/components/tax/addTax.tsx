import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  // useEffect,
  useState,
} from "react";
import TextInput from "../inputs/textInput";
import LoadingButton from "../button";
import CheckboxInput from "../inputs/checkbox/checkbox";
// import useGetTaxRate from "../../services-hooks/useGetTaxRate";

export default function AddTax({
  id,
  setOpen,
  submitHandler,
  isSubmitting,
  componentId,
}: {
  id?: string;
  setOpen: Function;
  submitHandler: Function;
  isSubmitting: boolean;
  componentId: "tax-rate" | "service-tax";
}) {
  // const { data } = useGetTaxRate({ id: id || undefined });
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [cap, setCap] = useState("");
  const [isCompound, setIsCompound] = useState(false);

  // useEffect(() => {
  //   if (data && id && componentId === "tax-rate") {
  //     const { name, rate } = data;
  //     setName(name || "");
  //     setAmount(String(rate) || "");
  //   }
  // }, [data, id, componentId]);

  const addNewTax = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      await submitHandler({
        id: Math?.random()?.toString(36)?.substr(2, 9),
        name: name,
        amount: amount,
        isCompound: isCompound,
        cap: cap,
      });
      setOpen(false);
    },
    [name, amount, isCompound, cap]
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
          placeholder={
            componentId === "tax-rate"
              ? "Enter Tax Rate Name"
              : "Enter Tax Name"
          }
        />
        <div className="w-full flex items-stretch gap-3 p-1 px-3 rounded-lg border  bg-gray-100/15 focus:ring-[#17594F] focus:border-[#17594F]">
          <input
            placeholder={
              componentId === "tax-rate" ? "Enter Tax Rate" : "Enter Tax Amount"
            }
            required={true}
            value={amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.value)
            }
            type={"text"}
            className=" w-full outline-none"
          />
          <div className="p-2 px-6 bg-gray-200 rounded-md flex items-center text-gray-400">
            <span>%</span>
          </div>
        </div>
        {componentId === "tax-rate" && (
          <div className="w-full flex items-stretch gap-3 p-1 px-3 rounded-lg border  bg-gray-100/15 focus:ring-[#17594F] focus:border-[#17594F]">
            <input
              placeholder={"Enter Tax Cap"}
              required={true}
              value={cap}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCap(e.target.value)
              }
              type={"text"}
              className=" w-full outline-none"
            />
            <div className="p-2 px-6 bg-gray-200 rounded-md flex items-center text-gray-400">
              <span>#</span>
            </div>
          </div>
        )}
        {componentId === "service-tax" && (
          <CheckboxInput
            value={isCompound}
            setValue={setIsCompound}
            id="tax-compound"
            label="Select as Compound Tax"
          />
        )}
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
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
}

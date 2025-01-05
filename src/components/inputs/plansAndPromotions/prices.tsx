import { SyntheticEvent, useCallback, useState } from "react";
import TextInput from "../textInput";
import LoadingButton from "../../button";
import Select from "../select";
import { useAppDispatch } from "../../../stores/hooks";
import { addPriceTypeToList } from "../../../stores/apiData/price-type-lists";

export default function AddNewPrices({ setOpen }: { setOpen: Function }) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [attributes, setAttributes] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [minNights, setMinNights] = useState("");
  const [minHours, setMinHours] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitPricing = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const payload = {
        name,
        attributes,
        rate: taxRate,
        restrictions: "none",
        isBreakfastIncluded: false,
        isRefundable: false,
      };
      try {
        dispatch(addPriceTypeToList(payload));
        setOpen(false);
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    },
    [name, attributes, taxRate, minNights, minHours]
  );

  return (
    <form className="w-full flex flex-col gap-5" onSubmit={submitPricing}>
      <div className=" w-full grid grid-cols-1 gap-5">
        <h5 className=" font-semibold">Add Details</h5>
        <TextInput
          inputType="text"
          isRequired={true}
          value={name}
          setValue={setName}
          id="price-name"
          placeholder={"Enter Price Name"}
        />
        <TextInput
          inputType="text"
          isRequired={true}
          value={attributes}
          setValue={setAttributes}
          id="price-attributes"
          placeholder={"Enter Price Attributes"}
        />

        <Select
          isRequired={true}
          value={taxRate}
          setValue={setTaxRate}
          id="tax-rates"
        >
          <option value="" disabled>
            Select Tax Rate
          </option>
          <option value="10%">10%</option>
        </Select>
      </div>{" "}
      <div className=" w-full grid grid-cols-1 gap-5">
        <h5 className=" font-semibold">Add Settings</h5>
        <TextInput
          inputType="text"
          isRequired={true}
          value={minNights}
          setValue={setMinNights}
          id="price-name"
          placeholder={"Enter Price Name"}
        />
        <TextInput
          inputType="text"
          isRequired={true}
          value={minHours}
          setValue={setMinHours}
          id="price-attributes"
          placeholder={"Enter Price Attributes"}
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
          label={"Save Price"}
          disabled={false}
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
}

import { SyntheticEvent, useCallback, useState } from "react";
import TextInput from "../textInput";
import LoadingButton from "../../button";
import Select from "../select";
import { useAppDispatch } from "../../../stores/hooks";
import { addPriceTypeToList } from "../../../stores/apiData/price-type-lists";
import { addCouponsToList } from "../../../stores/apiData/coupons-lists";
import Search from "../search";

export default function AddNewCoupon({ setOpen }: { setOpen: Function }) {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState("");
  const [type, setType] = useState("");
  const [totalOrPercent, setTotalOrPercent] = useState("");
  const [value, setValue] = useState("");
  const [customer, setCustomer] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitPricing = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      //   const payload = {
      //     code,
      //     type,
      //     totalOrPercent,
      //     value,
      //     customer
      //   };
      try {
        dispatch(
          addCouponsToList({
            id: "random",
            name: "new-coupon",
            type: type,
            validityDates: "today",
            rooms: "2 rooms",
            bookingTotal: "5",
            numberOfUsers: "2",
          })
        );
        setOpen(false);
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    },
    [code, type, totalOrPercent, value, customer]
  );

  return (
    <form className="w-full flex flex-col gap-5" onSubmit={submitPricing}>
      <div className=" w-full grid grid-cols-1 gap-5">
        <h5 className=" font-semibold">Add Details</h5>
        <TextInput
          inputType="text"
          isRequired={true}
          value={code}
          setValue={setCode}
          id="coupon-code"
          placeholder={"Enter Coupon Code"}
        />
        <Select
          isRequired={true}
          value={type}
          setValue={setType}
          id="coupon-type"
        >
          <option value="" disabled>
            Select Coupon Type
          </option>
          <option value="service">Service Coupon</option>
          <option value="discount">Discount Coupon</option>
        </Select>
        <Select
          isRequired={true}
          value={totalOrPercent}
          setValue={setTotalOrPercent}
          id="total-or-percent"
        >
          <option value="" disabled>
            Percent or Total
          </option>
          <option value="percent">Percent</option>
          <option value="total">Total</option>
        </Select>
        <TextInput
          inputType="text"
          isRequired={true}
          value={value}
          setValue={setValue}
          id="coupon-value"
          placeholder={"Enter Value of Coupon"}
        />
      </div>{" "}
      <div className=" w-full grid grid-cols-1 gap-5">
        <h5 className=" font-semibold">Customer</h5>
        <Search
          placeholder="Search Customrs to assign to"
          id="searcg-customer"
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
          label={"Save Coupon"}
          disabled={false}
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
}

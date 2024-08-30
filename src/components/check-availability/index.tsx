import { SyntheticEvent, useCallback, useState } from "react";
import LoadingButton from "../button";
import DateInput from "../inputs/dateInput";

export default function CheckAvailability() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const [calculating, setCalculating] = useState(false);

  const checkAvailability = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();
    setCalculating(true);
    try {
    } catch (error) {
    } finally {
      setCalculating(false);
    }
  }, []);

  return (
    <div className="w-full">
      <form className=" flex flex-col gap-5" onSubmit={checkAvailability}>
        <div className=" w-full grid grid-cols-1 gap-5">
          <DateInput
            inputType="date"
            isRequired={true}
            value={checkInDate}
            setValue={setCheckInDate}
            id="check-in-date"
            placeholder="Check-in Date"
            label="Check-in Date"
          />
          <DateInput
            inputType="date"
            isRequired={true}
            value={checkOutDate}
            setValue={setCheckOutDate}
            id="check-out-date"
            placeholder="Check-out Date"
            label="Check-out Date"
          />
        </div>
        <LoadingButton
          type="submit"
          label="Calculate"
          disabled={false}
          isLoading={calculating}
        />
      </form>
    </div>
  );
}

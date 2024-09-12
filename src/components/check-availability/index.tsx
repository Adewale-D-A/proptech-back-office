import { SyntheticEvent, useCallback, useState } from "react";
import LoadingButton from "../button";
import DateInput from "../inputs/dateInput";
import Select from "../inputs/select";
import AddressAutocompleteInput from "../inputs/addressAutocompleteInout";

export default function CheckAvailability({
  variant = 1,
}: {
  variant?: number;
}) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [noRooms, setNoRooms] = useState("");
  const [location, setLocation] = useState("");

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
          {!(variant === 1) && (
            <div className="w-full grid grid-cols-1 gap-5">
              <Select
                isRequired={true}
                value={noRooms}
                setValue={setNoRooms}
                id="no-of-rooms"
              >
                <option value="" disabled>
                  Select number of bedroom
                </option>
                {Array.from({ length: 8 }, (_, index) => (
                  <option key={index} value={`${index + 1}`}>
                    {index + 1}
                  </option>
                ))}
              </Select>
              <AddressAutocompleteInput
                value={location}
                setValue={setLocation}
              />
            </div>
          )}
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

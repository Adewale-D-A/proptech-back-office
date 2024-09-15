import { SyntheticEvent, useCallback, useState } from "react";
import Select from "../inputs/select";
import LoadingButton from "../button";
import TextInput from "../inputs/textInput";

export default function SplitStay({
  id,
  setValue,
}: {
  id: string | undefined;
  setValue: Function;
}) {
  const [rooms, setRooms] = useState("");
  const [guests, setGuests] = useState("");
  const [nameOne, setNameOne] = useState("");
  const [nameTwo, setNameTwo] = useState("");
  const [roomRate, setRoomRate] = useState("");
  const [taxRate, setTaxRate] = useState("");

  const [isSplitting, setIsSplitting] = useState(false);

  const splitHandler = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    setValue(false);
  }, []);
  return (
    <form onSubmit={splitHandler} className="w-full flex flex-col gap-3">
      <Select
        isRequired={true}
        value={rooms}
        setValue={setRooms}
        id="no-of-rooms"
      >
        <option value="" disabled>
          No of Rooms
        </option>
        {Array.from({ length: 8 }, (_, index) => (
          <option key={index} value={`${index + 1}`}>
            {index + 1}
          </option>
        ))}
      </Select>
      <Select
        isRequired={true}
        value={guests}
        setValue={setGuests}
        id="no-of-guests"
      >
        <option value="" disabled>
          No of Guests
        </option>
        {Array.from({ length: 8 }, (_, index) => (
          <option key={index} value={`${index + 1}`}>
            {index + 1}
          </option>
        ))}
      </Select>
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          inputType="text"
          isRequired={true}
          value={nameOne}
          setValue={setNameOne}
          id="nameone"
          placeholder="Name"
        />
        <TextInput
          inputType="text"
          isRequired={true}
          value={nameTwo}
          setValue={setNameTwo}
          id="name-two"
          placeholder="Name"
        />
      </div>

      <TextInput
        inputType="text"
        isRequired={true}
        value={roomRate}
        setValue={setRoomRate}
        id="room-rate"
        placeholder="Enter room Rate (N)"
      />

      <Select
        isRequired={true}
        value={taxRate}
        setValue={setTaxRate}
        id="tax-rate"
      >
        <option value="" disabled>
          Select Tax Rate
        </option>

        <option value="10-percent">10%</option>

        <option value="20-percent">20%</option>
      </Select>
      <div className=" flex items-center gap-5 mt-10">
        <LoadingButton
          type="button"
          label="Cancel"
          variant={2}
          disabled={false}
          isLoading={false}
          clickHandler={() => setValue(false)}
        />

        <LoadingButton
          type="submit"
          label="Split Stay"
          disabled={false}
          isLoading={isSplitting}
        />
      </div>
    </form>
  );
}

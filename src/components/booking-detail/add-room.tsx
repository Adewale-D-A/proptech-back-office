import { SyntheticEvent, useCallback, useState } from "react";
import Select from "../inputs/select";
import LoadingButton from "../button";
import TextInput from "../inputs/textInput";

export default function AddRoom({
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

  const [isAdding, setIsAdding] = useState(false);

  const addRoom = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    setValue(false);
  }, []);
  return (
    <form onSubmit={addRoom} className="w-full flex flex-col gap-3">
      <Select
        isRequired={true}
        value={rooms}
        setValue={setRooms}
        id="no-of-rooms"
      >
        <option value="" disabled>
          Select Room
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
      <TextInput
        inputType="text"
        isRequired={true}
        value={nameOne}
        setValue={setNameOne}
        id="firstname"
        placeholder="First Name"
      />
      <TextInput
        inputType="text"
        isRequired={true}
        value={nameTwo}
        setValue={setNameTwo}
        id="lastname"
        placeholder="Last Name"
      />

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
        id="ordering-position"
      >
        <option value="" disabled>
          Select ordering position
        </option>

        <option value="order-1">1</option>
        <option value="order-2">2</option>
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
          label="Add Room"
          disabled={false}
          isLoading={isAdding}
        />
      </div>
    </form>
  );
}

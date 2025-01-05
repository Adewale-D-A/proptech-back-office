import { useState } from "react";
import LoadingButton from "../button";
import DateInput from "../inputs/dateInput";
import Select from "../inputs/select";

import countries from "../../assets/Countries.json";
export default function CustomersInfoExport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [country, setCountry] = useState("");
  const [others, setOthers] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  return (
    <form className=" w-full grid grid-cols-1 gap-3">
      <DateInput
        inputType="date"
        isRequired={true}
        value={startDate}
        setValue={setStartDate}
        id="start-date"
        placeholder="End Date"
        label="End Date"
      />
      <DateInput
        inputType="date"
        isRequired={true}
        value={endDate}
        setValue={setEndDate}
        id="end-date"
        placeholder="Start Date"
        label="Start Date"
      />
      <DateInput
        inputType="date"
        isRequired={true}
        value={reservationDate}
        setValue={setReservationDate}
        id="reservation-date"
        placeholder="Reservation Date"
        label="Reservation Date"
      />
      <Select
        isRequired={true}
        value={country}
        setValue={setCountry}
        id="country"
      >
        <option value="">Any Country</option>
        {countries.map((country) => (
          <option key={country.code} value={`${country?.name}`}>
            {`${country?.flag} - ${country?.name}`}
          </option>
        ))}
      </Select>
      <Select isRequired={true} value={others} setValue={setOthers} id="others">
        <option value="">Include</option>
        <option value="">Exclude</option>
      </Select>

      <div className=" flex items-center gap-5">
        <LoadingButton
          type="submit"
          label="Download Report"
          disabled={false}
          isLoading={isDownloading}
        />
      </div>
    </form>
  );
}

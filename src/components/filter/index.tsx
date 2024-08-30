import { useState } from "react";
import Select from "../inputs/select";

export default function FilterSort() {
  const [filterApartment, setFilterApartment] = useState("");
  return (
    <div className=" flex items-center gap-3 text-sm">
      <span className=" text-nowrap">Filter by:</span>
      <div className=" flex items-center gap-2 border p-4 rounded-lg">
        <input type="date" title="start date" /> {" - "}
        <input type="date" title="end date" />
      </div>
      <Select
        value={filterApartment}
        setValue={setFilterApartment}
        id="select-apartment"
      >
        <option>All</option>
      </Select>
    </div>
  );
}

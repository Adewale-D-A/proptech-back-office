import { useState } from "react";
import Select from "../inputs/select";

export default function Sort({ id, label }: { id: string; label: string }) {
  const [selectSort, setSelectSort] = useState("");
  return (
    <div className=" flex items-center gap-2 text-gray-500">
      <label htmlFor={id} className=" text-nowrap">
        {label}
      </label>
      <Select value={selectSort} setValue={setSelectSort} id={id}>
        <option>All</option>
      </Select>
    </div>
  );
}

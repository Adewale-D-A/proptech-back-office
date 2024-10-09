import { useEffect, useState } from "react";
import Select from "../inputs/select";

export default function Sort({
  id,
  label,
  setSort,
}: {
  id: string;
  label: string;
  setSort?: Function;
}) {
  const [selectSort, setSelectSort] = useState("");
  useEffect(() => {
    if (setSort) {
      setSort(selectSort);
    }
  }, [selectSort]);
  return (
    <div className=" flex items-center gap-2 text-gray-500 text-xs">
      <label htmlFor={id} className=" text-nowrap">
        {label}
      </label>
      <Select value={selectSort} setValue={setSelectSort} id={id}>
        <option value={"desc"}>Desc</option>
        <option value={"asc"}>Asc</option>
      </Select>
    </div>
  );
}

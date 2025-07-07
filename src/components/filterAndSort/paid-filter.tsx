import { useEffect, useState } from "react";
import Select from "../inputs/select";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useCreateQueryString from "../../useHooks/useCreateQueryString";

export default function PaidFilter({
  onFilterChange,
}: {
  onFilterChange?: (val: string) => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const createQueryString = useCreateQueryString();

  const [selectSort, setSelectSort] = useState(searchParams.get("paid") || "");

  useEffect(() => {
    onFilterChange?.(selectSort);
    navigate(location.pathname + "?" + createQueryString("paid", selectSort));
  }, [selectSort, location.pathname]);

  return (
    <div className=" flex items-center flex-col gap-2 text-gray-500 text-xs">
      <label htmlFor={"paid-filter"} className=" text-nowrap">
        Paid Filter
      </label>
      <Select value={selectSort} setValue={setSelectSort} id={"paid-filter"}>
        <option value={""}>All</option>
        <option value={"yes"}>Asc</option>
        <option value={"no"}>Desc</option>
      </Select>
    </div>
  );
}

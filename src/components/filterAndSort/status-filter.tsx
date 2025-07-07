import { useEffect, useState } from "react";
import Select from "../inputs/select";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useCreateQueryString from "../../useHooks/useCreateQueryString";

export default function StatusFilter({
  onFilterChange,
}: {
  onFilterChange?: (val: string) => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const createQueryString = useCreateQueryString();

  const [selectSort, setSelectSort] = useState(
    searchParams.get("status") || ""
  );

  useEffect(() => {
    onFilterChange?.(selectSort);
    navigate(location.pathname + "?" + createQueryString("status", selectSort));
  }, [selectSort, location.pathname]);

  return (
    <div className=" flex items-center flex-col gap-2 text-gray-500 text-xs">
      <label htmlFor={"status-filter"} className=" text-nowrap">
        Status Filter
      </label>
      <Select value={selectSort} setValue={setSelectSort} id={"status-filter"}>
        <option value={""}>All</option>
        <option value={"pending"}>Pending</option>
        <option value={"approved"}>Approved</option>
        <option value={"processing"}>Processing</option>
        <option value={"closed"}>Closed</option>
        <option value={"declined"}>Declined</option>
      </Select>
    </div>
  );
}

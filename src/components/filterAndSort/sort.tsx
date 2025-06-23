import { useEffect, useState } from "react";
import Select from "../inputs/select";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useCreateQueryString from "../../useHooks/useCreateQueryString";

export default function Sort({
  id,
  label,
  setSort,
  defaultValue = "asc",
}: {
  id: string;
  label: string;
  defaultValue?: "asc" | "desc";
  setSort?: Function;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const createQueryString = useCreateQueryString();

  const [selectSort, setSelectSort] = useState(
    searchParams.get("search") || defaultValue || "asc"
  );

  useEffect(() => {
    setSort?.(selectSort);
    navigate(location.pathname + "?" + createQueryString("sort", selectSort));
  }, [selectSort, location.pathname]);

  return (
    <div className=" flex items-center gap-2 text-gray-500 text-xs">
      <label htmlFor={id} className=" text-nowrap">
        {label}
      </label>
      <Select value={selectSort} setValue={setSelectSort} id={id}>
        <option value={"asc"}>Asc</option>
        <option value={"desc"}>Desc</option>
      </Select>
    </div>
  );
}

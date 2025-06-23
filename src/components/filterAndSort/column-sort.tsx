import { ChevronDown, ChevronUp } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { cn } from "../../utils/cn";

export default function ColumnSort({
  columnIdentifier,
}: {
  columnIdentifier: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isQueried = searchParams.get("column_filter") === columnIdentifier;
  const isAsc = searchParams.get("column_order") === "asc" && isQueried;
  const isDesc = searchParams.get("column_order") === "desc" && isQueried;

  const handleClick = useCallback(
    (order: "asc" | "desc") => {
      let queries: { [key: string]: string } = {};
      searchParams.forEach((value, key) => {
        queries[key] = value;
      });
      const params = new URLSearchParams(queries);
      params.set("column_filter", columnIdentifier);
      params.set("column_order", order);
      navigate(location.pathname + "?" + params.toString());
    },
    [location.pathname, searchParams, columnIdentifier]
  );

  return (
    <div className=" flex flex-col text-white justify-between">
      <button
        onClick={() => handleClick("asc")}
        className=" hover:scale-110 transition-all"
      >
        <ChevronUp
          className={cn(" size-3", isAsc && "text-gray-500")}
          strokeWidth={3}
        />
      </button>
      <button
        onClick={() => handleClick("desc")}
        className=" hover:scale-110 transition-all"
      >
        <ChevronDown
          className={cn(" size-3", isDesc && "text-gray-500")}
          strokeWidth={3}
        />
      </button>
    </div>
  );
}

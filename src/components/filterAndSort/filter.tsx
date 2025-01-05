import { SyntheticEvent, useCallback, useState } from "react";
import ArrowCircleIcon from "../../assets/icons/arrow-circle";

export default function Filter({
  actionHandler,
}: {
  actionHandler?: (start_date: string, end_date: string) => void;
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFiltering = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      if (actionHandler) {
        actionHandler(startDate, endDate);
      }
    },
    [actionHandler, startDate, endDate]
  );

  return (
    <div className=" flex items-center gap-1 text-xs">
      <span className=" text-nowrap">Filter by:</span>
      <form
        onSubmit={handleFiltering}
        className=" flex items-center gap-2 border p-4 rounded-lg"
      >
        <input
          type="date"
          title="start date"
          required
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />{" "}
        {" - "}
        <input
          type="date"
          title="end date"
          required
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className=" text-primary hover:scale-110 transition-all"
          title="filter"
          type="submit"
        >
          <ArrowCircleIcon />
        </button>
      </form>
    </div>
  );
}

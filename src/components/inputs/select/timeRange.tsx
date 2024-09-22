import { SyntheticEvent, useCallback, useState } from "react";
import TimeIcon from "../../../assets/icons/time";

export default function TimeRangeSelector() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const onRangeSelectHandler = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
  }, []);

  const clearInput = useCallback(() => {
    setStartTime("");
    setEndTime("");
  }, []);

  return (
    <div className="group relative">
      <div className="flex items-center w-fit gap-3 border p-3 rounded-md">
        <button
          title="time-slot"
          type="button"
          className=" flex items-center gap-3 whitespace-nowrap"
        >
          {startTime} - {endTime}
        </button>
        <TimeIcon />
      </div>
      <form
        onSubmit={onRangeSelectHandler}
        className="w-full hidden group-hover:block absolute top-12 left-0 border rounded-md bg-white p-3 min-w-48 z-10"
      >
        <div className="w-full flex flex-col gap-3">
          <label htmlFor="start-time">Start Time</label>
          <input
            type="time"
            id="start-time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <label htmlFor="end-time">End Time</label>
          <input
            type="time"
            id="start-time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <div className=" flex items-center gap-4 justify-between">
            <button
              type="button"
              onClick={() => clearInput()}
              className=" p-1 text-sm border-primary border rounded-md"
            >
              clear
            </button>
            <button
              type="submit"
              className=" p-1 px-3 text-sm text-white border rounded-md bg-primary"
            >
              ok
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

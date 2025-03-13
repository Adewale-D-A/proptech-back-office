import { Link } from "react-router-dom";

export default function OwnersReportTabSwitch({
  state,
}: {
  state: "spreasheet" | "summary";
}) {
  const activeClass = " bg-primary  py-3 px-8 rounded-full text-white";
  const inactiveClass =
    " py-3 px-5  rounded-full hover:bg-primary hover:text-white transition-all";
  return (
    <div className=" w-full flex items-center justify-center">
      <div className=" w-fit rounded-full bg-primary/10 p-2 py-5">
        <Link
          to="/reports/owners-report/summary"
          className={state === "summary" ? activeClass : inactiveClass}
        >
          Summary
        </Link>
        <Link
          to="/reports/owners-report/spreadsheet"
          className={state === "spreasheet" ? activeClass : inactiveClass}
        >
          Spreadsheet
        </Link>
      </div>
    </div>
  );
}

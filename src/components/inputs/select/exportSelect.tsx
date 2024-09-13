import React, { useCallback, useState } from "react";

export default function ExportSelect() {
  const [value, setValue] = useState("");
  const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  }, []);
  return (
    <select
      id={"export-report"}
      value={value}
      onChange={(e) => onChange(e)}
      className="w-full p-3 rounded-full  bg-primary/20 sm:text-md focus:ring-primary focus:border-primary"
    >
      <option value="">Export Report</option>
      <option value="csv">Export CSV Report</option>
      <option value="ics">Export ICS Report</option>
    </select>
  );
}

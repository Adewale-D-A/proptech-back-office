import React, { useCallback, useState } from "react";
import ModalTemplate from "../../modal";
import CustomersInfoExport from "../../export-options/customers-export";

export default function ExportSelect({
  id,
}: {
  id: "customers" | "bookings" | "report" | "ratings-and-reviews" | "employees";
}) {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setOpenModal(true);
    setValue(e.target.value);
  }, []);

  return (
    <>
      <label
        htmlFor={"export-report"}
        className="w-full relative p-3 px-6 bg-primary/20 rounded-full flex items-center gap-3"
      >
        {" "}
        <select
          id={"export-report"}
          value={value}
          onChange={(e) => onChange(e)}
          className="w-full sm:text-md bg-transparent"
        >
          <option value="">Export as</option>
          <option value="csv"> CSV</option>
          <option value="excel">Excel</option>
          <option value="print">Print</option>
        </select>
      </label>

      <ModalTemplate
        open={openModal}
        setOpen={setOpenModal}
        showXicon={true}
        title={
          id === "customers"
            ? "Export Customer Information"
            : "Export Booking Information"
        }
        className=" max-w-md"
      >
        {id === "customers" ? <CustomersInfoExport /> : <div></div>}
      </ModalTemplate>
    </>
  );
}

import React, { useCallback, useState } from "react";
import ModalTemplate from "../../modal";
import CustomersInfoExport from "../../export-options/customers-export";
import CSVIcon from "../../../assets/icons/csv";

export default function ExportSelect({
  id,
}: {
  id: "customers" | "bookings" | "report";
}) {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setOpenModal(true);
    setValue(e.target.value);
  }, []);

  return (
    <>
      <select
        id={"export-report"}
        value={value}
        onChange={(e) => onChange(e)}
        className="w-full p-3 rounded-full  bg-primary/20 sm:text-md focus:ring-primary focus:border-primary"
      >
        <option value="">Export Report</option>
        <option value="csv"> CSV</option>
        <option value="excel">Excel</option>
        <option value="print">Print</option>
      </select>

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

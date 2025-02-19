import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import CustomersSingleSearch from "../inputs/search/customer-single-search";
import { customersById } from "../../types/apiData/customers";
import { apartmentById } from "../../types/apiData/apartment";
import ApartmentSingleSearch from "../inputs/search/apartment-single-search";
import DateInput from "../inputs/dateInput";
import LoadingButton from "../button";
import TextAreaInput from "../inputs/textArea";
import useAxiosMultipart from "../../useHooks/useAxiosMultipart";
import { useAppDispatch } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import useGetRequisitionRequest from "../../services-hooks/userGetRequisitionRequest";
import {
  addGeneratorRuntimeToList,
  replaceGeneratorRuntimeInList,
} from "../../stores/apiData/reports/generator-runtime";
import TimeInput from "../inputs/timeInput";

export default function AddEditGeneratorRuntime({
  id,
  setOpen,
}: {
  id?: string;
  setOpen: (open: boolean) => void;
}) {
  const axios = useAxiosMultipart({});
  const dispatch = useAppDispatch();
  const [employee, setEmployee] = useState<customersById>({} as any);
  const [apartment, setApartment] = useState<apartmentById>({} as any);
  const [requestDate, setRequestDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [timeOn, setTimeOn] = useState("");
  const [timeOff, setTimeOff] = useState("");
  const [loading, setLoading] = useState(false);

  const { data } = useGetRequisitionRequest({ id });

  //   populate field provided id is available denoting update functionality
  useEffect(() => {
    if (id && data?.id) {
      const toDate = new Date(data?.request_date)?.toISOString()?.slice(0, 10);
      setRequestDate(toDate || "");
    }
  }, [id, data]);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setLoading(true);
      const payload = {
        employee: employee.id,
        shortlet: apartment.id,
        request_date: requestDate,
        additional_note: additionalNotes,
        time_on: timeOn,
        time_off: timeOff,
      };
      const dummytResponse = {
        id: 14,
        employee: { id: 1, first_name: "John", last_name: "Doe" },
        shortlet_name: "Apartment 32",
        request_date: new Date(),
        created_at: new Date(),
        time_on: timeOn,
        time_off: timeOff,
        run_time: "5hrs",
      };
      try {
        if (id) {
          //   const response = await axios.put(`/admin/requisition-request/${id}`,payload)
          //   const data = response?.data;
          dispatch(replaceGeneratorRuntimeInList(dummytResponse));
          dispatch(
            openSnackbar({
              message: "Generator runtime successfully updated",
              isError: false,
            })
          );
        } else {
          //   const response = axios.post("/admin/requisition-request",payload)
          //   const data = response?.data;
          dispatch(addGeneratorRuntimeToList(dummytResponse));
          dispatch(
            openSnackbar({
              message: "Generator runtime successfully added",
              isError: false,
            })
          );
        }
        setOpen(false);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [id, employee, apartment, requestDate, additionalNotes, timeOn, timeOff]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 gap-3">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        <CustomersSingleSearch
          placeholder="Choose employee"
          selected={employee}
          setSelected={setEmployee}
          label="Requesting employee"
        />
        <ApartmentSingleSearch
          placeholder="Select company/apartment"
          selected={apartment}
          setSelected={setApartment}
          label="Apartment"
        />
        <TimeInput
          inputType="time"
          isRequired={false}
          value={timeOn}
          setValue={setTimeOn}
          id="time-on"
          placeholder="Time on"
          label="Time On"
          staticLabel="Time on"
        />
        <TimeInput
          inputType="time"
          isRequired={false}
          value={timeOff}
          setValue={setTimeOff}
          id="time-off"
          placeholder="Time off"
          label="Time off"
          staticLabel="Time off"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <DateInput
          inputType="date"
          isRequired={false}
          value={requestDate}
          setValue={setRequestDate}
          id="generator-runtime-date"
          placeholder="date"
          label=""
          staticLabel="Date"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <TextAreaInput
          isRequired={false}
          value={additionalNotes}
          setValue={setAdditionalNotes}
          id="additional-noted"
          placeholder="Leave addition notes"
          label="Additional comments/Notes"
        />
        <div className=" flex items-center gap-5 mt-10">
          <LoadingButton
            type="button"
            label="Cancel"
            variant={2}
            disabled={false}
            isLoading={false}
            clickHandler={() => setOpen(false)}
          />

          <LoadingButton
            type="submit"
            label={id ? "Update" : "Create"}
            disabled={false}
            isLoading={loading}
          />
        </div>
      </div>
    </form>
  );
}

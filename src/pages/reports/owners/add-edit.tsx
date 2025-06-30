import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import useAxios from "../../../useHooks/useAxios";
import { useAppDispatch } from "../../../stores/hooks";
import useGetOwnerReportById from "../../../services-hooks/reports/userGetOwnerReportById";
import {
  addOwnersReportToList,
  replaceOwnersReportInList,
} from "../../../stores/apiData/reports/owners-report";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import LoadingButton from "../../../components/button";
import TextAreaInput from "../../../components/inputs/textArea";
import DateInput from "../../../components/inputs/dateInput";
import Select from "../../../components/inputs/select";
import TextInput from "../../../components/inputs/textInput";
import purgeEmptyPayload from "../../../utils/remove-empty-payload";
// import useGetExpenseCategories from "../../../services-hooks/useGetExpenseCategories";
import ApartmentThroughBuildingSelector from "../../../components/inputs/select/apartment-through-building-selector";
import { formatDateToString } from "../../../utils/isoDateConverter";
import useGetRequestCategories from "../../../services-hooks/useGetRequestCategories";

export default function AddEditOwnersReport({
  id,
  setOpen,
}: {
  id?: string;
  setOpen: (open: boolean) => void;
}) {
  const axios = useAxios({});
  const dispatch = useAppDispatch();

  const [expenseId, setExpenseId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [apartmentId, setApartmentId] = useState("");
  const [buildingId, setBuildingId] = useState("");

  const [loading, setLoading] = useState(false);

  const { data } = useGetOwnerReportById({ id });
  const { data: expenseCategories } = useGetRequestCategories({
    page: 1,
    limit: 200,
  });

  //   populate field provided id is available denoting update functionality
  useEffect(() => {
    if (id && data?.id) {
      const toDate = formatDateToString(new Date(data?.date));
      setDate(toDate || "");
      setBuildingId(String(data?.building_id || ""));
      setAmount(String(data?.amount || ""));
      setApartmentId(String(data?.shortlet_id || ""));
      setExpenseId(String(data?.category_id || ""));
      setAdditionalNotes(data?.note || "");
    }
  }, [id, data]);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setLoading(true);
      const payload = {
        building_id: buildingId,
        shortlet_id: apartmentId,
        category_id: expenseId,
        amount: amount,
        date: date,
        note: additionalNotes,
      };
      const newPayload = purgeEmptyPayload({ payload });
      try {
        if (id) {
          const response = await axios.put(
            `/admin/owner-report/${id}`,
            newPayload
          );
          const { owner_report } = response?.data?.data;
          const result = {
            ...owner_report,
            category: {
              id: owner_report?.category_id,
              name:
                expenseCategories?.find(
                  (item) =>
                    String(item?.id) === String(owner_report?.category_id)
                )?.name || "",
            },
          };
          dispatch(replaceOwnersReportInList(result));
          dispatch(
            openSnackbar({
              message: "Owner report successfully updated",
              isError: false,
            })
          );
        } else {
          const response = await axios.post("/admin/owner-report", newPayload);
          const { owner_report } = response?.data?.data;
          const result = {
            ...owner_report,
            category: {
              id: owner_report?.category_id,
              name:
                expenseCategories?.find(
                  (item) =>
                    String(item?.id) === String(owner_report?.category_id)
                )?.name || "",
            },
          };
          dispatch(addOwnersReportToList(result));
          dispatch(
            openSnackbar({
              message: "Owner report successfully added",
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
    [
      id,
      date,
      additionalNotes,
      buildingId,
      expenseId,
      amount,
      expenseCategories,
    ]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 gap-3">
      <ApartmentThroughBuildingSelector
        setApartmentId={setApartmentId}
        apartmentId={apartmentId}
        buildingId={buildingId}
        setBuildingId={setBuildingId}
      />
      <div className="w-full items-end grid grid-cols-1 md:grid-cols-2 gap-3">
        <Select
          label="Expense Category"
          value={expenseId}
          setValue={setExpenseId}
          id={"expense-select"}
        >
          <option value={``} disabled>
            Expense Category
          </option>
          {expenseCategories?.map((item) => (
            <option key={item?.id} value={`${item?.id}`}>
              {item?.name}
            </option>
          ))}
        </Select>
        <TextInput
          inputType="number"
          label="Amount"
          value={amount}
          setValue={setAmount}
          id={"amount"}
          placeholder="amount"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <DateInput
          inputType="date"
          isRequired={false}
          value={date}
          setValue={setDate}
          id="date"
          placeholder="date"
          label=""
          staticLabel="Date"
        />
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
            label={id ? "Update" : "Confirm"}
            disabled={false}
            isLoading={loading}
          />
        </div>
      </div>
    </form>
  );
}

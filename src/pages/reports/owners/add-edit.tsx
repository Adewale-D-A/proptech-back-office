import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import useAxios from "../../../useHooks/useAxios";
import { useAppDispatch } from "../../../stores/hooks";
import useGetOwnerReportById from "../../../services-hooks/reports/userGetOwnerReportById";
import {
  addOwnersReportReportToList,
  replaceOwnersReportInList,
} from "../../../stores/apiData/reports/owners-report";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import LoadingButton from "../../../components/button";
import TextAreaInput from "../../../components/inputs/textArea";
import DateInput from "../../../components/inputs/dateInput";
import { apartmentById } from "../../../types/apiData/apartment";
import useGetLocationGroupings from "../../../services-hooks/apartment/useGetLocationGroupings";
import Select from "../../../components/inputs/select";
import ApartmentSingleSearch from "../../../components/inputs/search/apartment-single-search";
import useGetRequestCategories from "../../../services-hooks/useGetRequestCategories";
import TextInput from "../../../components/inputs/textInput";

export default function AddEditOwnersReport({
  id,
  setOpen,
}: {
  id?: string;
  setOpen: (open: boolean) => void;
}) {
  const axios = useAxios({});
  const dispatch = useAppDispatch();

  const [buildingId, setBuildingId] = useState("");
  const [apartment, setApartment] = useState<apartmentById>({} as any);
  const [expenseId, setExpenseId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [loading, setLoading] = useState(false);

  const { data } = useGetOwnerReportById({ id });
  const { data: locationGroupsDataset } = useGetLocationGroupings({ page: 1 });
  const { data: requestCategoryDataset } = useGetRequestCategories({ page: 1 });

  //   populate field provided id is available denoting update functionality
  useEffect(() => {
    if (id && data?.id) {
      const toDate = new Date(data?.date)?.toISOString()?.slice(0, 10);
      setDate(toDate || "");
      setBuildingId(String(data?.building_id || ""));
      setAmount(String(data?.amount || ""));
      setExpenseId(String(data?.expense_id || ""));
      setAdditionalNotes(data?.additional_note || "");
    }
  }, [id, data]);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setLoading(true);
      const payload = {
        building_id: buildingId,
        shortlet_id: apartment?.id,
        expense: expenseId,
        amount: amount,
        date: date,
        additional_note: additionalNotes,
      };
      const dummytResponse = {
        id: 1,
        building_id: buildingId,
        building: locationGroupsDataset?.find(
          (item) => String(item?.id) === buildingId
        ),
        shortlet_id: apartment?.id,
        shortlet: apartment,
        expense_id: expenseId,
        expense: requestCategoryDataset?.find(
          (item) => String(item?.id) === expenseId
        ),
        amount: amount,
        date: date,
        additional_note: additionalNotes,
      };
      try {
        if (id) {
          //   const response = await axios.put(`/admin/requisition-request/${id}`,payload)
          //   const data = response?.data;
          dispatch(replaceOwnersReportInList(dummytResponse));
          dispatch(
            openSnackbar({
              message: "Owner report successfully updated",
              isError: false,
            })
          );
        } else {
          //   const response = axios.post("/admin/requisition-request",payload)
          //   const data = response?.data;
          dispatch(addOwnersReportReportToList(dummytResponse));
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
      apartment,
      amount,
      locationGroupsDataset,
      requestCategoryDataset,
    ]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 gap-3">
      <div className="w-full items-end grid grid-cols-1 md:grid-cols-2 gap-3">
        <Select
          label="Building"
          value={buildingId}
          setValue={setBuildingId}
          id={"building-select"}
        >
          <option value={``} disabled>
            Select Building
          </option>
          {locationGroupsDataset?.map((item) => (
            <option key={item?.id} value={`${item?.id}`}>
              {item?.name}
            </option>
          ))}
        </Select>
        <ApartmentSingleSearch
          label="Apartment"
          selected={apartment}
          setSelected={setApartment}
          placeholder="Apartment"
          defaultId={String(data?.shortlet_id)}
        />
        <Select
          label="Expense"
          value={expenseId}
          setValue={setExpenseId}
          id={"expense-select"}
        >
          <option value={``} disabled>
            Expense
          </option>
          {requestCategoryDataset?.map((item) => (
            <option key={item?.id} value={`${item?.id}`}>
              {item?.name}
            </option>
          ))}
        </Select>
        <TextInput
          inputType="number"
          label="Expense"
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

import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import useAxios from "../../../../useHooks/useAxios";
import { useAppDispatch } from "../../../../stores/hooks";
import { openSnackbar } from "../../../../stores/appFunctionality/snackbar";
import TextInput from "../../../../components/inputs/textInput";
import LoadingButton from "../../../../components/button";
import purgeEmptyPayload from "../../../../utils/remove-empty-payload";
import {
  addExpenseategory,
  replaceExpenseategory,
} from "../../../../stores/apiData/expense-categories";
import useGetExpenseCategory from "../../../../services-hooks/useGetExpenseCategory";
import TextAreaInput from "../../../../components/inputs/textArea";

export default function AddEditExpensesCategories({
  id,
  setOpen,
}: {
  id?: string;
  setOpen: (val: boolean) => void;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [hexCode, setHexCode] = useState("");

  const [isSubmitting, setIsSubmiting] = useState(false);

  const { data } = useGetExpenseCategory({ id });

  // populate data with existing data if id is provided
  useEffect(() => {
    if (id && data?.name) {
      const { name, description } = data || {};
      setName(name || "");
      setDescription(description || "");
    }
  }, [data]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsSubmiting(true);
      const payload = {
        name: name,
        description: description,
      };
      const newPayload = purgeEmptyPayload({ payload });
      try {
        if (id) {
          const response = await axios.put(
            `/admin/expense-category/${id}`,
            newPayload
          );
          const { data, message } = response?.data;

          dispatch(replaceExpenseategory(data?.expense_category));
          dispatch(
            openSnackbar({
              message: message || "Expense category successfully updated",
              isError: false,
            })
          );
        } else {
          const response = await axios.post(
            "/admin/expense-category",
            newPayload
          );
          const { data, message } = response?.data;
          dispatch(addExpenseategory(data?.expense_category));
          dispatch(
            openSnackbar({
              message: message || "Expense category successfully created",
              isError: false,
            })
          );
        }
        setOpen(false);
      } catch (error) {
      } finally {
        setIsSubmiting(false);
      }
    },
    [name, description, id]
  );

  return (
    <div className="w-full">
      <form className=" flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className=" w-full grid grid-cols-1 gap-5">
          <TextInput
            inputType="text"
            isRequired={true}
            value={name}
            setValue={setName}
            id="blocked-dates-name"
            placeholder="Enter name"
          />
          <TextAreaInput
            isRequired={false}
            value={description}
            setValue={setDescription}
            id="descriptions"
            placeholder="Enter description"
          />
          {/* <TextInput
            inputType="text"
            isRequired={false}
            value={hexCode}
            setValue={setHexCode}
            id="blocked-dates-name"
            placeholder="Enter hexcode"
          /> */}
        </div>
        <div className=" flex items-center gap-5">
          <LoadingButton
            type="button"
            label="Cancel"
            variant={2}
            disabled={false}
            isLoading={false}
            clickHandler={() => close()}
          />

          <LoadingButton
            type="submit"
            label={id ? "Save Changes" : "Create"}
            disabled={false}
            isLoading={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}

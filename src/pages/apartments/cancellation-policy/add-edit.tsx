import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import useAxios from "../../../useHooks/useAxios";
import { useAppDispatch } from "../../../stores/hooks";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import {
  addCancellationPolicyToList,
  replaceCancellationPolicyInList,
} from "../../../stores/apiData/apartment/cancellation-policies";
import TextInput from "../../../components/inputs/textInput";
import LoadingButton from "../../../components/button";
import useGetCancellationPolicy from "../../../services-hooks/apartment/useGetCancellationPolicy";

export default function AddEditCancellationPolicy({
  id,
  setOpen,
}: {
  id?: string;
  setOpen: (val: boolean) => void;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");

  const [isSubmitting, setIsSubmiting] = useState(false);

  const { data } = useGetCancellationPolicy({ id });

  // populate data with existing data if id is provided
  useEffect(() => {
    if (id && data?.name) {
      const { name } = data || {};
      setName(name || "");
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
      };
      try {
        if (id) {
          const response = await axios.put(
            `/admin/cancellation-policy/${id}`,
            payload
          );
          const { data, message } = response?.data;

          dispatch(replaceCancellationPolicyInList(data?.cancellation_policy));
          dispatch(
            openSnackbar({
              message: message || "Cancellation policy successfully updated",
              isError: false,
            })
          );
        } else {
          const response = await axios.post(
            "/admin/cancellation-policy",
            payload
          );
          const { data, message } = response?.data;
          dispatch(addCancellationPolicyToList(data?.cancellation_policy));
          dispatch(
            openSnackbar({
              message: message || "Cancellation policy successfully created",
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
    [name, id]
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
            id="name"
            placeholder="Enter name"
          />
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

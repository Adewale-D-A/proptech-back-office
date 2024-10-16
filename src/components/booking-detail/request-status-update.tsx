import { SyntheticEvent, useCallback, useState } from "react";
import Select from "../inputs/select";
import LoadingButton from "../button";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { replaceRequestsInList } from "../../stores/apiData/requests-lists";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";

export default function RequestStatusUpdate({
  setValue,
  id,
  currentStatus,
}: {
  setValue: Function;
  id: string;
  currentStatus: string;
}) {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const [requestStatus, setRequestStatus] = useState(currentStatus || "");
  const [isResolving, setIsResolving] = useState(false);

  const updateRequest = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      try {
        setIsResolving(true);
        const response = await axios.put(`/admin/user-request/${id}`, {
          status: requestStatus,
        });
        const { data, message } = response?.data;
        dispatch(replaceRequestsInList(data));
        dispatch(
          openSnackbar({
            message: message || "User request updated successfully",
            isError: false,
          })
        );
        setValue(false);
      } catch (error) {
      } finally {
        setIsResolving(false);
      }
    },
    [requestStatus, id]
  );
  return (
    <form onSubmit={updateRequest} className="w-full flex flex-col gap-3">
      <Select
        isRequired={true}
        value={requestStatus}
        setValue={setRequestStatus}
        id="request-type"
      >
        <option value="" disabled>
          Change request status
        </option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
        <option value="pending">Pending</option>
      </Select>
      <div className=" flex items-center gap-5 mt-10">
        <LoadingButton
          type="button"
          label="Cancel"
          variant={2}
          disabled={false}
          isLoading={false}
          clickHandler={() => setValue(false)}
        />

        <LoadingButton
          type="submit"
          label="Update Status"
          disabled={false}
          isLoading={isResolving}
        />
      </div>
    </form>
  );
}

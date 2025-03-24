import { SyntheticEvent, useCallback, useState } from "react";
import DoubleCheckIcon from "../../../assets/icons/double-check";
import useAxios from "../../../useHooks/useAxios";
import { useAppDispatch } from "../../../stores/hooks";
import {
  replaceRequisitionRequestInList,
  updateRequisitionRequestStatusInList,
} from "../../../stores/apiData/requisition-requests";
import Select from "../../../components/inputs/select";
import { requisitionRequest } from "../../../types/apiData/requisition-request";
import LoadingButton from "../../../components/button";

export default function RequisitionRequestStatusChanger({
  id,
  setOpen,
}: {
  id: string;
  setOpen: (open: boolean) => void;
}) {
  const axios = useAxios({ disableErrMssg: false, disableSuccMssg: false });
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState("");

  const [updating, setUpdating] = useState(false);
  const [isMarkingAsPaid, setIsMarkingAsPaid] = useState(false);

  const updateStatus = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setUpdating(true);
      try {
        const response = await axios.put(
          `/admin/requisition-request/update-status/${id}`,
          {
            status,
          }
        );
        const { requisition_request } = response?.data?.data;
        dispatch(updateRequisitionRequestStatusInList(requisition_request));
        setOpen(false);
      } catch (error) {
      } finally {
        setUpdating(false);
      }
    },
    [id, status]
  );

  const markAsPaid = useCallback(async () => {
    try {
      setIsMarkingAsPaid(true);
      const response = await axios.put(
        `/admin/requisition-request/toggle-paid/${id}`,
        {
          status: "paid",
        }
      );
      const { requisition_request } = response?.data?.data;
      dispatch(updateRequisitionRequestStatusInList(requisition_request));
      setOpen(false);
    } catch (error) {
    } finally {
      setIsMarkingAsPaid(false);
    }
  }, [id]);

  return (
    <form onSubmit={updateStatus} className=" w-full">
      <Select
        isRequired={true}
        value={status}
        setValue={setStatus}
        id="status"
        label="Status"
      >
        <option value="" disabled>
          Update requisition status
        </option>
        <option value="approved">Approved</option>
        <option value="pending">Pending</option>
        <option value="declined">Declined</option>
      </Select>
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
          type="button"
          label="Mark as paid"
          variant={3}
          disabled={false}
          isLoading={isMarkingAsPaid}
          clickHandler={() => markAsPaid()}
          className=" bg-green-500/10 text-green-500"
          startIcon={<DoubleCheckIcon />}
        />
        <LoadingButton
          type="submit"
          label={"Update status"}
          disabled={false}
          isLoading={updating}
        />
      </div>
    </form>
  );
}

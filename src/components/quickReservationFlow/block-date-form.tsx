import { useCallback, useState } from "react";
import LoadingButton from "../button";
import Select from "../inputs/select";
import useGetBlockedReasons from "../../services-hooks/useGetBlockedReasons";
import useAxios from "../../useHooks/useAxios";
import reservationValidator from "../../utils/reservation-validator";
import { useAppDispatch } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";

export default function BlockDateForm({
  apt_id,
  check_in_date,
  check_out_date,
}: {
  apt_id: string;
  check_in_date: string;
  check_out_date: string;
}) {
  const axios = useAxios({ disableSuccMssg: true, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetBlockedReasons({ page: 1, limit: 50 });
  const [blockedReason, setBlockedReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleBlockDates = useCallback(async () => {
    const payload = {
      Apartment: apt_id,
      "Start date": check_in_date,
      "End Date": check_out_date,
      "Block reason": blockedReason,
    };
    const { success, message } = reservationValidator({ data: payload });
    if (!success) {
      dispatch(
        openSnackbar({
          message: message,
          isError: true,
        })
      );
      return;
    }
    try {
      setSubmitting(true);
      await axios.post(`/admin/block-date`, {
        shortlet_id: apt_id,
        start_date: check_in_date,
        end_date: check_out_date,
        blocked_date_reason_id: blockedReason,
      });
      dispatch(
        openSnackbar({
          message: "Dates successfully blocked",
          isError: false,
        })
      );
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  }, [blockedReason, apt_id, check_in_date, check_out_date]);
  return (
    <div className="w-full flex flex-col gap-5">
      <Select
        isRequired={true}
        value={blockedReason}
        setValue={setBlockedReason}
        id="blocked-date-reason"
      >
        <option value="" disabled>
          Reason for blocking date(s)
        </option>
        {data?.map((item) => (
          <option key={item?.id} value={String(item?.id)}>
            {item?.name}
          </option>
        ))}
      </Select>
      <LoadingButton
        type="button"
        label="Block dates"
        disabled={false}
        isLoading={submitting}
        clickHandler={handleBlockDates}
      />
    </div>
  );
}

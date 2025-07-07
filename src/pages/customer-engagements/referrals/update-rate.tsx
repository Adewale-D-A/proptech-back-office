import {
  SyntheticEvent,
  useCallback,
  useEffect,
  // useEffect,
  useState,
} from "react";
import useAxios from "../../../useHooks/useAxios";
import TextInput from "../../../components/inputs/textInput";
import LoadingButton from "../../../components/button";
import useGetReferralPercentage from "../../../services-hooks/useGetReferralPercentage";
import { useAppDispatch } from "../../../stores/hooks";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";

export default function UpdateReferralRatePercentage({
  onClose,
}: {
  onClose?: (val: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const { data } = useGetReferralPercentage();
  const axios = useAxios({});
  const [rate, setRate] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (data?.id) {
      setRate(String(data?.rate) || "");
    }
  }, [data]);

  const addNewTax = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await axios.post("/admin/referral-setting", {
          rate,
        });
        onClose?.(false);
        dispatch(
          openSnackbar({
            message: "Referral rate successfully updated",
            isError: false,
          })
        );
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    },
    [rate]
  );

  return (
    <form className="w-full flex flex-col gap-5" onSubmit={addNewTax}>
      <div className=" w-full grid grid-cols-1 gap-5">
        <TextInput
          isRequired={true}
          value={rate}
          setValue={setRate}
          id="referral-percentage"
          inputType="number"
          label="Referral Percentage Rate % (in percentage)"
          placeholder="Enter Referral percentage rate % (in percentage)"
        />
      </div>
      <div className=" flex items-center gap-5 mt-10">
        <LoadingButton
          type="button"
          label="Cancel"
          variant={2}
          disabled={false}
          isLoading={false}
          clickHandler={() => onClose?.(false)}
        />
        <LoadingButton
          type="submit"
          label={"Save Referral Setting"}
          disabled={false}
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
}

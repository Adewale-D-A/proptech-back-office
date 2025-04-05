import { SyntheticEvent, useCallback, useState } from "react";
import useAxios from "../../../useHooks/useAxios";
import { useAppDispatch } from "../../../stores/hooks";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import LoadingButton from "../../../components/button";
import TextInput from "../../../components/inputs/textInput";

export default function UpdateManagementFee({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const axios = useAxios({});
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await axios.post(`/admin/tax`, {
          rate: value,
        });
        // const data = response?.data;
        dispatch(
          openSnackbar({
            message: "Mangement fee successfully updated",
            isError: false,
          })
        );
        setOpen(false);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [value]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 gap-5">
      <div className=" flex items-center gap-2 flex-wrap">
        <span className=" text-gray-500">Quick selection:</span>
        {[5, 10, 15, 20].map((item) => (
          <button
            onClick={() => setValue(String(item))}
            className=" rounded-full px-3 p-1 bg-gray-100"
          >
            {String(item)}%
          </button>
        ))}
      </div>
      <TextInput
        inputType="number"
        label="Value(%)"
        value={value}
        setValue={setValue}
        id={"management-fee"}
        placeholder="What percentage is the management fee"
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
          label={"Confirm"}
          disabled={false}
          isLoading={loading}
        />
      </div>
    </form>
  );
}

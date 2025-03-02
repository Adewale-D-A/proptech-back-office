import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../../inputs/textInput";
import LoadingButton from "../../button";
import useAxios from "../../../useHooks/useAxios";
import { useAppDispatch } from "../../../stores/hooks";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import useGetlocationGrouping from "../../../services-hooks/apartment/useGetLocationGrouping";
import {
  addLocationGroupingToList,
  removeLocationGroupingInList,
  replaceLocationGroupingInList,
} from "../../../stores/apiData/apartment/location-groupings";

export default function AddEditLocationGroup({
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

  const { data } = useGetlocationGrouping({ id });

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
            `/admin/location-group/${id}`,
            payload
          );
          const { data, message } = response?.data;

          dispatch(replaceLocationGroupingInList(data?.location_group));
          dispatch(
            openSnackbar({
              message: message || "Location group  successfully updated",
              isError: false,
            })
          );
        } else {
          const response = await axios.post("/admin/location-group", payload);
          const { data, message } = response?.data;
          dispatch(addLocationGroupingToList(data?.location_group));
          dispatch(
            openSnackbar({
              message: message || "Location group successfully created",
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

import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import LoadingButton from "../button";
import TextInput from "../inputs/textInput";
import TextAreaInput from "../inputs/textArea";
import useGetSafetyAndSecurity from "../../services-hooks/useGetSafetyAndSecurity";
import useAxiosMultipart from "../../useHooks/useAxiosMultipart";
import { useAppDispatch } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import {
  addSafetyAndSecurity,
  replaceSafetyAndSecurity,
} from "../../stores/apiData/safety-and-security";

export default function AddEdit({
  id,
  setOpen,
}: {
  id?: string;
  setOpen: Function;
}) {
  const axios = useAxiosMultipart();
  const dispatch = useAppDispatch();
  const { data } = useGetSafetyAndSecurity({ id });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isAdding, setIsAdding] = useState(false);

  //auto update fields
  useEffect(() => {
    if (id) {
      const { name, description } = data;
      if (name) {
        setTitle(name || "");
        setDescription(description || "");
      }
    }
  }, [id, data]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const addRoomOption = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsAdding(true);
      const payload = {
        name: title,
        desciption: description,
        image: "",
      };
      try {
        if (id) {
          //run update endpoint
          const response = await axios.put(`/admin/safety/${id}`, payload);
          console.log({ response });
          const { safety } = response?.data?.data;
          dispatch(
            openSnackbar({
              message: "Safety and security successfully updated",
              isError: false,
            })
          );
          dispatch(replaceSafetyAndSecurity(safety));
        } else {
          //run create enpoint
          const response = await axios.post("/admin/safety", payload);
          const { safety } = response?.data?.data;
          dispatch(
            openSnackbar({
              message: "Safety and Security successfully added",
              isError: false,
            })
          );
          dispatch(addSafetyAndSecurity(safety));
        }
        setOpen(false);
      } catch (error) {
      } finally {
        setIsAdding(false);
      }
    },
    [title, description, id]
  );

  return (
    <div className="w-full">
      <form className=" flex flex-col gap-5" onSubmit={addRoomOption}>
        <div className=" w-full grid grid-cols-1 gap-5">
          <TextInput
            inputType="text"
            isRequired={true}
            value={title}
            setValue={setTitle}
            id="title"
            placeholder="Enter Title"
          />
          <TextAreaInput
            isRequired={true}
            value={description}
            setValue={setDescription}
            id="description"
            placeholder="Description"
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
            label={id ? "Save Changes" : "Add"}
            disabled={false}
            isLoading={isAdding}
          />
        </div>
      </form>
    </div>
  );
}

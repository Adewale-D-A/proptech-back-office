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
import useGetHouseRule from "../../services-hooks/useGetHouseRule";
import {
  addHouseRule,
  replaceHouseRule,
} from "../../stores/apiData/house-rules";

export default function AddEdit({
  id,
  setOpen,
  componentId = "safety",
}: {
  id?: string;
  setOpen: Function;
  componentId?: "safety" | "rule";
}) {
  const axios = useAxiosMultipart();
  const dispatch = useAppDispatch();
  const { data: safety } = useGetSafetyAndSecurity({
    id: componentId === "safety" ? id : undefined,
  });
  const { data: houseRule } = useGetHouseRule({
    id: componentId === "rule" ? id : undefined,
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isAdding, setIsAdding] = useState(false);

  //auto update fields
  useEffect(() => {
    if (id) {
      const { name, description } =
        componentId === "safety" ? safety : houseRule;
      if (name) {
        setTitle(name || "");
        setDescription(description || "");
      }
    }
  }, [id, componentId, safety, houseRule]);

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
          const response = await axios.put(
            `/admin/${componentId === "safety" ? "safety" : "rule"}/${id}`,
            payload
          );
          const { safety, rule } = response?.data?.data;
          dispatch(
            openSnackbar({
              message:
                componentId === "safety"
                  ? "Safety and security successfully updated"
                  : "Rule successfully updated",
              isError: false,
            })
          );
          dispatch(
            componentId === "safety"
              ? replaceSafetyAndSecurity(safety)
              : replaceHouseRule(rule)
          );
        } else {
          //run create enpoint
          const response = await axios.post(
            `/admin/${componentId === "safety" ? "safety" : "rule"}`,
            payload
          );
          const { safety, rule } = response?.data?.data;
          dispatch(
            openSnackbar({
              message:
                componentId === "safety"
                  ? "Safety and security successfully added"
                  : "Rule successfully added",
              isError: false,
            })
          );
          dispatch(
            componentId === "safety"
              ? addSafetyAndSecurity(safety)
              : addHouseRule(rule)
          );
        }
        setOpen(false);
      } catch (error) {
      } finally {
        setIsAdding(false);
      }
    },
    [title, description, componentId, id]
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

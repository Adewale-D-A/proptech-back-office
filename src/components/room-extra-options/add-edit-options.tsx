import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../inputs/textInput";
import LoadingButton from "../button";
import TextAreaInput from "../inputs/textArea";
import { useAppDispatch } from "../../stores/hooks";
import useGetRoomOption from "../../services-hooks/useGetRoomOption";
import useGetExtraOption from "../../services-hooks/useGetExtraOption";
import useAxios from "../../useHooks/useAxios";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import {
  addExtraOption,
  replaceExtraOption,
} from "../../stores/apiData/extra-options";
import {
  addRoomOption,
  replaceRoomOption,
} from "../../stores/apiData/room-options";

export default function AddEditOptions({
  id,
  setOpenOption,
  componentId = "extra",
}: {
  id?: string;
  setOpenOption: Function;
  componentId?: "extra" | "room";
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data: roomOptionData } = useGetRoomOption({
    id: componentId === "room" ? id : undefined,
  });
  const { data: extraOptionData } = useGetExtraOption({
    id: componentId === "extra" ? id : undefined,
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isAdding, setIsAdding] = useState(false);

  //auto update fields
  useEffect(() => {
    if (id) {
      const { name, description } =
        componentId === "extra" ? extraOptionData : roomOptionData;
      if (name) {
        setTitle(name || "");
        setDescription(description || "");
      }
    }
  }, [id, componentId, extraOptionData, roomOptionData]);

  const close = useCallback(() => {
    setOpenOption(false);
  }, []);

  const submitOptions = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsAdding(true);
      const payload = {
        name: title,
        description: description,
      };
      try {
        if (id) {
          //run update endpoint
          const response = await axios.put(
            `/admin/${
              componentId === "extra" ? "extra-option" : "room-option"
            }/${id}`,
            payload
          );
          const { extraOption, roomOption } = response?.data?.data;
          dispatch(
            openSnackbar({
              message:
                componentId === "extra"
                  ? "Extra option successfully update"
                  : "Room option successfully updated",
              isError: false,
            })
          );
          dispatch(
            componentId === "extra"
              ? replaceExtraOption(extraOption)
              : replaceRoomOption(roomOption)
          );
        } else {
          //run create enpoint
          const response = await axios.post(
            `/admin/${
              componentId === "extra" ? "extra-option" : "room-option"
            }`,
            payload
          );
          const { extraOption, roomOption } = response?.data?.data;
          dispatch(
            openSnackbar({
              message:
                componentId === "extra"
                  ? "Extra option successfully added"
                  : "Room option successfully added",
              isError: false,
            })
          );
          dispatch(
            componentId === "extra"
              ? addExtraOption(extraOption)
              : addRoomOption(roomOption)
          );
        }
        setOpenOption(false);
      } catch (error) {
      } finally {
        setIsAdding(false);
      }
    },
    [title, description, id, componentId]
  );

  return (
    <div className="w-full">
      <form className=" flex flex-col gap-5" onSubmit={submitOptions}>
        <div className=" w-full grid grid-cols-1 gap-5">
          <TextInput
            inputType="text"
            isRequired={true}
            value={title}
            setValue={setTitle}
            id="Title"
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
            label={
              id
                ? "Save Changes"
                : componentId === "room"
                ? "Create Category"
                : "Add Option"
            }
            disabled={false}
            isLoading={isAdding}
          />
        </div>
      </form>
    </div>
  );
}

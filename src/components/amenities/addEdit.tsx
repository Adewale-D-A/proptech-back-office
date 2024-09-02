import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import LoadingButton from "../button";
import TextInput from "../inputs/textInput";
import TextAreaInput from "../inputs/textArea";

export default function AddEdit({
  id,
  setOpen,
}: {
  id?: string;
  setOpen: Function;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isAdding, setIsAdding] = useState(false);

  //auto update fields
  useEffect(() => {
    if (id) {
      const { title, description } = {
        title: "title",
        description: "description",
      };
      if (title) {
        setTitle(title);
        setDescription(description);
      }
    }
  }, [id]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const addRoomOption = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsAdding(true);
      try {
        if (id) {
          //run update endpoint
        } else {
          //run create enpoint
        }
        console.log({ title, description });
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
            label={id ? "Save Changes" : "Add"}
            disabled={false}
            isLoading={isAdding}
          />
        </div>
      </form>
    </div>
  );
}

import { SyntheticEvent, useCallback, useState } from "react";
import TextAreaInput from "../../../../../components/inputs/textArea";
import LoadingButton from "../../../../../components/button";

export default function InvoiceNotes() {
  const [message, setMessage] = useState("");

  const updateNoteHandler = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
  }, []);

  return (
    <form
      onSubmit={updateNoteHandler}
      className=" p-3 flex flex-col gap-5 border-t"
    >
      <TextAreaInput
        isRequired={true}
        value={message}
        setValue={setMessage}
        placeholder="Type message"
        id="notes"
      />
      <div className=" flex justify-end">
        <div className=" w-fit flex items-center gap-3">
          <LoadingButton
            isLoading={false}
            type="button"
            variant={2}
            label="Update Notes"
          />
          <LoadingButton
            isLoading={false}
            type="submit"
            label="Generate Invoice"
          />
        </div>
      </div>
    </form>
  );
}

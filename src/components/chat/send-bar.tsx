import { SyntheticEvent, useCallback } from "react";
import PaperClip from "../../assets/icons/paper-clip";
import PaperplaneIcon from "../../assets/icons/paperplane";
import LoadingButton from "../button";

export default function SendBar() {
  const sendMessage = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className=" p-4 border-t">
      <form
        onSubmit={sendMessage}
        className="w-full flex justify-between gap-2 bg-primary/10 rounded-full items-center p-2"
      >
        <input
          type="text"
          id="bar"
          className=" w-full p-3 bg-transparent focus:border-none focus:ring-0 focus:outline-none"
          placeholder="Type your message"
        />
        <PaperClip />
        <div className=" w-fit">
          <LoadingButton
            type="submit"
            isLoading={false}
            label="Send"
            endIcon={<PaperplaneIcon />}
          />
        </div>
      </form>
    </div>
  );
}

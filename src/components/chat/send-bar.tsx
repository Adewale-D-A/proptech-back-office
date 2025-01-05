import { SyntheticEvent, useCallback, useState } from "react";
import PaperClip from "../../assets/icons/paper-clip";
import PaperplaneIcon from "../../assets/icons/paperplane";
import LoadingButton from "../button";
import useAxios from "../../useHooks/useAxios";

export default function SendBar({
  user_id,
  setSentHistory,
}: {
  user_id: string;
  setSentHistory: Function;
}) {
  const axios = useAxios();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendMessage = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      try {
        setIsSending(false);
        const response = await axios.post(`/admin/chat/send`, {
          message,
          user_id,
        });
        setSentHistory((prev: { message: string }[]) => [
          ...prev,
          { message: message },
        ]);
      } catch (error) {
      } finally {
        setIsSending(false);
      }
    },
    [message, user_id]
  );

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
            isLoading={isSending}
            label="Send"
            endIcon={<PaperplaneIcon />}
          />
        </div>
      </form>
    </div>
  );
}

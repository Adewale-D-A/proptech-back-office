import { useAppSelector } from "../../stores/hooks";
import { chatHistory } from "../../types/apiData/chat";
import formatDate, { formatTime } from "../../utils/isoDateConverter";

export default function MessageItemIdentifier({
  messageItem,
}: {
  messageItem: chatHistory;
}) {
  const { user: authUser } = useAppSelector(
    (state) => state.userAuthentication.value
  );
  return (
    <div
      className={`w-full flex ${
        authUser?.id === messageItem?.user_id ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`p-2 rounded-md ${
          authUser?.id === messageItem?.user_id
            ? "bg-primary/15"
            : "bg-primary/5"
        }`}
      >
        <p className=" max-w-60">{messageItem?.message}</p>
        <div>
          <span className=" text-xs text-gray-400 italic">
            {formatDate(messageItem?.created_at)}
          </span>
          <span className=" text-xs text-gray-400 italic">
            {formatTime(messageItem?.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
}

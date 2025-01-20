import DoubleCheckIcon from "../../assets/icons/double-check";
import { chatList } from "../../types/apiData/chat";
import { formatTime } from "../../utils/isoDateConverter";
import NotifierNumber from "../status/notifierNumber";

export default function InboxCard({
  isActive,
  variant = "dm",
  groupName,
  conversation,
  setChatId,
}: {
  isActive: boolean;
  variant?: "group-chat" | "dm";
  groupName?: string;
  conversation: chatList;
  setChatId: (id: any) => void;
}) {
  return (
    <div className=" border-b py-1">
      <button
        onClick={() => setChatId(conversation?.id)}
        className={`w-full flex  gap-2 justify-between rounded-lg p-2 ${
          isActive ? "bg-primary/5" : ""
        } `}
      >
        <div className=" flex items-center gap-2">
          <img
            src={"/logo_blue.png"}
            alt="avatar"
            className=" object-cover rounded-full size-10 aspect-square"
          />
          <div className=" w-full">
            <h6 className=" font-semibold">
              {variant === "dm"
                ? conversation?.last_message?.sender
                : groupName}
            </h6>
            <div className=" flex items-center gap-1">
              {false && (
                <DoubleCheckIcon className=" min-w-5 size-5 text-blue-500" />
              )}
              <span className=" overflow-ellipsis line-clamp-1 text-gray-500 text-sm">
                {variant === "dm"
                  ? conversation?.last_message?.message
                  : `${conversation?.last_message?.sender}: ${conversation?.last_message?.message}`}
              </span>
            </div>
          </div>
        </div>
        <div className=" flex flex-col justify-between items-end">
          <span className=" text-xs text-gray-500 whitespace-nowrap">
            {formatTime(conversation?.created_at)}
          </span>
          {!true && <NotifierNumber number={0} variant="urgent" />}
        </div>
      </button>
    </div>
  );
}

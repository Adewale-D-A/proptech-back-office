import DoubleCheckIcon from "../../assets/icons/double-check";
import NotifierNumber from "../status/notifierNumber";

export default function InboxCard({
  isActive,
  read,
  image,
  groupName,
  username,
  message,
  time,
  unread,
  variant = "dm",
}: {
  isActive: boolean;
  read: boolean;
  image: string;
  groupName?: string;
  username: string;
  message: string;
  time: string;
  unread: number;
  variant?: "group-chat" | "dm";
}) {
  return (
    <div className=" border-b py-1">
      <div
        className={`w-full flex  gap-2 justify-between rounded-lg p-2 ${
          isActive ? "bg-primary/5" : ""
        } `}
      >
        <div className=" flex items-center gap-2">
          <img
            src={image || "/logo_blue.png"}
            alt="avatar"
            className=" object-cover rounded-full size-10 aspect-square"
          />
          <div className=" w-full">
            <h6 className=" font-semibold">
              {variant === "dm" ? username : groupName}
            </h6>
            <div className=" flex items-center gap-1">
              {read && (
                <DoubleCheckIcon className=" min-w-5 size-5 text-blue-500" />
              )}
              <span className=" overflow-ellipsis line-clamp-1 text-gray-500 text-sm">
                {variant === "dm" ? message : `${username}: ${message}`}
              </span>
            </div>
          </div>
        </div>
        <div className=" flex flex-col justify-between items-end">
          <span className=" text-xs text-gray-500 whitespace-nowrap">
            {time}
          </span>
          {!read && <NotifierNumber number={unread} variant="urgent" />}
        </div>
      </div>
    </div>
  );
}

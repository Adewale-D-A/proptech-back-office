import { Link } from "react-router-dom";

export default function NotificationItem({
  url,
  image,
  name,
  actionMessage,
  resourceName,
  time,
  read,
}: {
  url: string;
  image: string;
  name: string;
  actionMessage: string;
  resourceName: string;
  time: string;
  read: boolean;
}) {
  return (
    <Link to={url} className=" flex items-start gap-4 py-4 border-b px-2">
      <div className=" flex items-center gap-2">
        <div
          className={`min-h-2 min-w-2 ${
            read ? " bg-white" : " bg-red-500"
          } rounded-full`}
        ></div>
        <img src={image} className=" rounded-full w-8 h-8" />
      </div>
      <div className=" flex flex-col">
        <p className=" text-sm text-gray-600">
          <span className=" font-semibold">{name}</span>{" "}
          <span>{actionMessage}</span>{" "}
          <span className=" font-semibold">{resourceName}</span>
        </p>
        <span className=" text-gray-400 text-xs">{time}</span>
      </div>
    </Link>
  );
}

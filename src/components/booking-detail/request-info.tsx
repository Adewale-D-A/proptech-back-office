import UserPlusIcon from "../../assets/icons/user-plus";
import formatDate from "../../utils/isoDateConverter";
import Status from "../status";

export default function RequestInformation({
  addCost,
  request_details,
}: {
  addCost?: boolean;
  request_details: {
    subject: string;
    description: string;
    created_at: string;
    is_escalated: number;
    status: string;
  };
}) {
  return (
    <div className=" w-full bg-gray-100 rounded-md">
      <h4 className=" font-semibold p-3 text-md flex items-center gap-2">
        <UserPlusIcon /> <span>Request Details</span>{" "}
      </h4>
      <div className=" w-full border-t p-3 text-xs flex flex-col gap-3">
        {[
          {
            id: 1,
            header: addCost ? "Service Type" : "Request Type",
            value: request_details?.subject || "",
          },
          {
            id: 2,
            header: "Description",
            value: request_details?.description || "",
          },
          {
            id: 3,
            header: "Date of Request",
            value: formatDate(request_details?.created_at || "") || "",
          },
          {
            id: 4,
            header: "Escalated Status",
            value: request_details?.is_escalated > 0 ? "Yes" : "No",
          },
        ].map((item) => (
          <div
            key={item?.id}
            className=" w-full flex items-center justify-between gap-5"
          >
            <span className=" text-gray-500">{item?.header}</span>
            <span className=" font-semibold">{item?.value}</span>
          </div>
        ))}
        <div className=" w-full flex items-center justify-between gap-5">
          <span className=" text-gray-500">Status</span>
          <span className=" font-semibold">
            <Status status={request_details?.status} />
          </span>
        </div>
        {addCost && (
          <div className=" w-full flex items-center justify-between gap-5">
            <span className=" text-gray-500">Cost of Service</span>
            <span className=" font-semibold">---</span>
          </div>
        )}
      </div>
    </div>
  );
}

import UserPlusIcon from "../../assets/icons/user-plus";
import Status from "../status";

export default function RequestInformation({ addCost }: { addCost?: boolean }) {
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
            value: "Internet",
          },
          {
            id: 2,
            header: "Description",
            value: "Internet not working",
          },
          {
            id: 3,
            header: "Date of Request",
            value: "24-06-2024",
          },
          {
            id: 4,
            header: "Escalated Status",
            value: "Yes",
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
            <Status status="Resolved" />
          </span>
        </div>
        {addCost && (
          <div className=" w-full flex items-center justify-between gap-5">
            <span className=" text-gray-500">Cost of Service</span>
            <span className=" font-semibold">N15,000.00</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ClosedMaintenanceRequest({
  status,
  reason,
}: {
  status: string;
  reason: string;
}) {
  return (
    <div className=" w-full p-3 bg-red-100 rounded-md py-4">
      <h4 className=" font-semibold text-lg text-red-500">
        {status.toUpperCase()}
      </h4>
      <p className=" text-sm text-gray-500">
        This maintenance request has been closed due to:{" "}
        <span className=" p-2 rounded-md bg-red-300 text-white font-semibold">
          {reason}
        </span>
      </p>
    </div>
  );
}

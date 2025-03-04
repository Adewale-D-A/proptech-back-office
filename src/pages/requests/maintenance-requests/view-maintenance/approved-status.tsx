import DoubleCheckIcon from "../../../../assets/icons/double-check";

export default function ApprovedStatus({
  status,
  reason,
}: {
  status: string;
  reason: string;
}) {
  return (
    <div className=" w-full p-3 bg-primary/15 rounded-md py-4">
      <h4 className=" font-semibold text-lg text-primary">
        {status.toUpperCase()}
      </h4>
      <p className=" text-sm text-gray-500 flex items-center gap-3">
        <span>This maintenance request has been approved</span>
        <DoubleCheckIcon className=" text-primary h-6 w-6" />
      </p>
    </div>
  );
}

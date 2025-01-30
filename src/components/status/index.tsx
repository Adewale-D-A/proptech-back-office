export default function Status({
  status,
  booleanVal,
  falsyMessage,
  truthyMessage,
}: {
  status: string | undefined;
  booleanVal?: boolean;
  falsyMessage?: string;
  truthyMessage?: string;
}) {
  return (
    <div className=" text-xs font-medium whitespace-nowrap">
      {status?.toLocaleLowerCase().includes("not") ||
      status?.toLocaleLowerCase().includes("cancel") ? (
        <span className=" p-1 px-3 bg-red-500/15 text-red-500 rounded-full">
          {status}
        </span>
      ) : status?.toLocaleLowerCase().includes("confirmed") ||
        status?.toLocaleLowerCase().includes("ailable") ||
        status?.toLocaleLowerCase().includes("resolved") ||
        status?.toLocaleLowerCase().includes("success") ||
        status?.toLocaleLowerCase().includes("complete") ||
        status?.toLocaleLowerCase().includes("occupied") ||
        status?.toLocaleLowerCase().includes("boarded") ||
        status?.toLocaleLowerCase().includes("paid") ||
        booleanVal ? (
        <span className=" p-1 px-3 bg-green-500/15 text-green-500 rounded-full">
          {truthyMessage || status}
        </span>
      ) : status?.toLocaleLowerCase().includes("approved") ? (
        <span className=" p-1 px-3 bg-blue-500/15 text-blue-500 rounded-full">
          {truthyMessage || status}
        </span>
      ) : (
        <span className=" p-1 px-3 bg-yellow-500/15 text-yellow-500 rounded-full">
          {falsyMessage || status}
        </span>
      )}
    </div>
  );
}

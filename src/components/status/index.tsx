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
    <div className=" text-xs whitespace-nowrap">
      {status?.toLocaleLowerCase().includes("not") ||
      status?.toLocaleLowerCase().includes("cancel") ||
      !booleanVal ? (
        <span className=" p-1 px-3 bg-red-500/15 text-red-500 rounded-full">
          {!booleanVal ? falsyMessage : status}
        </span>
      ) : status?.toLocaleLowerCase().includes("confirmed") ||
        status?.toLocaleLowerCase().includes("ailable") ||
        status?.toLocaleLowerCase().includes("resolved") ||
        status?.toLocaleLowerCase().includes("success") ||
        status?.toLocaleLowerCase().includes("complete") ||
        booleanVal ? (
        <span className=" p-1 px-3 bg-green-500/15 text-green-500 rounded-full">
          {booleanVal ? truthyMessage : status}
        </span>
      ) : (
        <span className=" p-1 px-3 bg-yellow-500/15 text-yellow-500 rounded-full">
          {status}
        </span>
      )}
    </div>
  );
}

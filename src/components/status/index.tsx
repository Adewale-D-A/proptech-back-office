export default function Status({ status }: { status: string | undefined }) {
  return (
    <div>
      {status?.toLocaleLowerCase().includes("not") ? (
        <span className=" p-1 px-3 bg-red-500/15 text-red-500 rounded-full text-sm">
          {status}
        </span>
      ) : status?.toLocaleLowerCase().includes("ailable") ? (
        <span className=" p-1 px-3 bg-green-500/15 text-green-500 rounded-full text-sm">
          {status}
        </span>
      ) : (
        <span className=" p-1 px-3 bg-yellow-500/15 text-yellow-500 rounded-full text-sm">
          {status}
        </span>
      )}
    </div>
  );
}

export default function NotifierNumber({
  number,
  variant = "normal",
}: {
  number: number;
  variant?: "normal" | "urgent";
}) {
  return (
    <>
      {number > 0 && (
        <div
          className={`aspect-square p-1 ${
            variant === "urgent"
              ? "bg-red-500 min-w-5 min-h-5 text-xs "
              : "bg-primary min-w-6 min-h-6 text-sm "
          } rounded-full w-fit flex items-center justify-center  text-white`}
        >
          <span>{number > 9 ? "9+" : number}</span>
        </div>
      )}
    </>
  );
}

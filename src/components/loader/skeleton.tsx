import { cn } from "../../utils/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-neutral-400 dark:bg-gray-800",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

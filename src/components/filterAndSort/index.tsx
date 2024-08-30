import Sort from "./sort";
import Filter from "./filter";

export default function FilterSort({
  sortId,
  sortLabel,
}: {
  sortId: string;
  sortLabel: string;
}) {
  return (
    <div className=" flex items-center gap-3 text-sm text-gray-500">
      <Filter />
      <Sort id={sortId} label={sortLabel} />
    </div>
  );
}

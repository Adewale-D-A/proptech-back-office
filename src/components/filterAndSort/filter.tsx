export default function Filter() {
  return (
    <div className=" flex items-center gap-1">
      <span className=" text-nowrap">Filter by:</span>
      <div className=" flex items-center gap-2 border p-4 rounded-lg">
        <input type="date" title="start date" /> {" - "}
        <input type="date" title="end date" />
      </div>
    </div>
  );
}

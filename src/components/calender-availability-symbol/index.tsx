export default function CalendarAvailabilitySymbol() {
  return (
    <div className=" flex items-center justify-center gap-4">
      <div className=" flex gap-2 items-center">
        <div className=" h-5 w-5 aspect-square bg-green-500 rounded-sm"></div>
        <span>Booked Date</span>
      </div>
      <div className=" flex gap-2 items-center">
        <div className=" h-5 w-5 aspect-square bg-gray-400 rounded-sm"></div>
        <span>Available Date</span>
      </div>
    </div>
  );
}

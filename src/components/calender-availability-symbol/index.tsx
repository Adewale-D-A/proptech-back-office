export default function CalendarAvailabilitySymbol() {
  return (
    <div className=" flex items-center justify-center gap-4">
      <div className=" flex gap-2 items-center">
        <div className=" h-5 w-5 aspect-square bg-gray-200 rounded-sm relative overflow-hidden">
          <div className=" absolute top-0 right-0 aspect-square border-l-4 border-l-transparent border-b-4 border-b-transparent border-4 border-green-500"></div>
        
        </div>{" "}
        <span>Booked Date</span>
      </div>
      <div className=" flex gap-2 items-center">
        <div className=" h-5 w-5 aspect-square bg-gray-200 rounded-sm relative overflow-hidden"></div>
        <span>Available Date</span>
      </div>
    </div>
  );
}

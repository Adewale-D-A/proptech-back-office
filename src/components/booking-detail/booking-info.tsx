export default function BookingInfo() {
  return (
    <div className=" w-full bg-gray-100 rounded-md">
      <h4 className=" font-semibold p-3 text-md">Booking Details</h4>
      <div className=" w-full border-t p-3 text-xs flex flex-col gap-3">
        {[
          {
            id: 1,
            header: "Room Name",
            value: "Island Court",
          },
          {
            id: 2,
            header: "VAT-ID",
            value: "N-13812312",
          },
          {
            id: 3,
            header: "No of Guests",
            value: "4 Guests",
          },
          {
            id: 4,
            header: "Check-in Date",
            value: "26/06/24",
          },
          {
            id: 5,
            header: "Check-in Date",
            value: "27/06/24(1 Night)",
          },
          {
            id: 6,
            header: "Created On",
            value: "25/06/24, 17:56",
          },
        ].map((item) => (
          <div
            key={item?.id}
            className=" w-full flex items-center justify-between gap-5"
          >
            <span className=" text-gray-500">{item?.header}</span>
            <span className=" font-semibold">{item?.value}</span>
          </div>
        ))}
        <div className=" w-full flex items-center justify-between gap-5 border-t py-4">
          <span className="">Total</span>
          <span className=" font-semibold text-primary text-lg">N70,000</span>
        </div>
      </div>
    </div>
  );
}

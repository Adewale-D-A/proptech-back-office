import { bookingsById } from "../../types/apiData/bookings";
import formatDate, { formatTime } from "../../utils/isoDateConverter";

export default function BookingInfo({ data }: { data: bookingsById }) {
  return (
    <div className=" w-full bg-gray-100 rounded-md">
      <h4 className=" font-semibold p-3 text-md">Booking Details</h4>
      <div className=" w-full border-t p-3 text-xs flex flex-col gap-3">
        {[
          {
            id: 1,
            header: "Room Name",
            value: data?.shortlet?.name,
          },
          {
            id: 2,
            header: "VAT-ID",
            value: "****",
          },
          {
            id: 3,
            header: "No of Guests",
            value: `${data?.number_of_guests} Guests`,
          },
          {
            id: 4,
            header: "Check-in Date",
            value: formatDate(data?.check_in_date),
          },
          {
            id: 5,
            header: "Check-out Date",
            value: formatDate(data?.check_out_date),
          },
          {
            id: 6,
            header: "Created On",
            value: `${formatDate(data?.created_at)} ${formatTime(
              data?.created_at
            )}`,
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
          <span className=" font-semibold text-primary text-lg">
            {data?.currency} {data?.total_price}
          </span>
        </div>
      </div>
    </div>
  );
}

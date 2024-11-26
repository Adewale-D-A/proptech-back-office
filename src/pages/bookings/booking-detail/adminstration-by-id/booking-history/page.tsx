import { useParams } from "react-router-dom";
import useGetBookingHistoryById from "../../../../../services-hooks/bookings/useGetBookingHistoryById";

export default function BookingHistory() {
  const { id } = useParams();
  const { data, isFailed, setIsFailed, isLoading } =
    useGetBookingHistoryById(id);

  return (
    <div className=" p-3 border-t">
      <table className=" w-full text-xs overflow-x-auto">
        <thead className="">
          <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
            {[
              "Event Title",
              "Date of Event",
              "Description",
              "Total Paid",
              "Booking Total",
            ].map((head) => (
              <th key={head}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {data.map((item) => {
            return (
              <tr key={item?.id} className=" border-b">
                <td>{item?.name}</td>
                <td></td>
                <td>{item?.message}</td>
                <td className=" font-semibold"></td>
                <td className="font-semibold"></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

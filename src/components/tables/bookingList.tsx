import { Link, useParams } from "react-router-dom";
import Status from "../status";
import { apartmentById } from "../../types/apiData/apartment";
import { bookingsById } from "../../types/apiData/bookings";
import formatDate from "../../utils/isoDateConverter";
import { useCallback, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";

type props = {
  //   header,
  //   data,
  // }: {
  //   header: string[];
  //   data: {
  //     id: string,
  //     customerName: string,
  //     apartnmentName: string,
  //     bookingDate: string,
  //     noOfRooms: string,
  //     amount: string,
  //     checkIn: string,
  //     checkOut: string,
  //     status: string,
  //   }[];
};
export default function BookingByIdList({ data }: { data: bookingsById }) {
  const { id } = useParams();
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const [confirming, setConfirming] = useState(false);
  const confirmReservation = useCallback(async () => {
    setConfirming(true);
    try {
      await axios.put(`/admin/booking/status/${id}`, {
        status: "Confirmed",
      });
      dispatch(
        openSnackbar({
          message: "Reervation succefully confirmed",
          isError: false,
        })
      );
    } catch (error) {
    } finally {
      setConfirming(false);
    }
  }, [id]);
  return (
    <table className=" w-full text-xs overflow-x-auto">
      <thead className="">
        <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
          {[
            "ID",
            "Customer Name",
            "Date of Booking",
            "No of Rooms",
            "Amount",
            "Check-in Date",
            "Check-out Date",
            "Status",
            "Action",
          ].map((head) => (
            <th key={head}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody className="">
        {[
          {
            id: data?.id,
            customerName: `${data?.user?.first_name} ${data?.user?.last_name}`,
            apartnmentName: data?.shortlet?.name,
            bookingDate: formatDate(data?.created_at),
            noOfRooms: data?.shortlet?.no_of_bedrooms,
            amount: `${data?.currency} ${data?.total_price}`,
            checkIn: formatDate(data?.check_in_date),
            checkOut: formatDate(data?.check_out_date),
            status: data?.payment_status,
          },
        ].map((request, index) => {
          return (
            <tr key={request?.id} className=" border-b">
              <td>{request?.id}</td>
              <td>{request?.customerName}</td>
              <td>{request?.bookingDate}</td>
              <td>{request?.noOfRooms}</td>
              <td>{request?.amount}</td>
              <td>{request?.checkIn}</td>
              <td>{request?.checkOut}</td>
              <td>
                <Status status={request?.status} />
              </td>
              <td className=" group relative">
                <span className=" p-2 text-lg">...</span>
                <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                  <button
                    type="button"
                    className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                  >
                    Resend Email
                  </button>
                  <Link
                    to={`/bookings/booking-details/edit-reservation/${request?.id}`}
                    className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                  >
                    Edit Reservation
                  </Link>
                  <Link
                    to={`#`}
                    className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                  >
                    View In Front Site
                  </Link>
                  {/* <button
                    type="button"
                    className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                  >
                    Delete Reservation
                  </button> */}
                  <button
                    type="button"
                    onClick={() => confirmReservation()}
                    className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                  >
                    Set To Be Confirmed
                  </button>
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

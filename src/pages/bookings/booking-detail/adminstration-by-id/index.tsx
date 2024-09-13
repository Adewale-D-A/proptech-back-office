import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../stores/hooks";
import { useLayoutEffect } from "react";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import CalendarIcon from "../../../../assets/icons/calendar";
import Status from "../../../../components/status";

const breadCrumb = [
  {
    url: "/bookings",
    label: "Bookings",
    icon: <CalendarIcon />,
  },
  {
    url: "#",
    label: "Administration",
    icon: "",
  },
];
export default function BookingAdministrationById() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Bookings Details Administration",
        pageDescription: "Bookings details administration",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" p-3 rounded-lg border">
          <table className=" w-full text-xs">
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
                  id: "asasas",
                  customerName: "Jola Samson",
                  apartnmentName: "Sunshine - 2 Bedroom",
                  bookingDate: "15-02-2024",
                  noOfRooms: "4 Rooms",
                  amount: "N150,000",
                  checkIn: "15-02-2024",
                  checkOut: "15-02-2024",
                  status: "Confirmed",
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
                          to={`/edit-apartment/apartment-details/${request?.id}`}
                          className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit Reservation
                        </Link>
                        <Link
                          to={`/apartment-caledar/${request?.id}`}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          View In Front Site
                        </Link>
                        <button
                          type="button"
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete Reservation
                        </button>
                        <button
                          type="button"
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
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className=" w-full flex flex-col gap-4 border rounded-md">
            {/* Assign Customer */}
            <h4 className="text-lg font-semibold border-b p-3">
              Assign Customer
            </h4>
          </div>
          <div className=" w-full rounded-md border flex flex-col gap-3"></div>
        </div>
      </div>
    </section>
  );
}

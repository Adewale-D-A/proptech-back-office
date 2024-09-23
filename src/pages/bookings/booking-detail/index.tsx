import CalendarIcon from "../../../assets/icons/calendar";
import SuitcaseIcon from "../../../assets/icons/suitcase";
import BookingTab from "../../../components/tab/bookingTab";
import BookingAdministrationById from "./adminstration-by-id";
import BookingDetailsById from "./booking-by-id";

export default function BookingById() {
  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <BookingTab
          header={[
            { id: 1, icon: <CalendarIcon />, label: "Booking Details" },
            { id: 2, icon: <SuitcaseIcon />, label: "Administations" },
          ]}
          content={[
            {
              id: 1,
              data: <BookingDetailsById />,
            },
            {
              id: 2,
              data: <BookingAdministrationById />,
            },
          ]}
        />
      </div>
    </section>
  );
}

import { Outlet, useParams } from "react-router-dom";
import CalendarIcon from "../../assets/icons/calendar";
import SuitcaseIcon from "../../assets/icons/suitcase";
import NavTab from "../../components/tab/nav-tab";

export default function BookingDetailTabWrapper() {
  const { id } = useParams();
  const tabList = [
    {
      id: 1,
      icon: <CalendarIcon />,
      label: "Booking Details",
      url: `/bookings/booking-details/${id}`,
    },
    {
      id: 2,
      icon: <SuitcaseIcon />,
      label: "Administrations",
      url: `/bookings/adminstration/booking-details/${id}`,
    },
  ];
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <Outlet />
    </section>
  );
}

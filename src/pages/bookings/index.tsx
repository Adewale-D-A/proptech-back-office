import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";
import BookingTab from "../../components/tab/bookingTab";
import MenuIcon from "../../assets/icons/menu";
import CalendarIcon from "../../assets/icons/calendar";
import UserPlusIcon from "../../assets/icons/user-plus";
import BookingsOverview from "./bookings-overview";
import BookingsCalendar from "./bookings-calendar";
import AllBookings from "./all-bookings";
import Requests from "./requests";
import { useSearchParams } from "react-router-dom";
import AvailabilityOverview from "./availability-overview";

const breadCrumb = [
  {
    url: "#",
    label: "Bookings",
    icon: <CalendarIcon />,
  },
];
export default function Bookings() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const queryTab = searchParams.get("page");
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Bookings",
        pageDescription: "Bookings",
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
        <BookingTab
          defaultIndex={queryTab === "requests" ? 4 : 0}
          header={[
            { id: 1, icon: <MenuIcon />, label: "Overview" },
            { id: 2, icon: <CalendarIcon />, label: "Calendar" },
            { id: 3, icon: <CalendarIcon />, label: "Availability Overview" },
            { id: 4, icon: <CalendarIcon />, label: "All Bookings" },
            { id: 5, icon: <UserPlusIcon />, label: "Request" },
          ]}
          content={[
            {
              id: 1,
              data: <BookingsOverview />,
            },
            {
              id: 2,
              data: <BookingsCalendar />,
            },
            {
              id: 3,
              data: <AvailabilityOverview/>,
            },
            {
              id: 4,
              data: <AllBookings />,
            },
            {
              id: 5,
              data: <Requests />,
            },
          ]}
        />
      </div>
    </section>
  );
}

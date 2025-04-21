import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import CalendarIcon from "../../../assets/icons/calendar";
import ApartmentCalendarView from "../../../components/calendar/apartment-calendar-view";
import SplitArrowIcon from "../../../assets/icons/split-arrow";
import { useSearchParams } from "react-router-dom";

const breadCrumb = [
  {
    url: "/bookings/overview",
    label: "Bookings",
    icon: <CalendarIcon />,
  },
  {
    url: "#",
    label: "New Booking",
    icon: "",
  },
];
export default function NewBookings() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "New Booking",
        pageDescription: "Create a new booking",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <div className=" flex flex-col gap-3">
      {searchParams?.get("type") === "split_stay_booking" && (
        <div className=" w-full bg-primary rounded-lg p-5 text-center text-white flex items-center justify-center">
          <div className=" font-bold flex items-center gap-3">
            <SplitArrowIcon className="size-10 rotate-45" />{" "}
            <h3>Split stay - First Apartment Booking</h3>
          </div>
        </div>
      )}
      <ApartmentCalendarView />
      {searchParams?.get("type") === "split_stay_booking" && (
        <div className=" w-full bg-primary rounded-lg p-5 text-center text-white flex flex-col items-center justify-center">
          <div className=" font-bold flex items-center gap-3">
            <SplitArrowIcon className="size-10 rotate-45" />{" "}
            <h3>Split stay - Second Apartment Booking</h3>
          </div>
          <ApartmentCalendarView type={2} />
        </div>
      )}
    </div>
  );
}

import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";
import CalendarIcon from "../../assets/icons/calendar";
import BookingsOverview from "./bookings-overview";
import { useSearchParams } from "react-router-dom";

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
  return <BookingsOverview />;
}

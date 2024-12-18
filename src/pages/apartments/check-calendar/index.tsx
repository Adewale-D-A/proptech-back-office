import { useLayoutEffect } from "react";
import BuildingIcon from "../../../assets/icons/building";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ApartmentCalendarView from "../../../components/calendar/apartment-calendar-view";

const breadCrumb = [
  {
    url: "/apartments/view-all",
    label: "Apartments",
    icon: <BuildingIcon />,
  },
  {
    url: "#",
    label: "Check Calendar",
    icon: "",
  },
];
export default function CheckCalendar() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Check Calendar",
        pageDescription: "Check apartment's calendar",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return <ApartmentCalendarView />;
}

import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ClipBoardIcon from "../../../assets/icons/clipboard";
import BookingsReportListTable from "../../../components/tables/reports/bookings-report";

const breadCrumb = [
  {
    url: "#",
    label: "Booking Report",
    icon: <ClipBoardIcon />,
  },
];
export default function BookingsReport (){
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Booking report",
        pageDescription: "Booking report",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
    return (
        <div className=" w-full">
          <BookingsReportListTable/>
        </div>
    )
}
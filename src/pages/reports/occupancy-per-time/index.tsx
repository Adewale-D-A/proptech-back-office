import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ClipBoardIcon from "../../../assets/icons/clipboard";
import OccupanyTimeReportListTable from "../../../components/tables/occupancyTimeReportList";

const breadCrumb = [
  {
    url: "/reports/revenue",
    label: "Report Revenue",
    icon: <ClipBoardIcon />,
  },
  {
    url: "#",
    label: "Occupancy per time",
    icon: <ClipBoardIcon />,
  },
];
export default function OccupancyPerTimeReport() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Occupancy per time",
        pageDescription: "occupancy per time report",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <section className="w-full">
      <OccupanyTimeReportListTable />
    </section>
  );
}

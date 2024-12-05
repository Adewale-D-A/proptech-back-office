import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ClipBoardIcon from "../../../assets/icons/clipboard";
import OccupancyRankingReportTable from "../../../components/tables/reports/occupancy-ranking";

const breadCrumb = [
  {
    url: "/reports/revenue",
    label: "Report Revenue",
    icon: <ClipBoardIcon />,
  },
  {
    url: "#",
    label: "Occupancy Ranking",
    icon: <ClipBoardIcon />,
  },
];
export default function OccupancyRankingReport() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Occupancy Ranking",
        pageDescription: "Occupancy ranking",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  return (
    <section className="w-full">
      <OccupancyRankingReportTable />
    </section>
  );
}

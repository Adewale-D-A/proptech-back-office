import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ClipBoardIcon from "../../../assets/icons/clipboard";
import DailyRoomReportListTable from "../../../components/tables/dailyRoomReportList";

const breadCrumb = [
  {
    url: "/reports/revenue",
    label: "Report Revenue",
    icon: <ClipBoardIcon />,
  },
  {
    url: "#",
    label: "Daily room",
    icon: <ClipBoardIcon />,
  },
];

export default function DailyRoomReport() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Daily Room Reports",
        pageDescription: "Daily room reports",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <section className="w-full">
      <DailyRoomReportListTable />
    </section>
  );
}

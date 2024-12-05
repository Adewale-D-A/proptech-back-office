import { useLayoutEffect, useState } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ClipBoardIcon from "../../../assets/icons/clipboard";
import ReportListTable from "../../../components/tables/report";

const breadCrumb = [
  {
    url: "#",
    label: "Report",
    icon: <ClipBoardIcon />,
  },
];
export default function RevenueReport() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Revenue Reports",
        pageDescription: "Revenue reports",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const [reportType, setReportType] = useState("");
  const [viewType, setViewType] = useState("");
  return (
    <section className="w-full">
      <ReportListTable type={reportType} view={viewType} />
    </section>
  );
}

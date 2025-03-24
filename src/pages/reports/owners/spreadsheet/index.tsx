import { useLayoutEffect } from "react";
import BillIcon from "../../../../assets/icons/bill";
import { useAppDispatch } from "../../../../stores/hooks";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import OwnersReportTabSwitch from "../tab-switch";
import OwnersReportFilterOptions from "../filter-options";
import OwnersReportSpreadsheetTableList from "../../../../components/tables/reports/owners-report-spreadsheet";

const breadCrumb = [
  {
    url: "#",
    label: "Owners Report",
    icon: <BillIcon />,
  },
];
export default function OwnersReportSpreadsheet() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Owners Report Spreadsheet",
        pageDescription: "Owners report spreadsheet",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  return (
    <div className="w-full flex flex-col gap-10">
      <OwnersReportTabSwitch state="spreasheet" />
      <OwnersReportFilterOptions />
      <OwnersReportSpreadsheetTableList />
    </div>
  );
}

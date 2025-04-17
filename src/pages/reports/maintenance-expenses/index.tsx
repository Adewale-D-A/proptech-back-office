import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ClipBoardIcon from "../../../assets/icons/clipboard";
import MaintenanceExpensesReportListTable from "../../../components/tables/reports/maintenance-expenses-report";

const breadCrumb = [
  {
    url: "#",
    label: "Maintenance Expenses Report",
    icon: <ClipBoardIcon />,
  },
];
export default function MaintenanceExpenses() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Maintenance Expenses",
        pageDescription: "Maintenance expenses",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  return (
    <div className=" w-full">
      <MaintenanceExpensesReportListTable />
    </div>
  );
}

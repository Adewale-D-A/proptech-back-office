import { useLayoutEffect } from "react";
import BillIcon from "../../../../assets/icons/bill";
import { useAppDispatch } from "../../../../stores/hooks";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import OwnersReportTabSwitch from "../tab-switch";
import DashboardCard from "../../../../components/cards/dashboard-cards";
import OwnersReportSummaryTableList from "../../../../components/tables/reports/owners-report-summary";
import useGetOwnersReportMetrics from "../../../../services-hooks/useGetOwnersReportMetrics";
import currencyFormat from "../../../../utils/currency-formatter";

const breadCrumb = [
  {
    url: "#",
    label: "Owners Report",
    icon: <BillIcon />,
  },
];
export default function OwnersReportSummary() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Owners Report Summary",
        pageDescription: "Owners report summary",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  const { data } = useGetOwnersReportMetrics();
  return (
    <div className="w-full flex flex-col gap-10">
      <OwnersReportTabSwitch state="summary" />
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            id: 1,
            icon: <BillIcon className="w-5 h-5" />,
            label: "Total Expenses",
            value: currencyFormat(data?.total_expenses || 0),
            theme: "text-[#2A3F8F] bg-[#2A3F8F]/20",
            url: { src: "#", label: `N 0.00 vs previous month` },
          },
          {
            id: 2,
            icon: <BillIcon className="w-5 h-5" />,
            label: "Revenues Generated",
            value: currencyFormat(data?.total_revenue || 0),
            theme: "text-[#DC6803] bg-[#DC6803]/20",
            url: { src: "#", label: `N 0.00 vs previous month` },
          },
          {
            id: 3,
            icon: <BillIcon className="w-5 h-5" />,
            label: "Profit Accumulated",
            value: currencyFormat(data?.total_profit || 0),
            theme: "text-[#039855] bg-[#039855]/20",
            url: { src: "#", label: `N 0.00 vs previous month` },
          },
        ].map((item) => (
          <DashboardCard
            key={item?.id}
            theme={item.theme}
            icon={item?.icon}
            label={item?.label}
            value={item?.value}
            // urlSrc={item?.url.src}
            urlLabel={item?.url?.label}
          />
        ))}
      </div>
      <OwnersReportSummaryTableList />
    </div>
  );
}

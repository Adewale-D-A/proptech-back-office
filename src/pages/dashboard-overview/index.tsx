import { useCallback, useLayoutEffect, useState } from "react";
import { useAppDispatch } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";

import BuildingIcon from "../../assets/icons/building";
import CalendarIcon from "../../assets/icons/calendar";
import UsersIcon from "../../assets/icons/users";
import UserPlusIcon from "../../assets/icons/user-plus";
import DashboardCard from "../../components/cards/dashboard-cards";
import BarChart from "../../components/charts/bar-chart";
import { DoughnutChart } from "../../components/charts/doughnut";
import ApartmentTable from "../../components/tables/apartments";
import MenuIcon from "../../assets/icons/menu";
import useGetServicesBreakdown from "../../services-hooks/dashboards/useGetServicesBreakdown";
import useGetSalesAnalytics from "../../services-hooks/dashboards/useGetSalesAnalytics";
import Sort from "../../components/filterAndSort/sort";
import Filter from "../../components/filterAndSort/filter";
import useGetSalesChannels from "../../services-hooks/dashboards/useGetSalesChannels";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";

const breadCrumb = [
  {
    url: "#",
    label: "Dashboard",
    icon: <MenuIcon />,
  },
];
export default function DashboardOverview() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Dashboard",
        pageDescription: "Dashboard",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [filterSalesChannelDates, setFilterSalesChannelDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  // service breakdown
  const { data } = useGetServicesBreakdown();
  // sales analytics
  const {
    data: { stats },
  } = useGetSalesAnalytics({
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
  });
  // sales channels
  const { data: pieChart } = useGetSalesChannels({
    start_date: filterSalesChannelDates?.start_date,
    end_date: filterSalesChannelDates?.end_date,
  });

  const handleSalesFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );
  const handleSalesChannelFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterSalesChannelDates({ start_date, end_date });
    },
    []
  );
  const { data: dashboard } = useGetResourceAccessChecker({
    resource: "admin-dashboard",
  });
  return (
    <section className="w-full flex flex-col items-center">
      {dashboard?.view ? (
        <div className="w-full max-w-screen-xl flex flex-col gap-16">
          <h2 className=" text-2xl font-semibold">Services Breakdown</h2>
          {/* sales breakdown cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              {
                id: 1,
                icon: <BuildingIcon className="w-5 h-5" />,
                label: "Number of Apartment",
                value: data?.number_of_shortlets,
                theme: "text-[#26397B] bg-[#26397B]/20",
                url: { src: "/apartments/view-all", label: "View Apartment" },
              },
              {
                id: 2,
                icon: <CalendarIcon className="w-5 h-5" />,
                label: "Total Bookings",
                value: `${data?.number_of_bookings} Bookings`,
                theme: "text-[#35BD29] bg-[#35BD29]/20",
                url: { src: "/bookings/view-all", label: "View Bookings" },
              },
              {
                id: 3,
                icon: <UserPlusIcon className="w-5 h-5" />,
                label: "Additional Requests",
                value: `${data?.no_of_additional_request} Requests`,
                theme: "text-[#017EFF] bg-[#017EFF]/20",
                url: { src: "/bookings/requests", label: "View Requests" },
              },
              {
                id: 4,
                icon: <UsersIcon className="w-5 h-5" />,
                label: "Number of Guests",
                value: `${data?.number_of_guests} Guests`,
                theme: "text-[#7C0DBE] bg-[#7C0DBE]/20",
                url: { src: "/customers", label: "View Users" },
              },
            ].map((item) => (
              <DashboardCard
                key={item?.id}
                theme={item.theme}
                icon={item?.icon}
                label={item?.label}
                value={item?.value}
                urlSrc={item?.url.src}
                urlLabel={item?.url?.label}
              />
            ))}
          </div>
          {/* sales analytics */}

          <div className="w-full rounded-lg border">
            <div className=" w-full border-b p-4 flex items-start gap-3 md:items-center justify-between flex-col md:flex-row ">
              <h2 className="text-lg font-semibold">Sales Analytics</h2>
              <div className=" flex items-center flex-col md:flex-row gap-3 text-sm text-gray-500">
                <Filter actionHandler={handleSalesFiltering} />
                <Sort id={"sales-analytics"} label={"Sort by:"} />
              </div>
            </div>
            <div className=" p-5 md:p-10">
              <div className=" border p-5 rounded-md h-full w-full flex justify-center">
                <BarChart
                  data={{
                    labels: [
                      "JAN",
                      "FEB",
                      "MAR",
                      "APR",
                      "MAY",
                      "JUN",
                      "JUL",
                      "AUG",
                      "SEP",
                      "OCT",
                      "NOV",
                      "DEC",
                    ],
                    datasets: [
                      {
                        label: "Sales Analytics",
                        data: stats,
                        backgroundColor: "#2E4393",
                        indexAxis: "x",
                        borderRadius: 50,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>

          {/* top countries and sales channel */}
          <div className=" w-full gap-5 grid grid-cols-1">
            {/* <div className="w-full rounded-lg border">
            <div className=" w-full border-b p-4">
              <h2 className="text-lg font-semibold">Top Countries</h2>
            </div>
            <div className="w-full p-5 flex justify-center h-full">
              <BarChart
                data={{
                  labels: [
                    "582 | 🇳🇬 Nigeria",
                    "482 | 🇺🇸 United States",
                    "402 | 🇬🇧 Unted Kingdom",
                    "350 | 🇨🇦 Canada",
                    "350 | 🇦🇺 Australia",
                  ],
                  datasets: [
                    {
                      label: "Top Countries",
                      data: [582, 482, 402, 350, 350],
                      backgroundColor: "#2E4393",
                      indexAxis: "y",
                      borderRadius: 50,
                    },
                  ],
                }}
              />
            </div>
          </div> */}

            <div className=" w-full rounded-lg border">
              <div className=" w-full border-b p-4 flex flex-start flex-col md:flex-row gap-3 md:items-center justify-between">
                <h2 className="text-lg font-semibold">Sales Channel</h2>
                <div className=" flex items-center gap-3 text-sm text-gray-500">
                  <Filter actionHandler={handleSalesChannelFiltering} />
                </div>
              </div>
              <div className="w-full p-5 flex justify-center">
                <div className=" max-w-screen-sm">
                  <DoughnutChart
                    data={{
                      labels: pieChart.map((item) => item?.channel) || [
                        "Website",
                      ],
                      datasets: [
                        {
                          label: "",
                          data: pieChart.map((item) => item?.percentage) || [0],
                          backgroundColor: ["#FFA500", "#2E4393"],
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Total  */}
          <div className="w-full">
            <div className=" w-full my-3">
              <h2 className="text-lg font-semibold">Totals</h2>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 2,
                  icon: <CalendarIcon className="w-5 h-5" />,
                  label: "Total Gross Income",
                  value: "N0",
                  theme: "text-[#35BD29] bg-[#35BD29]/20",
                },
                {
                  id: 3,
                  icon: <UserPlusIcon className="w-5 h-5" />,
                  label: "Total After Commissions",
                  value: "N0",
                  theme: "text-[#017EFF] bg-[#017EFF]/20",
                },
                {
                  id: 4,
                  icon: <UsersIcon className="w-5 h-5" />,
                  label: "Total Net Income",
                  value: "N0",
                  theme: "text-[#7C0DBE] bg-[#7C0DBE]/20",
                },
              ].map((item) => (
                <DashboardCard
                  key={item?.id}
                  theme={item.theme}
                  icon={item?.icon}
                  label={item?.label}
                  value={item?.value}
                />
              ))}
            </div>
          </div>

          {/* top apartment table */}
          <ApartmentTable title="Top Apartments" />
        </div>
      ) : (
        <div className=" w-full px-5 flex items-center justify-center bg-primary/15 rounded-lg h-[calc(100vh-300px)]">
          <h1 className=" text-2xl md:text-5xl text-center font-semibold text-gray-400 italic">
            Welcome to 99Apartment Admin
          </h1>
        </div>
      )}
    </section>
  );
}

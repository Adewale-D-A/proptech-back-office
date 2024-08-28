import { useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";

import BuildingIcon from "../../assets/icons/building";
import CalendarIcon from "../../assets/icons/calendar";
import UsersIcon from "../../assets/icons/users";
import UserPlusIcon from "../../assets/icons/user-plus";
import DashboardCard from "../../components/cards/dashboard-cards";
import BarChart from "../../components/charts/bar-chart";
import { DoughnutChart } from "../../components/charts/doughnut";

const breadCrumb = [
  {
    url: "#",
    label: "Dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3 h-3"
      >
        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
      </svg>
    ),
  },
];
export default function DashboardOverview() {
  const dispatch = useAppDispatch();

  const { data: userProfile } = useAppSelector(
    (state) => state.userProfile.value
  );
  const [openNewRequestModal, setOpenNewRequestModal] = useState(false);

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

  return (
    <section className="w-full flex flex-col gap-10">
      <h2 className=" text-2xl font-semibold">Services Breakdown</h2>
      {/* sales breakdown cards */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            id: 1,
            icon: <BuildingIcon className="w-5 h-5" />,
            label: "Number of Apartment",
            value: "200",
            theme: "text-[#26397B] bg-[#26397B]/20",
            url: { src: "#", label: "View Apartment" },
          },
          {
            id: 2,
            icon: <CalendarIcon className="w-5 h-5" />,
            label: "Total Bookings",
            value: "50 Bookings",
            theme: "text-[#35BD29] bg-[#35BD29]/20",
            url: { src: "#", label: "View Bookings" },
          },
          {
            id: 3,
            icon: <UserPlusIcon className="w-5 h-5" />,
            label: "Additional Requests",
            value: "50 Requests",
            theme: "text-[#017EFF] bg-[#017EFF]/20",
            url: { src: "#", label: "View Requests" },
          },
          {
            id: 4,
            icon: <UsersIcon className="w-5 h-5" />,
            label: "Number of Guests",
            value: "500 Guests",
            theme: "text-[#7C0DBE] bg-[#7C0DBE]/20",
            url: { src: "#", label: "View Users" },
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

      <div className="h-full w-full rounded-lg border">
        <div className=" w-full border-b p-4">
          <h2 className="text-lg font-semibold">Sales Analytics</h2>
        </div>
        <div className=" border p-5 rounded-md m-5">
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
                  data: [1.5, 1.9, 2.5, 3.5, 4.5, 4.5, 6.6, 7.5, 0, 0, 0, 0, 0],
                  backgroundColor: "#2E4393",
                  indexAxis: "x",
                  borderRadius: 50,
                },
              ],
            }}
          />
        </div>
      </div>

      {/* top countries and sales channel */}
      <div className=" w-full flex gap-5 flex-col md:flex-row items-stretch">
        <div className="w-full  flex-1 md:flex-[0.6] rounded-lg border">
          <div className=" w-full border-b p-4">
            <h2 className="text-lg font-semibold">Top Countries</h2>
          </div>
          <div className="p-5 m-5">
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
        </div>

        <div className=" w-full flex-1 md:flex-[0.4] rounded-lg border">
          <div className=" w-full border-b p-4">
            <h2 className="text-lg font-semibold">Sales Channel</h2>
          </div>
          <div className="p-5 m-5">
            <DoughnutChart
              data={{
                labels: ["Website/IBE", "OTA Commission"],
                datasets: [
                  {
                    label: "",
                    data: [30, 70],
                    backgroundColor: ["#FFA500", "#2E4393"],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>

      {/* Total  */}
      <div className="w-full">
        <div className=" w-full my-3">
          <h2 className="text-lg font-semibold">Totals</h2>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: 2,
              icon: <CalendarIcon className="w-5 h-5" />,
              label: "Total Gross Income",
              value: "N419,585,309.78",
              theme: "text-[#35BD29] bg-[#35BD29]/20",
            },
            {
              id: 3,
              icon: <UserPlusIcon className="w-5 h-5" />,
              label: "Total After Commissions",
              value: "N419,585,309.78",
              theme: "text-[#017EFF] bg-[#017EFF]/20",
            },
            {
              id: 4,
              icon: <UsersIcon className="w-5 h-5" />,
              label: "Total Net Income",
              value: "N419,585,309.79",
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
    </section>
  );
}

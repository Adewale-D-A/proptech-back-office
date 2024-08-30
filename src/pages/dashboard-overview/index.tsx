import { useLayoutEffect } from "react";
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
import Filter from "../../components/filterAndSort";
import MenuIcon from "../../assets/icons/menu";

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

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-16">
        <h2 className=" text-2xl font-semibold">Services Breakdown</h2>
        {/* sales breakdown cards */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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

        <div className="w-full rounded-lg border">
          <div className=" w-full border-b p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Sales Analytics</h2>
            <Filter sortId="top-apartment" sortLabel="Sort by:" />
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
                      data: [
                        1.5, 1.9, 2.5, 3.5, 4.5, 4.5, 6.6, 7.5, 0, 0, 0, 0, 0,
                      ],
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
        <div className=" w-full gap-5 grid grid-cols-1 lg:grid-cols-2">
          <div className="w-full rounded-lg border">
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
          </div>

          <div className=" w-full rounded-lg border">
            <div className=" w-full border-b p-4">
              <h2 className="text-lg font-semibold">Sales Channel</h2>
            </div>
            <div className="w-full p-5 flex justify-center">
              <div className=" max-w-screen-sm">
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

        {/* top apartment table */}
        <ApartmentTable
          header={[
            "S/N",
            "Apartment Info",
            "Price per Night",
            "Last Booking",
            "Total Bookings",
            "Availability Status",
            "Action",
          ]}
          data={[
            {
              id: 1,
              apartmentInfo: {
                name: "Sunshine -3 Bedroom",
                image: "/logo_blue.png",
                location: "Lekki Phase II",
              },
              pricePerNight: "N 100,000",
              lastBooking: "28 Mar, 2014 5:33 AM",
              totalBookings: "10",
              availabilityStatus: "Available",
            },
            {
              id: 2,
              apartmentInfo: {
                name: "Moonlight - 1 Bedroom",
                image: "/logo_blue.png",
                location: "Surulere axis",
              },
              pricePerNight: "N 150,000",
              lastBooking: "29 August, 2024 12:00 AM",
              totalBookings: "15",
              availabilityStatus: "Not Available",
            },
          ]}
          title="Top Apartments"
        />
      </div>
    </section>
  );
}

import { useCallback, useState } from "react";
import BuildingIcon from "../../assets/icons/building";
import CalendarIcon from "../../assets/icons/calendar";
import UserPlusIcon from "../../assets/icons/user-plus";
import WeatherIcon from "../../assets/icons/weather";
import useGetBookingForecast from "../../services-hooks/bookings/useGetBookingForecast";
import DashboardCard from "../cards/dashboard-cards";
import { DoughnutChart } from "../charts/doughnut";
import Filter from "../filterAndSort/filter";

const today = new Date();
const todayString = new Date()?.toISOString()?.slice(0, 10);
const nextMonthString = new Date(today?.getFullYear(), today?.getMonth() + 2, 0)
  ?.toISOString()
  ?.slice(0, 10);

export default function ForecastDash() {
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>({
    start_date: todayString,
    end_date: nextMonthString,
  });
  const { data, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetBookingForecast({
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
    });

  const handleSalesFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );

  return (
    <div className=" w-full flex flex-col gap-4 border rounded-md">
      <div className="flex  flex-col md:flex-row items-center justify-between gap-2 border-b p-3">
        <h4 className="text-lg font-semibold  flex items-center gap-2">
          <WeatherIcon /> <span>Forecast</span>{" "}
        </h4>
        <div className=" w-fit">
          <Filter actionHandler={handleSalesFiltering} />
        </div>
      </div>
      <div className=" p-3 flex flex-col gap-3 justify-center items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[
            {
              id: 1,
              icon: <BuildingIcon className="w-5 h-5" />,
              label: "Occupancy Rate",
              value: `${data?.occupancy_rate || 0}%`,
              theme: "text-[#26397B] bg-[#26397B]/20",
              url: { src: "#", label: "View Apartment" },
            },
            {
              id: 2,
              icon: <CalendarIcon className="w-5 h-5" />,
              label: "Total Bookings",
              value: `${data?.total_bookings || 0} Bookings`,
              theme: "text-[#35BD29] bg-[#35BD29]/20",
              url: { src: "#", label: "View Bookings" },
            },
            {
              id: 3,
              icon: <UserPlusIcon className="w-5 h-5" />,
              label: "Nights Booked",
              value: `${data?.nights_booked || 0} / ${
                data?.nights_available || 0
              }`,
              theme: "text-[#017EFF] bg-[#017EFF]/20",
              url: { src: "#", label: "View Requests" },
            },
          ].map((item) => (
            <DashboardCard
              key={item?.id}
              theme={item.theme}
              icon={item?.icon}
              label={item?.label}
              value={item?.value}
              urlLabel={item?.url?.label}
            />
          ))}

          <div className="w-full flex shadow-md  border p-4 rounded-xl justify-center h-52">
            <DoughnutChart
              data={{
                labels: ["Occupied", "Available"],
                datasets: [
                  {
                    label: "",
                    data: [data?.nights_booked, data?.nights_available],
                    backgroundColor: ["#08AD40", "#F56132"],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

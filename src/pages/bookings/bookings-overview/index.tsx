import { useCallback, useState } from "react";
import CalendarIcon from "../../../assets/icons/calendar";
import PlaneIcon from "../../../assets/icons/plane";
import PlusIcon from "../../../assets/icons/plus";
import UsersIcon from "../../../assets/icons/users";
import LinkButton from "../../../components/button/linkButton";
import CalendarView from "../../../components/calendar";
import CalendarAvailabilitySymbol from "../../../components/calender-availability-symbol";
import CheckAvailability from "../../../components/check-availability";
import Filter from "../../../components/filterAndSort/filter";
import BookingsListTable from "../../../components/tables/bookingsLists";
import BarChart from "../../../components/charts/bar-chart";
import RoomOccupancyListTable from "../../../components/tables/roomOccupancy";
import ForecastDash from "../../../components/forecasting-dash";
import CalculatedAvailabilityOptions from "../../../components/check-availability/calculated-option";
import { availabilityOptions } from "../../../types/apiData/availabilityOptions";
import { apartmentById } from "../../../types/apiData/apartment";
import useGetApartmentCalendar from "../../../services-hooks/apartmentCalendar";
import useGetVisitorCount from "../../../services-hooks/bookings/useGetVisitorCOunter";
import useGetWeeklyBookingCount from "../../../services-hooks/bookings/useGetWeeklyBookingCount";
import formatDate from "../../../utils/isoDateConverter";
import ApartmentSingleSearch from "../../../components/inputs/search/apartment-single-search";

export default function BookingsOverview() {
  const [selectedAprt, setSelectedApt] = useState<apartmentById>({} as any);
  const [availabilityResponse, setAvailabilityResponse] =
    useState<availabilityOptions>();

  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();

  const { data: weekly_booking } = useGetWeeklyBookingCount({
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
  });

  const handleWeklybookingFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );
  // calendar data fetching based on filtered dates
  const { data } = useGetApartmentCalendar({
    id: String(selectedAprt?.id || ""),
  });
  const { data: visitorCount } = useGetVisitorCount();
  const handleDateClick = useCallback((date: Date) => {}, []);

  return (
    <div className=" w-full flex flex-col gap-5 my-5">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <div className=" flex flex-col gap-5">
          <div className=" rounded-md border">
            <h4 className="text-lg font-semibold border-b p-3 flex items-center gap-2">
              <UsersIcon /> <span>Visitors Counter</span>{" "}
            </h4>
            <div className="w-full grid grid-cols-2">
              {[
                {
                  id: 1,
                  value: visitorCount?.visitors_today,
                  label: "Visitors today",
                },
                {
                  id: 2,
                  value: visitorCount?.visitors_this_month,
                  label: "Visitors this month",
                },
                {
                  id: 3,
                  value: visitorCount?.visitors_last_month,
                  label: "Visitors last month",
                },
                {
                  id: 4,
                  value: `${visitorCount?.turnout || ""}%`,
                  label: "Turnout",
                },
              ].map((item) => (
                <div
                  key={item?.id}
                  className=" flex items-start gap-3 border-b border-r p-3"
                >
                  <UsersIcon className=" w-8 h-8" />
                  <div>
                    <h4 className=" text-2xl font-semibold">{item?.value}</h4>
                    <span className=" text-sm text-gray-500">
                      {item?.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-md border">
            <h4 className="text-lg font-semibold border-b p-3 flex items-center gap-2">
              <CalendarIcon /> <span>Check Availability</span>{" "}
            </h4>
            <div className=" p-3 flex flex-col gap-4">
              <CheckAvailability />
            </div>
          </div>
          {/* TODO: Uncomment out when the suggested apartments response is available of "Check Availability" endpoint */}
          {/* Available apartmnets suggestions and split stays suggestions */}
          {<CalculatedAvailabilityOptions />}
        </div>
        <div className=" w-full flex flex-col gap-4 border rounded-md">
          {/* Bookings Calendar */}
          <div className="flex items-center justify-between gap-2 border-b p-3">
            <h4 className="text-lg font-semibold  flex items-center gap-2">
              <CalendarIcon /> <span>Bookings Calendar</span>
            </h4>
            <div className=" w-fit">
              <LinkButton
                url="/bookings/new-booking"
                label="New Booking"
                startIcon={<PlusIcon />}
              />
            </div>
          </div>
          <div className=" px-3 flex flex-col gap-3 justify-center items-center">
            <div className="w-full flex flex-col gap-3">
              <ApartmentSingleSearch
                placeholder="Apartment name..."
                selected={selectedAprt}
                setSelected={setSelectedApt}
              />
            </div>
            <CalendarAvailabilitySymbol />
            {data.blocked_dates && (
              <CalendarView
                date={new Date()}
                booked={data?.booked_dates || []}
                blocked={data?.blocked_dates || []}
                // highlights={[...data?.booked_dates, ...data?.blocked_dates]}
                onDateClick={handleDateClick}
              />
            )}
          </div>
        </div>
        {/* upcoming reservations */}
        <BookingsListTable
          label="Upcoming Reservation"
          variant="status"
          type="upcoming"
          icon={<CalendarIcon />}
        />
        {/* latest reservations  */}
        <BookingsListTable
          label="Latest Reservations"
          variant="status"
          type="latest"
          icon={<CalendarIcon />}
        />
        {/* arriving */}
        <BookingsListTable
          label="Arriving"
          variant="action"
          type="arriving"
          icon={<PlaneIcon className=" h-6 w-6 rotate-45" />}
        />
        {/* latest reservations  */}
        <BookingsListTable
          label="Departing"
          variant="action"
          type="departing"
          icon={<PlaneIcon />}
        />
      </div>

      {/* forecast */}
      <ForecastDash />
      {/* bookings chart */}
      <div className=" w-full flex flex-col gap-4 border rounded-md">
        <div className="flex  flex-col md:flex-row items-center justify-between gap-2 border-b p-3">
          <h4 className="text-lg font-semibold  flex items-center gap-2">
            <CalendarIcon /> <span>This Week's Bookings</span>{" "}
          </h4>
          <div className=" w-fit">
            <Filter actionHandler={handleWeklybookingFiltering} />
          </div>
        </div>
        <div className=" p-5 md:p-10">
          <div className=" border p-5 rounded-md h-full w-full flex justify-center">
            <BarChart
              data={{
                labels: weekly_booking?.map((item) => formatDate(item?.date)),
                datasets: [
                  {
                    label: "Weekly Bookings",
                    data: weekly_booking?.map((item) => item?.count),
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
      {/* room occupancy */}
      <div className=" w-full flex flex-col gap-4 border rounded-md">
        <div className="flex  flex-col md:flex-row items-center justify-between gap-2 border-b p-3">
          <h4 className="text-lg font-semibold">Today's Room Occupancy</h4>
          {/* <div className=" max-w-sm">
            <Search id="apartment-search" placeholder="Apartment name..." />
          </div> */}
        </div>
        <div className=" p-3">
          <RoomOccupancyListTable />
        </div>
      </div>
    </div>
  );
}

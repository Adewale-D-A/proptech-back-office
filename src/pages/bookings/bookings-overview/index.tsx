import CalendarIcon from "../../../assets/icons/calendar";
import PlaneIcon from "../../../assets/icons/plane";
import PlusIcon from "../../../assets/icons/plus";
import UsersIcon from "../../../assets/icons/users";
import LinkButton from "../../../components/button/linkButton";
import CalendarView from "../../../components/calendar";
import CalendarAvailabilitySymbol from "../../../components/calender-availability-symbol";
import CheckAvailability from "../../../components/check-availability";
import Filter from "../../../components/filterAndSort/filter";
import Sort from "../../../components/filterAndSort/sort";
import Search from "../../../components/inputs/search";
import BookingsListTable from "../../../components/tables/bookingsLists";
import BarChart from "../../../components/charts/bar-chart";
import RoomOccupancyListTable from "../../../components/tables/roomOccupancy";
import ForecastDash from "../../../components/forecasting-dash";

export default function BookingsOverview() {
  return (
    <div className=" w-full flex flex-col gap-5 my-5">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className=" flex flex-col gap-5">
          <div className=" rounded-md border">
            <h4 className="text-lg font-semibold border-b p-3 flex items-center gap-2">
              <UsersIcon /> <span>Visitors Counter</span>{" "}
            </h4>
            <div className="w-full grid grid-cols-2">
              {[
                {
                  id: 1,
                  value: "12",
                  label: "Visitors today",
                },
                {
                  id: 2,
                  value: "579",
                  label: "Visitors this month",
                },
                {
                  id: 3,
                  value: "450",
                  label: "Visitors last month",
                },
                {
                  id: 4,
                  value: "+35.6%",
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
            <div className=" p-3">
              <CheckAvailability variant={2} />
            </div>
          </div>
        </div>
        <div className=" w-full flex flex-col gap-4 border rounded-md">
          {/* Bookings Calendar */}
          <div className="flex items-center justify-between gap-2 border-b p-3">
            <h4 className="text-lg font-semibold  flex items-center gap-2">
              <CalendarIcon /> <span>Bookings Calendar</span>{" "}
            </h4>
            <div className=" w-fit">
              <LinkButton
                url="#"
                label="New Booking"
                startIcon={<PlusIcon />}
              />
            </div>
          </div>
          <div className=" px-3 flex flex-col gap-3 justify-center items-center">
            <div className="w-full">
              <Search id="apartment-search" placeholder="Apartment name..." />
            </div>
            <CalendarView />
            <CalendarAvailabilitySymbol />
          </div>
        </div>
        {/* upcoming reservations */}
        <div className=" w-full flex flex-col gap-4 border rounded-md">
          <div className="flex  flex-col md:flex-row items-center justify-between gap-2 border-b p-3">
            <h4 className="text-lg font-semibold  flex items-center gap-2">
              <CalendarIcon /> <span>Upcoming Reservations</span>{" "}
            </h4>
            <div className=" w-fit">
              <Filter />
            </div>
          </div>
          <div className=" px-3 flex flex-col gap-3 justify-center items-center">
            <BookingsListTable
              header={["ID", "Customer Name", "Rooms", "Check-in", "Status"]}
              data={[
                {
                  id: "axss12",
                  customerName: "John Doe",
                  rooms: "Tranquil Tavaern",
                  checkIn: "2023-03-01",
                  status: "Confirmed",
                },
                {
                  id: "sasfsa",
                  customerName: "John Doe",
                  rooms: "Tranquil Tavaern",
                  checkIn: "2023-03-01",
                  status: "Confirmed",
                },
                {
                  id: "sasaa",
                  customerName: "John Doe",
                  rooms: "Tranquil Tavaern",
                  checkIn: "2023-03-01",
                  status: "Stand-by",
                },
              ]}
              variant="status"
            />
          </div>
        </div>
        {/* latest reservations  */}
        <div className=" w-full flex flex-col gap-4 border rounded-md">
          <div className="flex items-center justify-between gap-2 border-b p-3">
            <h4 className="text-lg font-semibold  flex items-center gap-2">
              <CalendarIcon /> <span>Latest Reservations</span>{" "}
            </h4>
            <div className=" w-fit">
              <Sort id="sort-by" label="sort-by" />
            </div>
          </div>
          <div className=" px-3 flex flex-col gap-3 justify-center items-center">
            <BookingsListTable
              header={["ID", "Customer Name", "Rooms", "Check-in", "Status"]}
              data={[
                {
                  id: "axss12",
                  customerName: "John Doe",
                  rooms: "Tranquil Tavaern",
                  checkIn: "2023-03-01",
                  status: "Confirmed",
                },
                {
                  id: "sasfsa",
                  customerName: "John Doe",
                  rooms: "Tranquil Tavaern",
                  checkIn: "2023-03-01",
                  status: "Confirmed",
                },
                {
                  id: "sasaa",
                  customerName: "John Doe",
                  rooms: "Tranquil Tavaern",
                  checkIn: "2023-03-01",
                  status: "Confirmed",
                },
              ]}
              variant="status"
            />
          </div>
        </div>
        {/* arriving */}
        <div className=" w-full flex flex-col gap-4 border rounded-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 border-b p-3">
            <h4 className="text-lg font-semibold  flex items-center gap-2">
              <PlaneIcon className=" h-6 w-6 rotate-45" /> <span>Arriving</span>{" "}
            </h4>
            <div className=" w-fit">
              <Filter />
            </div>
          </div>
          <div className=" px-3 flex flex-col gap-3 justify-center items-center">
            <BookingsListTable
              header={["ID", "Customer Name", "Rooms", "Check-Out", "Action"]}
              data={[
                {
                  id: "axss12",
                  customerName: "John Doe",
                  rooms: "Tranquil Tavaern",
                  checkIn: "2023-03-01",
                  status: "N/A",
                },
                {
                  id: "sasfsa",
                  customerName: "John Doe",
                  rooms: "Tranquil Tavaern",
                  checkIn: "2023-03-01",
                  status: "N/A",
                },
                {
                  id: "sasaa",
                  customerName: "John Doe",
                  rooms: "Tranquil Tavaern",
                  checkIn: "2023-03-01",
                  status: "N/A",
                },
              ]}
              variant="action"
            />
          </div>
        </div>
        {/* latest reservations  */}
        <div className=" w-full flex flex-col gap-4 border rounded-md">
          <div className="flex  flex-col md:flex-row items-center justify-between gap-2 border-b p-3">
            <h4 className="text-lg font-semibold  flex items-center gap-2">
              <PlaneIcon /> <span>Departing</span>{" "}
            </h4>
            <div className=" w-fit">
              <Filter />
            </div>
          </div>
          <div className=" px-3 flex flex-col gap-3 justify-center items-center">
            <BookingsListTable
              header={["ID", "Customer Name", "Rooms", "Check-Out", "Action"]}
              data={[
                {
                  id: "axss12",
                  customerName: "John Doe",
                  rooms: "Tranquil Tavaern",
                  checkIn: "2023-03-01",
                  status: "N/A",
                },
                {
                  id: "sasfsa",
                  customerName: "John Doe",
                  rooms: "Tranquil Tavaern",
                  checkIn: "2023-03-01",
                  status: "N/A",
                },
                {
                  id: "sasaa",
                  customerName: "John Doe",
                  rooms: "Tranquil Tavaern",
                  checkIn: "2023-03-01",
                  status: "N/A",
                },
              ]}
              variant="action"
            />
          </div>
        </div>
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
            <Filter />
          </div>
        </div>
        <div className=" p-5 md:p-10">
          <div className=" border p-5 rounded-md h-full w-full flex justify-center">
            <BarChart
              data={{
                labels: [
                  "MONDAY, 17 SEPT",
                  "TUESDAY, 18 SEPT",
                  "WEDNESDAY, 19 SEPT",
                  "THURSDAY, 20 SEPT",
                  "FRIDAY, 21 SEPT",
                  "SATURDAY, 22 SEPT",
                  "SUNDAY, 23 SEPT",
                ],
                datasets: [
                  {
                    label: "Weekly Bookings",
                    data: [3, 3, 2, 5, 6, 8, 12],
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
          <div className=" max-w-sm">
            <Search id="apartment-search" placeholder="Apartment name..." />
          </div>
        </div>
        <div className=" p-3">
          <RoomOccupancyListTable
            header={[
              "S/N",
              "Apartment Name",
              "Customer Name",
              "Amount Paid",
              "Check-in Date",
              "Check-out Date",
            ]}
            data={[
              {
                id: "1",
                apartmentName: "Sunshine - 2 Bedroom",
                customerName: "Ibrahim Johnson",
                amount: "N116,000",
                checkIn: "2023-09-17",
                checkOut: "2023-09-18",
              },
              {
                id: "2",
                apartmentName: "Sunshine - 2 Bedroom",
                customerName: "Ibrahim Johnson",
                amount: "N116,000",
                checkIn: "2023-09-17",
                checkOut: "2023-09-18",
              },
              {
                id: "3",
                apartmentName: "Sunshine - 2 Bedroom",
                customerName: "Ibrahim Johnson",
                amount: "N116,000",
                checkIn: "2023-09-17",
                checkOut: "2023-09-18",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

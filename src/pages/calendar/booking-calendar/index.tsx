import { useLayoutEffect, useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import CalendarIcon from "../../../assets/icons/calendar";
import BookMarkIcon from "../../../assets/icons/book-mark";
import Filter from "../../../components/filterAndSort/filter";
import CalendarView from "../../../components/calendar";
import CalendarAvailabilitySymbol from "../../../components/calender-availability-symbol";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import dateRangeIterator from "../../../utils/dateRangeIterator";
import useGetApartmentCalendar from "../../../services-hooks/apartmentCalendar";
import ApartmentThroughBuildingSelector from "../../../components/inputs/select/apartment-through-building-selector";
import { formatDateToString } from "../../../utils/isoDateConverter";
// import useGetLocationGroupings from "../../../services-hooks/apartment/useGetLocationGroupings";

const breadCrumb = [
  {
    url: "#",
    label: "Calendar",
    icon: <CalendarIcon />,
  },
  {
    url: "#",
    label: "Booking",
    icon: <BookMarkIcon />,
  },
];

const today = new Date();
const todayString = formatDateToString(new Date());
const nextMonthString = formatDateToString(
  new Date(today?.getFullYear(), today?.getMonth() + 6, 0)
);

export default function ApartmentCalendarPage() {
  const dispatch = useAppDispatch();

  // component states
  const [apartmentId, setApartmentId] = useState("");
  const [buildingId, setBuildingId] = useState("");
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>({
    start_date: todayString,
    end_date: nextMonthString,
  });

  const [calendarVewData, setCalendarViewData] = useState<Date[]>([]);

  // calendar data fetching based on filtered dates
  const { data, isLoading, isFailed, retryFunction, setIsFailed } =
    useGetApartmentCalendar({
      id: buildingId ? String(apartmentId || "") : undefined,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
    });
  // const { data: locationGroups } = useGetLocationGroupings({
  //   page: 1,
  //   limit: 1000,
  // });

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Booking Calendar",
        pageDescription: "Booking calendar",
        isLoading: isLoading,
        failedToLoad: isFailed,
        setFailedToLoad: setIsFailed,
        retryRequest: retryFunction,
      })
    );
  }, [isLoading, isFailed, setIsFailed, retryFunction]);
  //spread date range into objects for the calendar view to render
  const extractCalendarViewData = useCallback(() => {
    if (filterDates?.start_date && filterDates?.end_date) {
      const result = dateRangeIterator({
        start_date: filterDates?.start_date,
        end_date: filterDates?.end_date,
      });
      if (result?.success) {
        setCalendarViewData(result?.dataset);
      } else {
        dispatch(
          openSnackbar({
            message: result?.message,
            isError: true,
          })
        );
      }
    }
  }, [filterDates]);

  useEffect(() => {
    extractCalendarViewData();
  }, [filterDates]);
  //spread date range into objects for the calendar view to render

  // click handlers
  const handleSalesFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );

  const handleDateClick = useCallback((date: Date) => {}, []);
  return (
    <div>
      <div className=" w-full rounded-md border flex-1 md:flex-[0.7] flex flex-col gap-3">
        <div className=" flex items-center justify-between flex-col md:flex-row gap-3 border-b  p-2">
          <h4 className="text-xl font-semibold flex items-center gap-2">
            <CalendarIcon /> <span>Apartment Calendar</span>
          </h4>
          <div className="w-full max-w-screen-md flex items-center flex-col md:flex-row gap-2">
            <ApartmentThroughBuildingSelector
              setApartmentId={setApartmentId}
              apartmentId={apartmentId}
              buildingId={buildingId}
              setBuildingId={setBuildingId}
              withLabel={false}
            />
          </div>
          <Filter actionHandler={handleSalesFiltering} />
        </div>
        <div className=" w-full flex justify-center gap-2">
          <CalendarAvailabilitySymbol />
        </div>
        <div className="w-full p-2 flex flex-col gap-5">
          {calendarVewData?.length > 0 && (
            <div className="w-full flex justify-center flex-col gap-5">
              <div className="w-full flex flex-wrap gap-8 gap-y-16 justify-right items-start">
                {calendarVewData?.map((item, index) => (
                  <div key={item?.toString()} className=" border-r px-3">
                    <CalendarView
                      key={item?.toString() || index}
                      date={new Date(item || "")}
                      booked={data?.booked_dates || []}
                      blocked={data?.blocked_dates || []}
                      onDateClick={handleDateClick}
                      allowNaviagtor={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

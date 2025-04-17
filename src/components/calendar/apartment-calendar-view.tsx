import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { closeAssignToCustomerView } from "../../stores/inAppDataInterations/assignCustomer";
import QuickReservationFlow from "../quickReservationFlow";
import CalendarIcon from "../../assets/icons/calendar";
import Filter from "../filterAndSort/filter";
import ImageCarousel from "../cards/image-carousel";
import CalendarAvailabilitySymbol from "../calender-availability-symbol";
import CalendarView from ".";
import ModalTemplate from "../modal";
import AssignCustomer from "../quickReservationFlow/assignToCustomer";
import useGetApartmentCalendar from "../../services-hooks/apartmentCalendar";
import dateRangeIterator from "../../utils/dateRangeIterator";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import { apartmentById } from "../../types/apiData/apartment";
import { useParams } from "react-router-dom";
import defaultCheckInDateTime from "../../config/default-check-in-date-time";

// const sampleBookedDates = [
//   new Date(2024, 8, 27),
//   new Date(2024, 8, 29),
//   new Date(2024, 8, 30),
// ];
const today = new Date();
const todayString = new Date()?.toISOString()?.slice(0, 10);
const nextMonthString = new Date(today?.getFullYear(), today?.getMonth() + 2, 0)
  ?.toISOString()
  ?.slice(0, 10);
const defaultDateTime = defaultCheckInDateTime();

export default function ApartmentCalendarView() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [selectedAprt, setSelectedApt] = useState<apartmentById>({} as any);
  const [defaultReservationsDateTime, setDefaultReservtionDateTime] = useState<{
    checkIn: string;
    checkOut: string;
    checkInTime: string;
    checkOutTime: string;
  }>();
  // store assigned customer state
  const { open: openAssignToCustomerView } = useAppSelector(
    (state) => state.assignCustomer.value
  );

  // component states
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>({
    start_date: todayString,
    end_date: nextMonthString,
  });
  const [calendarVewData, setCalendarViewData] = useState<Date[]>([]);

  // calendar data fetching based on filtered dates
  const { data, retryFunction } = useGetApartmentCalendar({
    id: String(selectedAprt?.id || id || ""),
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
  });

  // click handlers
  const handleSalesFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );

  const updateOpenState = useCallback((value: boolean) => {
    dispatch(closeAssignToCustomerView());
  }, []);
  // click handlers

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
    if (data?.blocked_dates) {
      extractCalendarViewData();
    }
  }, [data]);
  //spread date range into objects for the calendar view to render

  const handleDateClick = useCallback((date: Date) => {
    const toDate = new Date(
      date?.getFullYear(),
      date?.getMonth(),
      date?.getDate() + 1
    )
      .toISOString()
      ?.slice(0, 10);
    setDefaultReservtionDateTime((prev) => {
      return {
        checkIn: prev?.checkIn ? prev?.checkIn : toDate,
        checkOut: prev?.checkIn ? toDate : "",
        checkInTime: prev?.checkIn ? defaultDateTime?.check_in_time : "",
        checkOutTime: prev?.checkIn ? defaultDateTime?.check_out_time : "",
      };
    });
  }, []);
  return (
    <>
      <section className="w-full flex flex-col items-center my-5">
        <div className="w-full max-w-screen-xl flex flex-col gap-10">
          <div className="w-full flex flex-col md:flex-row gap-5 items-start">
            <div className=" w-full rounded-md border flex-1 md:flex-[0.3] flex flex-col gap-3">
              <h4 className="text-xl font-semibold border-b  p-2">
                Quick Reservation
              </h4>
              <div className="w-full p-2">
                <QuickReservationFlow
                  variant={2}
                  apartment_name={selectedAprt?.name || ""}
                  setSelectedApt={setSelectedApt}
                  defaultDateTime={defaultReservationsDateTime}
                  refetchCalendar={retryFunction}
                />
              </div>
            </div>
            <div className=" w-full rounded-md border flex-1 md:flex-[0.7] flex flex-col gap-3">
              <div className=" flex items-center justify-between flex-col md:flex-row gap-3 border-b  p-2">
                <h4 className="text-xl font-semibold flex items-center gap-2">
                  <CalendarIcon /> <span>Apartment Calendar</span>
                </h4>{" "}
                <Filter actionHandler={handleSalesFiltering} />
              </div>
              <div className="w-full p-2 flex flex-col gap-5">
                {selectedAprt?.images?.length > 0 && (
                  <ImageCarousel
                    images={selectedAprt?.images?.map((item) => ({
                      url: item?.path,
                    }))}
                  />
                )}
                {calendarVewData?.length > 0 && (
                  <div className="w-full flex justify-center flex-col gap-5">
                    <CalendarAvailabilitySymbol />
                    <div className="w-full flex flex-wrap gap-8 gap-y-16 justify-center items-start">
                      {calendarVewData?.map((item, index) => (
                        <div key={item?.toString()} className=" border-r px-3">
                          <CalendarView
                            date={new Date(item)}
                            booked={data?.booked_dates || []}
                            blocked={data?.blocked_dates || []}
                            onDateClick={handleDateClick}
                          />
                        </div>
                      ))}

                      {/* {
                        id: 1,
                        date: new Date(2024, 8, 1),
                        highlights: sampleBookedDates,
                      }, */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* make reservation */}
      <ModalTemplate
        open={openAssignToCustomerView}
        setOpen={updateOpenState}
        showXicon={openAssignToCustomerView}
        className={"max-w-md"}
        title={"Assign Customer"}
      >
        <div className="w-full">
          <AssignCustomer />
        </div>
      </ModalTemplate>
    </>
  );
}

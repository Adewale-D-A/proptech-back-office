import { useCallback, useEffect, useState } from "react";
import daysMonths from "../../assets/days-months.json";
import generateCalendarData from "../../utils/generateCalendarData";
import ChevronLeftIcon from "../../assets/icons/chevron-left";
import ChevronRightIcon from "../../assets/icons/chevron-right";
import { dateGeneratorUtilResponse } from "../../types/date-generator-util-response";
import { calendarDates } from "../../types/apiData/apartment/reformed-apartment-calendar";
// import NavigatePrevIcon from "../../assets/icons/navigate-prev";
// import NavigateNextIcon from "../../assets/icons/navigate-next";

// const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const sampleBookedDates = [new Date(2024, 8, 23), new Date(2024, 8, 22)];

const dateValue = new Date();
export default function CalendarView({
  date,
  highlights,
  notAvailable = [],
  booked = [],
  blocked = [],
  maintenance = [],
  allowNaviagtor = true,
  onDateClick,
}: {
  date?: Date;
  highlights?: Date[];
  notAvailable?: Date[];
  booked?: calendarDates[];
  blocked?: calendarDates[];
  maintenance?: Date[];
  allowNaviagtor?: boolean;
  onDateClick: (date: Date) => void;
}) {
  const [currentDay, setCurrentDay] = useState(date ? date : dateValue);

  const [currentDays, setCurrentDays] = useState<dateGeneratorUtilResponse[]>(
    []
  );

  const changeHandler = useCallback(
    (event: { year: number; month: number; day: number }) => {
      const selectedDate = new Date(event.year, event.month, event.day);
      setCurrentDay(selectedDate);
      onDateClick(selectedDate);
    },
    []
  );

  const generateDays = useCallback(() => {
    const daysArray = generateCalendarData({
      selectedDate: currentDay,
      highlights,
      notAvailable,
      booked,
      blocked,
      maintenance,
    });
    setCurrentDays(daysArray);
  }, [currentDay, highlights]);

  useEffect(() => {
    generateDays();
  }, [currentDay]);

  // automatically adjust calendar to highlight updates and changes
  useEffect(() => {
    setCurrentDay(date ? date : dateValue);
  }, [date]);

  const prevMonthHandler = useCallback(() => {
    setCurrentDay(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  }, []);

  const nextMonthHandler = useCallback(() => {
    setCurrentDay(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  }, []);

  return (
    <div>
      <div className=" flex justify-center items-center gap-3">
        {allowNaviagtor && (
          <button type="button" title="prev" onClick={() => prevMonthHandler()}>
            <ChevronLeftIcon />
          </button>
        )}
        <h1 className=" font-bold">
          {daysMonths?.months[currentDay.getMonth()]} {currentDay.getFullYear()}
        </h1>
        {allowNaviagtor && (
          <button type="button" title="prev" onClick={() => nextMonthHandler()}>
            <ChevronRightIcon />
          </button>
        )}
      </div>
      <div className=" grid grid-cols-7 gap-2  text-gray-500">
        {daysMonths?.days.map((day) => (
          <div key={day} className=" aspect-square p-1">
            <span>{day}</span>
          </div>
        ))}
      </div>
      <div className=" grid grid-cols-7 gap-2">
        {currentDays.map((item, index) => (
          <button
            type="button"
            title={
              item?.booked
                ? item?.booked_reason
                : item?.blocked
                ? `Date blocked due to: ${item?.blocked_reason}`
                : "Available"
            }
            key={index}
            className={`${
              item?.currentMonth ? "" : " opacity-20"
            } aspect-square p-1 bg-gray-100 rounded-md relative overflow-hidden`}
            onClick={() => changeHandler(item)}
            style={{
              backgroundColor: item?.booked
                ? item?.booked_hex_code
                : item?.blocked
                ? item?.blocked_hex_code
                : "#e5e7eb",
              color: item?.booked || item?.blocked ? "#FFFFFF" : "#000000",
            }}
          >
            <span className="text-shadow">{item?.day}</span>
            {!(item?.booked || item?.maintenance || item?.blocked) && (
              <div className=" absolute top-0 right-0 aspect-square border-l-8 border-l-transparent border-b-8 border-b-transparent border-8 border-green-500"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

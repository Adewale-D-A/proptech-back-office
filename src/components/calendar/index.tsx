import { useCallback, useEffect, useState } from "react";
import NavigatePrevIcon from "../../assets/icons/navigate-prev";
import NavigateNextIcon from "../../assets/icons/navigate-next";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const sampleBookedDates = [new Date(2024, 8, 23), new Date(2024, 8, 22)];

export default function CalendarView({
  date,
  highlights = sampleBookedDates,
}: {
  date?: Date;
  highlights?: Date[];
}) {
  const dateValue = new Date();
  const [currentDay, setCurrentDay] = useState(date ? date : dateValue);

  const [currentDays, setCurrentDays] = useState<
    {
      currentMonth: boolean;
      date: Date;
      month: number;
      day: number;
      selected: boolean;
      year: number;
      highlight: boolean;
    }[]
  >([]);

  const changeHandler = useCallback(
    (event: { year: number; month: number; day: number }) => {
      const selectedDate = new Date(event.year, event.month, event.day);
      setCurrentDay(selectedDate);
    },
    []
  );

  const generateDays = useCallback(() => {
    const daysArray = [];
    const firstDayOfMonth = new Date(
      currentDay?.getFullYear(),
      currentDay?.getMonth(),
      1
    );
    const weekdayOfFirstDay = firstDayOfMonth.getDay();

    for (let day = 0; day < 42; day++) {
      if (day === 0 && weekdayOfFirstDay === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
      } else if (day === 0) {
        firstDayOfMonth.setDate(
          firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
        );
      } else {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
      }

      let calendarDay = {
        currentMonth: firstDayOfMonth.getMonth() === currentDay.getMonth(),
        date: new Date(firstDayOfMonth),
        month: firstDayOfMonth.getMonth(),
        day: firstDayOfMonth.getDate(),
        selected: firstDayOfMonth.toDateString() === currentDay.toDateString(),
        year: firstDayOfMonth.getFullYear(),
        highlight: highlights.find(
          (item) =>
            `${item.getFullYear()}-${item?.getMonth()}-${item?.getDate()}` ===
            `${firstDayOfMonth.getFullYear()}-${firstDayOfMonth?.getMonth()}-${firstDayOfMonth?.getDate()}`
        )
          ? true
          : false,
      };
      daysArray.push(calendarDay);
    }
    setCurrentDays(daysArray);
  }, [currentDay, highlights]);

  useEffect(() => {
    generateDays();
  }, [currentDay]);

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
      <div className=" flex justify-between items-center gap-3">
        <button type="button" title="prev" onClick={() => prevMonthHandler()}>
          <NavigatePrevIcon />
        </button>
        <h1 className=" font-bold">
          {months[currentDay.getMonth()]} {currentDay.getFullYear()}
        </h1>
        <button type="button" title="prev" onClick={() => nextMonthHandler()}>
          <NavigateNextIcon />
        </button>
      </div>
      <div className=" grid grid-cols-7 gap-2  text-gray-500">
        {weekdays.map((day) => (
          <div key={day} className=" aspect-square p-1">
            <span>{day}</span>
          </div>
        ))}
      </div>
      <div className=" grid grid-cols-7 gap-2">
        {currentDays.map((item, index) => (
          <button
            type="button"
            title="days of calendar"
            key={index}
            className={`${item?.selected ? " bg-primary text-white" : ""} ${
              item?.currentMonth ? "" : " text-gray-400"
            } aspect-square p-1 bg-gray-200 rounded-md relative overflow-hidden`}
            onClick={() => changeHandler(item)}
          >
            <span>{item?.day}</span>
            {item?.highlight && (
              <div className=" absolute top-0 right-0 aspect-square border-l-8 border-l-transparent border-b-8 border-b-transparent border-8 border-green-500"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

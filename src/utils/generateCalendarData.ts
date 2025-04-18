import weekdayMonth from "../assets/days-months.json";
import { calendarDates } from "../types/apiData/apartment/reformed-apartment-calendar";
import { dateGeneratorUtilResponse } from "../types/date-generator-util-response";
import { formatDateToString } from "./isoDateConverter";
export default function generateCalendarData({
  selectedDate,
  highlights,
  notAvailable,
  booked = [],
  blocked = [],
  maintenance = [],
}: {
  selectedDate: Date;
  highlights?: Date[];
  notAvailable?: Date[];
  booked?: calendarDates[];
  blocked?: calendarDates[];
  maintenance?: Date[];
}) {
  const generateDays = () => {
    const daysArray = [] as dateGeneratorUtilResponse[];
    const firstDayOfMonth = new Date(
      selectedDate?.getFullYear(),
      selectedDate?.getMonth(),
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
        currentMonth: firstDayOfMonth.getMonth() === selectedDate.getMonth(),
        date: new Date(firstDayOfMonth),
        isoStringDate: formatDateToString(
          new Date(
            firstDayOfMonth.getFullYear(),
            firstDayOfMonth.getMonth(),
            firstDayOfMonth.getDate() + 1
          )
        ),
        month: firstDayOfMonth.getMonth(),
        day: firstDayOfMonth.getDate(),
        weekday: weekdayMonth?.days[firstDayOfMonth.getDay()],
        selected:
          firstDayOfMonth.toDateString() === selectedDate.toDateString(),
        year: firstDayOfMonth.getFullYear(),
        highlight: highlights?.find((item) => {
          const dateValue = new Date(item);
          return (
            `${dateValue.getFullYear()}-${dateValue?.getMonth()}-${dateValue?.getDate()}` ===
            `${firstDayOfMonth.getFullYear()}-${firstDayOfMonth?.getMonth()}-${firstDayOfMonth?.getDate()}`
          );
        })
          ? true
          : false,
        notAvailable: notAvailable?.find((item) => {
          const dateValue = new Date(item);
          return (
            `${dateValue.getFullYear()}-${dateValue?.getMonth()}-${dateValue?.getDate()}` ===
            `${firstDayOfMonth.getFullYear()}-${firstDayOfMonth?.getMonth()}-${firstDayOfMonth?.getDate()}`
          );
        })
          ? true
          : false,
        booked: booked?.find((item) => {
          const dateValue = new Date(item?.date);
          return (
            `${dateValue.getFullYear()}-${dateValue?.getMonth()}-${dateValue?.getDate()}` ===
            `${firstDayOfMonth.getFullYear()}-${firstDayOfMonth?.getMonth()}-${firstDayOfMonth?.getDate()}`
          );
        })
          ? true
          : false,
        booked_reason:
          booked?.find((item) => {
            const dateValue = new Date(item?.date);
            return (
              `${dateValue.getFullYear()}-${dateValue?.getMonth()}-${dateValue?.getDate()}` ===
              `${firstDayOfMonth.getFullYear()}-${firstDayOfMonth?.getMonth()}-${firstDayOfMonth?.getDate()}`
            );
          })?.reason || "Bookings",
        booked_hex_code:
          booked?.find((item) => {
            const dateValue = new Date(item?.date);
            return (
              `${dateValue.getFullYear()}-${dateValue?.getMonth()}-${dateValue?.getDate()}` ===
              `${firstDayOfMonth.getFullYear()}-${firstDayOfMonth?.getMonth()}-${firstDayOfMonth?.getDate()}`
            );
          })?.hex_code || "#FF0000",
        blocked: blocked?.find((item) => {
          const dateValue = new Date(item?.date);
          return (
            `${dateValue.getFullYear()}-${dateValue?.getMonth()}-${dateValue?.getDate()}` ===
            `${firstDayOfMonth.getFullYear()}-${firstDayOfMonth?.getMonth()}-${firstDayOfMonth?.getDate()}`
          );
        })
          ? true
          : false,
        blocked_reason:
          blocked?.find((item) => {
            const dateValue = new Date(item?.date);
            return (
              `${dateValue.getFullYear()}-${dateValue?.getMonth()}-${dateValue?.getDate()}` ===
              `${firstDayOfMonth.getFullYear()}-${firstDayOfMonth?.getMonth()}-${firstDayOfMonth?.getDate()}`
            );
          })?.reason || "Blocked",
        blocked_hex_code:
          blocked?.find((item) => {
            const dateValue = new Date(item?.date);
            return (
              `${dateValue.getFullYear()}-${dateValue?.getMonth()}-${dateValue?.getDate()}` ===
              `${firstDayOfMonth.getFullYear()}-${firstDayOfMonth?.getMonth()}-${firstDayOfMonth?.getDate()}`
            );
          })?.hex_code || "#293056",
        maintenance: maintenance?.find((item) => {
          const dateValue = new Date(item);
          return (
            `${dateValue.getFullYear()}-${dateValue?.getMonth()}-${dateValue?.getDate()}` ===
            `${firstDayOfMonth.getFullYear()}-${firstDayOfMonth?.getMonth()}-${firstDayOfMonth?.getDate()}`
          );
        })
          ? true
          : false,
      };
      daysArray.push(calendarDay);
    }
    return daysArray;
  };
  return generateDays();
}

import weekdayMonth from "../assets/days-months.json";
export default function generateCalendarData({
  selectedDate,
  highlights,
  notAvailable,
}: {
  selectedDate: Date;
  highlights?: Date[];
  notAvailable?: Date[];
}) {
  const generateDays = () => {
    const daysArray = [];
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
        month: firstDayOfMonth.getMonth(),
        day: firstDayOfMonth.getDate(),
        weekday: weekdayMonth?.days[firstDayOfMonth.getDay()],
        selected:
          firstDayOfMonth.toDateString() === selectedDate.toDateString(),
        year: firstDayOfMonth.getFullYear(),
        highlight: highlights?.find(
          (item) =>
            `${item.getFullYear()}-${item?.getMonth()}-${item?.getDate()}` ===
            `${firstDayOfMonth.getFullYear()}-${firstDayOfMonth?.getMonth()}-${firstDayOfMonth?.getDate()}`
        )
          ? true
          : false,
        notAvailable: notAvailable?.find(
          (item) =>
            `${item.getFullYear()}-${item?.getMonth()}-${item?.getDate()}` ===
            `${firstDayOfMonth.getFullYear()}-${firstDayOfMonth?.getMonth()}-${firstDayOfMonth?.getDate()}`
        )
          ? true
          : false,
      };
      daysArray.push(calendarDay);
    }
    return daysArray;
  };
  return generateDays();
}

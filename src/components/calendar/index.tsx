import { useCallback, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
export default function CalendarView() {
  const [value, onChange] = useState<Date>(new Date());
  const changeHandler = useCallback((e: any) => {
    console.log({ e });
  }, []);
  //   https://www.npmjs.com/package/react-calendar
  return (
    <Calendar
      //   selectRange
      // showNavigation={false}
      showNeighboringMonth={false}
      defaultValue={new Date(2024, 9, 11)}
      minDate={new Date()}
      onChange={changeHandler}
      //   value={[new Date(2024, 8, 8), new Date(2024, 8, 11)]}
    />
  );
}

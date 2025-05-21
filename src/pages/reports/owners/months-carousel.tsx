import { useCallback, useState } from "react";
import NavigatePrevIcon from "../../../assets/icons/navigate-prev";
import NavigateNextIcon from "../../../assets/icons/navigate-next";
import monthsAndDays from "../../../assets/days-months.json";
import getMonthStartEndDates from "../../../utils/start-end-dates-generator";

const today = new Date();
export default function MonthsCarousel({
  setFilterDate,
}: {
  setFilterDate: (dates: { start_date: string; end_date: string }) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(today?.getMonth() || 0);

  // productsArray next function
  const showNext = useCallback(() => {
    if (currentIndex + 1 < monthsAndDays?.months?.length) {
      setCurrentIndex((prev) => prev + 1);
      const response = getMonthStartEndDates(currentIndex + 2);
      const dataObject = {
        start_date: response?.start,
        end_date: response?.end,
      };
      setFilterDate(dataObject);
    }
  }, [monthsAndDays, currentIndex]);

  // productsArray next previous
  const showPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      const response = getMonthStartEndDates(currentIndex);
      const dataObject = {
        start_date: response?.start,
        end_date: response?.end,
      };
      setFilterDate(dataObject);
    }
  }, [currentIndex]);

  return (
    <div className="w-full flex justify-between items-center gap-5 px-5 text-white">
      <button
        title="previous"
        type="button"
        onClick={() => showPrev()}
        className={`${currentIndex > 0 ? "" : "cursor-not-allowed"} `}
      >
        <NavigatePrevIcon
          className={`${
            currentIndex > 0 ? "text-black" : "text-gray-400"
          } h-8 w-8`}
        />
      </button>

      <div className=" text-primary">
        <span className=" font-semibold text-lg">
          {monthsAndDays?.months[currentIndex]}
        </span>
      </div>
      <button
        type="button"
        title="next"
        onClick={() => showNext()}
        className={`${
          currentIndex + 1 < monthsAndDays?.months?.length
            ? ""
            : "cursor-not-allowed"
        }`}
      >
        <NavigateNextIcon
          className={`${
            currentIndex + 1 < monthsAndDays?.months?.length
              ? "text-black"
              : "text-gray-400"
          } h-8 w-8`}
        />
      </button>
    </div>
  );
}

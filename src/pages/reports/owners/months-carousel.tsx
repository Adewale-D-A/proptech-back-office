import { useCallback, useState } from "react";
import NavigatePrevIcon from "../../../assets/icons/navigate-prev";
import NavigateNextIcon from "../../../assets/icons/navigate-next";
import monthsAndDays from "../../../assets/days-months.json";

export default function MonthsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // productsArray next function
  const showNextImage = useCallback(() => {
    if (currentIndex + 1 < monthsAndDays?.months?.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [monthsAndDays, currentIndex]);

  // productsArray next previous
  const showPrevImage = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  return (
    <div className="w-full flex justify-between items-center gap-5 px-5 text-white">
      <button
        title="previous"
        type="button"
        onClick={() => showPrevImage()}
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
        onClick={() => showNextImage()}
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

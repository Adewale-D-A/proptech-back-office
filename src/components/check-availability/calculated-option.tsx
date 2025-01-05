import AvailabilityOptionCard from "./availability-options-card";
import SplitStayOptionCard from "./split-stay-option-card";
import NextArrowIcon from "../../assets/icons/next-arrow";
import SplitArrowIcon from "../../assets/icons/split-arrow";

export default function CalculatedAvailabilityOptions() {
  return (
    <div className=" flex flex-col gap-10">
      <div className=" flex flex-col gap-5">
        <div>
          <div className=" flex items-center gap-3">
            <NextArrowIcon className=" text-primary size-6" />
            <h5 className=" font-semibold text-lg">Option available</h5>
          </div>
          <p className=" text-sm text-gray-400">
            Fri, 10/04/24 - Sun, 12/04/24, 18 Nights, 2 adults
          </p>
        </div>
        <AvailabilityOptionCard />
      </div>
      <div>
        <div className=" flex flex-col gap-5">
          <div className=" flex items-center gap-3">
            <SplitArrowIcon className=" text-primary size-6 rotate-45" />
            <h5 className=" font-semibold text-lg">Split stays</h5>
          </div>
          <SplitStayOptionCard />
        </div>
      </div>
    </div>
  );
}

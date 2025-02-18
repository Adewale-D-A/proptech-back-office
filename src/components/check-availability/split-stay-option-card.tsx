import CalendarIcon from "../../assets/icons/calendar";
import MoonIcon from "../../assets/icons/moon";
import NextArrowIcon from "../../assets/icons/next-arrow";
import SplitArrowIcon from "../../assets/icons/split-arrow";
import LoadingButton from "../button";
import { format, addDays, isValid, differenceInDays } from "date-fns";

export default function SplitStayOptionCard({
  data,
  checkInDate,
  checkOutDate,
}: {
  data: any;
  checkInDate: string;
  checkOutDate: string;
}) {
  const transitionDate = new Date(data?.split_stay?.transition_date);
  if (!isValid(transitionDate)) {
    return <div></div>;
  }

  const formattedTransitionDate = format(transitionDate, "EEE, dd/MM/yy");
  const nextDayAfterTransition = format(
    addDays(transitionDate, 1),
    "EEE, dd/MM/yy"
  );

  const nightsFirstStay = differenceInDays(
    new Date(checkInDate),
    transitionDate
  );
  const nightsSecondStay = differenceInDays(
    checkOutDate,
    nextDayAfterTransition
  );

  console.log("checkIndate", checkInDate);
  console.log("checkOutDate", checkOutDate);
  console.log("transitionDate", formattedTransitionDate);

  console.log(differenceInDays(new Date(checkInDate), transitionDate));

  return (
    <div className="w-full rounded-2xl border p-3 flex flex-col md:flex-row gap-3 md:items-center justify-between">
      <div className=" flex flex-col gap-2">
        <div className=" flex items-center gap-2">
          <NextArrowIcon className=" text-primary size-4" />
          <h5 className=" font-semibold text-lg">
            {data?.split_stay?.first_stay?.name}
          </h5>
        </div>
        <div className="text-gray-400 flex items-center gap-1">
          <MoonIcon className=" size-4" />
          <span className=" text-sm ">{nightsFirstStay} nights</span>
        </div>
        <div className="text-gray-400 flex items-center gap-1">
          <CalendarIcon className=" size-4" />
          <span className=" text-sm ">{checkInDate}</span>
        </div>
        <div className="text-gray-400 flex items-center gap-1">
          <CalendarIcon className=" size-4" />
          <span className=" text-sm ">{formattedTransitionDate}</span>
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <div className=" flex items-center gap-2">
          <SplitArrowIcon className=" text-primary size-4 rotate-45" />
          <h5 className=" font-semibold text-lg">
            {data?.split_stay?.second_stay?.name}
          </h5>
        </div>
        <div className="text-gray-400 flex items-center gap-1">
          <MoonIcon className=" size-4" />
          <span className=" text-sm ">{nightsSecondStay} nights</span>
        </div>
        <div className="text-gray-400 flex items-center gap-1">
          <CalendarIcon className=" size-4" />
          <span className=" text-sm ">{nextDayAfterTransition}</span>
        </div>
        <div className="text-gray-400 flex items-center gap-1">
          <CalendarIcon className=" size-4" />
          <span className=" text-sm ">{checkOutDate}</span>
        </div>
      </div>
      <div className=" w-fit">
        <LoadingButton label="Book now" type="button" isLoading={false} />
      </div>
    </div>
  );
}

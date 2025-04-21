import CalendarIcon from "../../assets/icons/calendar";
import MoonIcon from "../../assets/icons/moon";
import NextArrowIcon from "../../assets/icons/next-arrow";
import SplitArrowIcon from "../../assets/icons/split-arrow";
import { apartment_suggestion } from "../../types/apiData/apartment/apt-suggestions";
import defaultCheckInDateTime from "../../config/default-check-in-date-time";
import { format, addDays, isValid, differenceInDays } from "date-fns";
import LinkButton from "../button/linkButton";
import { formatDateToString } from "../../utils/isoDateConverter";

const defaultDateTime = defaultCheckInDateTime();
export default function SplitStayOptionCard({
  data,
  checkInDate,
  checkOutDate,
  noOfGuest,
}: {
  data: apartment_suggestion;
  checkInDate: string;
  checkOutDate: string;
  noOfGuest?: string;
}) {
  return (
    <>
      {data?.split_stays?.map((item) => {
        const transitionDate = new Date(item?.transition_date);
        if (!isValid(transitionDate)) {
          return <div></div>;
        }

        const formattedTransitionDate = format(transitionDate, "EEE, dd/MM/yy");
        const nextDayAfterTransition = format(transitionDate, "EEE, dd/MM/yy");

        const nightsFirstStay = differenceInDays(
          transitionDate,
          new Date(checkInDate)
        );
        const nightsSecondStay = differenceInDays(
          addDays(new Date(checkOutDate), 1),
          transitionDate
        );
        return (
          <div
            key={item?.transition_date}
            className="w-full rounded-2xl border p-3 flex flex-col md:flex-row gap-3 md:items-center justify-between"
          >
            <div className=" flex flex-col gap-2">
              <div className=" flex items-center gap-2">
                <NextArrowIcon className=" text-primary size-4" />
                <h5 className=" font-semibold text-lg">
                  {item?.first_stay?.name}
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
                <SplitArrowIcon className=" text-primary size-4 rotate-45" />
                <span className=" text-sm ">{formattedTransitionDate}</span>
              </div>
            </div>
            <div className=" flex flex-col gap-2">
              <div className=" flex items-center gap-2">
                <SplitArrowIcon className=" text-primary size-4 rotate-45" />
                <h5 className=" font-semibold text-lg">
                  {item?.second_stay?.name}
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
              <LinkButton
                url={`/bookings/new-booking?apt_id=${
                  item?.first_stay?.id
                }&check_in_date=${checkInDate}&check_out_date=${formatDateToString(
                  transitionDate
                )}&check_in_time=${
                  defaultDateTime?.check_in_time
                }&check_out_time=${
                  defaultDateTime?.check_out_time
                }&no_of_guest=${noOfGuest || ""}&apt_id_2=${
                  item?.second_stay?.id
                }&check_in_date_2=${formatDateToString(
                  transitionDate
                )}&check_out_date_2=${checkOutDate}&check_in_time_2=${
                  defaultDateTime?.check_in_time
                }&check_out_time_2=${
                  defaultDateTime?.check_out_time
                }&no_of_guest_2=${noOfGuest || ""}&type=split_stay_booking`}
                label="Book now"
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

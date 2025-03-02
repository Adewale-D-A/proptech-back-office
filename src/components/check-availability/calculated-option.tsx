import AvailabilityOptionCard from "./availability-options-card";
import SplitStayOptionCard from "./split-stay-option-card";
import NextArrowIcon from "../../assets/icons/next-arrow";
// import SplitArrowIcon from "../../assets/icons/split-arrow";
// import { Http2ServerRequest } from "http2";
import { format, differenceInDays, isValid } from "date-fns";
import { single_stay, split_stay } from "../../types/apiData/apartment/apt-suggestions";

interface suggestion {
  single_stay: single_stay,
  split_stay: split_stay
}
export default function CalculatedAvailabilityOptions({
  data,
  checkInDate,
  checkOutDate,
  noOfGuest
}: {
  data: suggestion;
  checkInDate: string;
  checkOutDate: string;
  noOfGuest?: string
}) {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (!isValid(checkIn) || !isValid(checkOut)) {
    return <div></div>;
  }

  const formattedCheckInDate = format(checkIn, "EEE, dd/MM/yy");
  const formattedCheckOutDate = format(checkOut, "EEE, dd/MM/yy");
  const numberOfNights = differenceInDays(checkOut, checkIn);
  return (
    <div className=" flex flex-col gap-10">
      {data?.single_stay ? (
        <div className=" flex flex-col gap-5">
          <div>
            <div className=" flex items-center gap-3">
              <NextArrowIcon className=" text-primary size-6" />
              <h5 className=" font-semibold text-lg">Options available</h5>
            </div>
            <p className=" text-sm text-gray-400">
              {formattedCheckInDate} - {formattedCheckOutDate}, {numberOfNights}{" "}
              nights , {data?.single_stay?.max_guests} adults
            </p>
          </div>
          {data?.single_stay ? (
            <AvailabilityOptionCard data={data} extra_data={{check_in_date: checkInDate, check_out_date: checkOutDate, noOfGuest: noOfGuest}}/>
          ) : (
            <div className="w-full p-5 bg-gray-200/15 rounded-lg">
              <h4 className=" text-lg font-semibold text-center">
                No available single stay options
              </h4>
            </div>
          )}
        </div>
      ) : null}
      <SplitStayOptionCard
        data={data}
        checkInDate={formattedCheckInDate}
        checkOutDate={formattedCheckOutDate}
      />
      {/* 
      {data?.split_stay ? (
        <div>
          <div className=" flex flex-col gap-5">
            <div className=" flex items-center gap-3">
              <SplitArrowIcon className=" text-primary size-6 rotate-45" />
              <h5 className=" font-semibold text-lg">Split stays</h5>
            </div>
            {data?.split_stay ? (
              <SplitStayOptionCard
                data={data}
                checkInDate={formattedCheckInDate}
                checkOutDate={formattedCheckOutDate}
              />
            ) : (
              <div className="w-full p-5 bg-gray-200/15 rounded-lg">
                <h4 className=" text-lg font-semibold text-center">
                  No available split stay options
                </h4>
              </div>
            )}
          </div>
        </div>
      ) : null} */}
    </div>
  );
}

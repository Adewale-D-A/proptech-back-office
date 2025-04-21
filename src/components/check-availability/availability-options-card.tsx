import NextArrowIcon from "../../assets/icons/next-arrow";
import defaultCheckInDateTime from "../../config/default-check-in-date-time";
import { apartment_suggestion } from "../../types/apiData/apartment/apt-suggestions";
// import LoadingButton from "../button";
import LinkButton from "../button/linkButton";
import { format, differenceInDays } from "date-fns";

const defaultDateTime = defaultCheckInDateTime();
export default function AvailabilityOptionCard({
  data,
  extra_data,
}: {
  data: apartment_suggestion;
  extra_data: {
    check_in_date: string;
    check_out_date: string;
    noOfGuest?: string;
  };
}) {
  // console.log("data", data);

  const checkIn = new Date(extra_data?.check_in_date);
  const checkOut = new Date(extra_data?.check_out_date);
  const formattedCheckInDate = format(checkIn, "EEE, dd/MM/yy");
  const formattedCheckOutDate = format(checkOut, "EEE, dd/MM/yy");
  const numberOfNights = differenceInDays(checkOut, checkIn);
  return (
    <div className=" flex flex-col gap-5">
      <div>
        <div className=" flex items-center gap-3">
          <NextArrowIcon className=" text-primary size-6" />
          <h5 className=" font-semibold text-lg">Options available</h5>
        </div>
        <p className=" text-sm text-gray-400">
          {formattedCheckInDate} - {formattedCheckOutDate}, {numberOfNights}{" "}
          nights,{" "}
          {extra_data?.noOfGuest ? `${extra_data?.noOfGuest} adults` : ""}
        </p>
      </div>
      {data?.single_stays?.map((item) => (
        <div
          key={item?.id}
          className="w-full rounded-2xl border p-3 flex gap-3 flex-col md:flex-row md:items-center justify-between"
        >
          <div>
            <h6 className=" font-semibold">{item?.name}</h6>
            <span className=" text-sm text-gray-400">Standard rate</span>
          </div>
          <div className=" md:text-end">
            <span className=" text-sm text-gray-400">Total</span>
            <h6 className="font-semibold flex gap-1">
              {item?.currency}
              <span>{item?.price}</span>
            </h6>
          </div>
          <div className=" w-fit">
            <LinkButton
              url={`/bookings/new-booking?apt_id=${item?.id}&check_in_date=${extra_data?.check_in_date}&check_out_date=${extra_data?.check_out_date}&check_in_time=${defaultDateTime?.check_in_time}&check_out_time=${defaultDateTime?.check_out_time}&no_of_guest=${extra_data?.noOfGuest}&type=single_stay_booking`}
              label="Book now"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

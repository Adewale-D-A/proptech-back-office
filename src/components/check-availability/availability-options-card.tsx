import defaultCheckInDateTime from "../../config/default-check-in-date-time";
import { single_stay, split_stay } from "../../types/apiData/apartment/apt-suggestions";
// import LoadingButton from "../button";
import LinkButton from "../button/linkButton";

interface suggestion {
  single_stay: single_stay,
  split_stay: split_stay
}

  const defaultDateTime = defaultCheckInDateTime()
export default function AvailabilityOptionCard({ data, extra_data }: { data: suggestion, extra_data: {check_in_date: string, check_out_date: string, noOfGuest?: string} }) {
  // console.log("data", data);
  return (
    <div className="w-full rounded-2xl border p-3 flex gap-3 flex-col md:flex-row md:items-center justify-between">
      <div>
        <h6 className=" font-semibold">{data?.single_stay?.name}</h6>
        <span className=" text-sm text-gray-400">Standard rate</span>
      </div>
      <div className=" md:text-end">
        <span className=" text-sm text-gray-400">Total</span>
        <h6 className="font-semibold flex gap-1">
          {data?.single_stay?.currency}
          <span>{data?.single_stay?.price}</span>
        </h6>
      </div>
      <div className=" w-fit">
        <LinkButton url={`/bookings/new-booking?apt_id=${data?.single_stay?.id}&check_in_date=${extra_data?.check_in_date}&check_out_date=${extra_data?.check_out_date}&check_in_time=${defaultDateTime?.check_in_time}&check_out_time=${defaultDateTime?.check_out_time}&no_of_guest=${extra_data?.noOfGuest}`} label="Book now"  />
      </div>
    </div>
  );
}

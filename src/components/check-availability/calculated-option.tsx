import AvailabilityOptionCard from "./availability-options-card";
import SplitStayOptionCard from "./split-stay-option-card";
import { apartment_suggestion } from "../../types/apiData/apartment/apt-suggestions";

export default function CalculatedAvailabilityOptions({
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
    <div className=" flex flex-col gap-10">
      {data?.single_stays.length > 0 ? (
        <AvailabilityOptionCard
          data={data}
          extra_data={{
            check_in_date: checkInDate,
            check_out_date: checkOutDate,
            noOfGuest: noOfGuest,
          }}
        />
      ) : (
        <div className="w-full p-5 bg-gray-200/15 rounded-lg">
          <h4 className=" text-lg font-semibold text-center">
            No available single stay options
          </h4>
        </div>
      )}
      {data?.split_stays.length > 0 && (
        <SplitStayOptionCard
          data={data}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          noOfGuest={noOfGuest}
        />
      )}
    </div>
  );
}

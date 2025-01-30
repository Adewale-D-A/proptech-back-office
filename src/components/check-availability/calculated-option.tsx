import AvailabilityOptionCard from "./availability-options-card";
import SplitStayOptionCard from "./split-stay-option-card";
import NextArrowIcon from "../../assets/icons/next-arrow";
import SplitArrowIcon from "../../assets/icons/split-arrow";
import { Http2ServerRequest } from "http2";

export default function CalculatedAvailabilityOptions({ data }: { data: any }) {
  return (
    <div className=" flex flex-col gap-10">
      {data?.single_stay ? (
        <div className=" flex flex-col gap-5">
          <div>
            <div className=" flex items-center gap-3">
              <NextArrowIcon className=" text-primary size-6" />
              <h5 className=" font-semibold text-lg">Option available</h5>
            </div>
            <p className=" text-sm text-gray-400">***</p>
          </div>
          {data?.single_stay ? (
            <AvailabilityOptionCard data={data} />
          ) : (
            <div className="w-full p-5 bg-gray-200/15 rounded-lg">
              <h4 className=" text-lg font-semibold text-center">
                No available single stay options
              </h4>
            </div>
          )}
        </div>
      ) : null}

      {data?.split_stay ? (
        <div>
          <div className=" flex flex-col gap-5">
            <div className=" flex items-center gap-3">
              <SplitArrowIcon className=" text-primary size-6 rotate-45" />
              <h5 className=" font-semibold text-lg">Split stays</h5>
            </div>

            <SplitStayOptionCard data={data} />
          </div>
        </div>
      ) : (
        <div className="w-full p-5 bg-gray-200/15 rounded-lg">
          <h4 className=" text-lg font-semibold text-center">
            No available split stay options
          </h4>
        </div>
      )}
    </div>
  );
}

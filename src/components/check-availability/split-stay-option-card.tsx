import CalendarIcon from "../../assets/icons/calendar";
import MoonIcon from "../../assets/icons/moon";
import NextArrowIcon from "../../assets/icons/next-arrow";
import SplitArrowIcon from "../../assets/icons/split-arrow";
import LoadingButton from "../button";

export default function SplitStayOptionCard({ data }: { data: any }) {
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
          <span className=" text-sm ">Standard rate</span>
        </div>
        <div className="text-gray-400 flex items-center gap-1">
          <CalendarIcon className=" size-4" />
          <span className=" text-sm ">***</span>
        </div>
        <div className="text-gray-400 flex items-center gap-1">
          <CalendarIcon className=" size-4" />
          <span className=" text-sm ">***</span>
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
          <span className=" text-sm ">17 nights</span>
        </div>
        <div className="text-gray-400 flex items-center gap-1">
          <CalendarIcon className=" size-4" />
          <span className=" text-sm ">***</span>
        </div>
        <div className="text-gray-400 flex items-center gap-1">
          <CalendarIcon className=" size-4" />
          <span className=" text-sm ">***</span>
        </div>
      </div>
      <div className=" w-fit">
        <LoadingButton label="Book now" type="button" isLoading={false} />
      </div>
    </div>
  );
}

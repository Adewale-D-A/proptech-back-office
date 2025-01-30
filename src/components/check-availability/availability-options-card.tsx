import LoadingButton from "../button";

export default function AvailabilityOptionCard({ data }: { data: any }) {
  console.log("data", data);
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
        <LoadingButton label="Book now" type="button" isLoading={false} />
      </div>
    </div>
  );
}

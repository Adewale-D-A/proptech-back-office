import LoadingButton from "../button";

export default function AvailabilityOptionCard() {
  return (
    <div className="w-full rounded-2xl border p-3 flex gap-3 flex-col md:flex-row md:items-center justify-between">
      <div>
        <h6 className=" font-semibold">Victoria heights</h6>
        <span className=" text-sm text-gray-400">Standard rate</span>
      </div>
      <div className=" md:text-end">
        <span className=" text-sm text-gray-400">Total</span>
        <h6 className="font-semibold">N120,000</h6>
      </div>
      <div className=" w-fit">
        <LoadingButton label="Book now" type="button" isLoading={false} />
      </div>
    </div>
  );
}

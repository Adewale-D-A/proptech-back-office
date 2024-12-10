import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import LoadingButton from "../button";
import DateInput from "../inputs/dateInput";
import useAxios from "../../useHooks/useAxios";
import TimeInput from "../inputs/timeInput";

export default function CalculateRate({
  apartmentId,
  setIsOpen,
}: {
  apartmentId: string;
  setIsOpen: (val: boolean) => void;
}) {
  const axios = useAxios();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkinTime, setCheckinTime] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkoutTime, setCheckoutTime] = useState("");

  const [calculating, setCalculating] = useState(false);
  const [rateResult, setRateResult] = useState<{
    base_cost: number;
    caution_fee: number;
    tax_fee: number;
    total_cost: number;
  }>({} as any);

  //   clear result on apartment ID change
  useEffect(() => {
    setRateResult({} as any);
  }, [apartmentId]);

  const checkAvailability = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setCalculating(true);
      try {
        const response = await axios.post("/admin/booking/rate", {
          shortlet_id: apartmentId,
          check_in_day: checkInDate,
          check_out_day: checkOutDate,
          check_in_time: checkinTime,
          check_out_time: checkoutTime,
        });
        const data = response?.data?.data;
        setRateResult(data);
      } catch (error) {
      } finally {
        setCalculating(false);
      }
    },
    [apartmentId, checkInDate, checkOutDate, checkinTime, checkoutTime]
  );

  return (
    <div className="w-full flex flex-col gap-10">
      {rateResult?.base_cost ? (
        <div className="w-full flex flex-col gap-3">
          <span>
            <b>Cost: </b> {rateResult?.base_cost}
          </span>
          <span>
            <b>Caution Fee: </b> {rateResult?.caution_fee}
          </span>
          <span>
            <b>Tax Fee: </b> {rateResult?.tax_fee}
          </span>
          <span className=" font-semibold text-lg">
            <b>TOTAL: </b> {rateResult?.total_cost}
          </span>
          <LoadingButton
            type="button"
            label="Clear"
            disabled={false}
            isLoading={false}
            clickHandler={() => setRateResult({} as any)}
          />
        </div>
      ) : (
        <form className=" flex flex-col gap-5" onSubmit={checkAvailability}>
          <div className={" w-full grid grid-cols-1 gap-5"}>
            <DateInput
              inputType="date"
              isRequired={true}
              value={checkInDate}
              setValue={setCheckInDate}
              id="check-in-date"
              placeholder="Check-in Date"
              label="Check-in Date"
            />
            <TimeInput
              inputType="time"
              isRequired={true}
              value={checkinTime}
              setValue={setCheckinTime}
              id="check-in-time"
              placeholder="Check-in Time"
              label="Check-in Time"
            />
            <DateInput
              inputType="date"
              isRequired={true}
              value={checkOutDate}
              setValue={setCheckOutDate}
              id="check-out-date"
              placeholder="Check-out Date"
              label="Check-out Date"
            />
            <TimeInput
              inputType="time"
              isRequired={true}
              value={checkoutTime}
              setValue={setCheckoutTime}
              id="check-out-time"
              placeholder="Check-out Time"
              label="Check-out Time"
            />
          </div>
          <LoadingButton
            type="submit"
            label="Calculate"
            disabled={false}
            isLoading={calculating}
          />
        </form>
      )}
    </div>
  );
}

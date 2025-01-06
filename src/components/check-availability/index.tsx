import { SyntheticEvent, useCallback, useState } from "react";
import LoadingButton from "../button";
import DateInput from "../inputs/dateInput";
import availabilityOptionDummyData from "../../assets/temp-api-mockup-data/availabilityOptionMockup.json";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";

export default function CheckAvailability({
  apartmentId,
  className,
  setAvailabilityResponse,
}: {
  apartmentId: string;
  className?: string;
  setAvailabilityResponse: Function;
}) {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const [isChecking, setIsChecking] = useState(false);

  const checkAvailability = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      if (apartmentId) {
        setIsChecking(true);

        try {
          const response = await axios.post("/admin/shortlet/availability", {
            shortlet_id: apartmentId,
            check_in_day: checkInDate,
            check_out_day: checkOutDate,
          });
          const isAvailable = response?.data?.data?.is_available;
          dispatch(
            openSnackbar({
              message: isAvailable
                ? "Apartment is available"
                : "Apartment is not available for the selected dates",
              isError: !Boolean(isAvailable),
            })
          );
        } catch (error) {
        } finally {
          setIsChecking(false);
        }
      } else {
        dispatch(
          openSnackbar({ message: "Please select an apartment", isError: true })
        );
      }
    },
    [apartmentId, checkInDate, checkOutDate]
  );

  return (
    <div className="w-full flex flex-col gap-10">
      <form className=" flex flex-col gap-5" onSubmit={checkAvailability}>
        <div className={className || " w-full grid grid-cols-1 gap-5"}>
          <DateInput
            inputType="date"
            isRequired={true}
            value={checkInDate}
            setValue={setCheckInDate}
            id="check-in-date"
            placeholder="Check-in Date"
            label="Check-in Date"
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
        </div>
        <LoadingButton
          type="submit"
          label="Calculate"
          disabled={false}
          isLoading={isChecking}
        />
      </form>
    </div>
  );
}

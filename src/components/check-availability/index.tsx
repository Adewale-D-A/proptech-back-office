import { SyntheticEvent, useCallback, useState } from "react";
import LoadingButton from "../button";
import DateInput from "../inputs/dateInput";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
// import { openSnackbar } from "../../stores/appFunctionality/snackbar";
// import ApartmentSingleSearch from "../inputs/search/apartment-single-search";
import { apartmentById } from "../../types/apiData/apartment";
import Select from "../inputs/select";
import CalculatedAvailabilityOptions from "./calculated-option";
// import { Http2ServerRequest } from "http2";
import { single_stay, split_stay } from "../../types/apiData/apartment/apt-suggestions";

interface suggestion {
  single_stay: single_stay,
  split_stay: split_stay
}
export default function CheckAvailability({
  className,
}: {
  className?: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [selectedApt, setSelectedApt] = useState<apartmentById>({} as any);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestNo, setGuestNo] = useState("");
  // const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState<suggestion>({} as any);

  const [isChecking, setIsChecking] = useState(false);

  const checkAvailability = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
        setIsChecking(true);

        try {
          const response = await axios.post(
            "/admin/shortlet/suggest-shortlets",
            {
              // shortlet_id: selectedApt?.id,
              check_in_date: checkInDate,
              check_out_date: checkOutDate,
            }
          );
          const availabilityResponse = response?.data?.data?.shortlets || [];
          setAvailability(availabilityResponse);
          // console.log(availability);
          // const isAvailable = response?.data?.data?.is_available;
          // dispatch(
          //   openSnackbar({
          //     message: isAvailable
          //       ? "Apartment is available"
          //       : "Apartment is not available for the selected dates",
          //     isError: !Boolean(isAvailable),
          //   })
          // );
        } catch (error) {
        } finally {
          setIsChecking(false);
        }
    },
    [selectedApt, checkInDate, checkOutDate]
  );

  return (
    <div className="w-full flex flex-col gap-10">
      <form className=" flex flex-col gap-5" onSubmit={checkAvailability}>
        <div className={className || " w-full grid grid-cols-1 gap-5"}>
          {/* TODO: Comment out search apartment, apartment should be auto suggested */}
          {/* <ApartmentSingleSearch
            placeholder="Search apartment..."
            selected={selectedApt}
            setSelected={setSelectedApt}
          /> */}
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

          <Select
            isRequired={true}
            value={guestNo}
            setValue={setGuestNo}
            id="no-of-guests"
          >
            <option value="" disabled>
              No of Guests
            </option>
            {Array.from({ length: 8 }, (_, index) => (
              <option key={index} value={`${index + 1}`}>
                {index + 1}
              </option>
            ))}
          </Select>
          {/* TODO: Uncomment location selection, this feature should be optional though and not required */}
          {/* <Select
            isRequired={false}
            value={location}
            setValue={setLocation}
            id="locations"
          >
            <option value="" disabled>
              Select location
            </option>
            {Array.from({ length: 8 }, (_, index) => (
              <option key={index} value={`${index + 1}`}>
                {index + 1}
              </option>
            ))}
          </Select> */}
        </div>
        <LoadingButton
          type="submit"
          label="Calculate"
          disabled={false}
          isLoading={isChecking}
        />
        <CalculatedAvailabilityOptions
          data={availability}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          noOfGuest={guestNo}
        />
      </form>
    </div>
  );
}

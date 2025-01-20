import { useState } from "react";
import Select from "../../../components/inputs/select";
import ForecastDash from "../../../components/forecasting-dash";
import CalendarIcon from "../../../assets/icons/calendar";
import CheckAvailability from "../../../components/check-availability";
import Search from "../../../components/inputs/search";
import { apartmentById } from "../../../types/apiData/apartment";
import ApartmentSingleSearch from "../../../components/inputs/search/apartment-single-search";

export default function PricingOverview() {
  const [selectedOption, setSelectedOption] = useState("");
  const [availabilityResponset, setAvailabilityResponse] = useState();
  const [selectedApt, setSelectedApt] = useState<apartmentById>({} as any);

  return (
    <div className="w-full my-10 flex flex-col gap-8">
      <div className=" p-5 rounded-md border">
        <div className=" border rounded-md">
          <ApartmentSingleSearch
            placeholder="Search apartment..."
            selected={selectedApt}
            setSelected={setSelectedApt}
          />
        </div>
      </div>
      <ForecastDash />
      <div className="rounded-md border">
        <h4 className="text-lg font-semibold border-b p-3 flex items-center gap-2">
          <CalendarIcon /> <span>Check Availability</span>{" "}
        </h4>
        <div className=" p-3 ">
          <CheckAvailability className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3" />
        </div>
      </div>
    </div>
  );
}

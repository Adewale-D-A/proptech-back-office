import { useState } from "react";
import Select from "../../../components/inputs/select";
import ForecastDash from "../../../components/forecasting-dash";
import CalendarIcon from "../../../assets/icons/calendar";
import CheckAvailability from "../../../components/check-availability";

export default function PricingOverview() {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="w-full my-10 flex flex-col gap-8">
      <div className=" p-5 rounded-md border">
        <div className=" border rounded-md">
          <Select
            isRequired={true}
            value={selectedOption}
            setValue={setSelectedOption}
            id="all-status"
          >
            <option value="">Select any apartment</option>
            <option value="all">All</option>
            <option value="sunshine-apt">Sunshine - 2 Bedroom</option>
          </Select>
        </div>
      </div>
      <ForecastDash />
      <div className="rounded-md border">
        <h4 className="text-lg font-semibold border-b p-3 flex items-center gap-2">
          <CalendarIcon /> <span>Check Availability</span>{" "}
        </h4>
        <div className=" p-3">
          <CheckAvailability
            variant={3}
            className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
          />
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import ForecastDash from "../../../components/forecasting-dash";
import CalendarIcon from "../../../assets/icons/calendar";
import CheckAvailability from "../../../components/check-availability";
import ApartmentThroughBuildingSelector from "../../../components/inputs/select/apartment-through-building-selector";

export default function PricingOverview() {
  const [apartmentId, setApartmentId] = useState("");
  const [buildingId, setBuildingId] = useState("");

  return (
    <div className="w-full my-10 flex flex-col gap-8">
      <div className=" p-5 rounded-md border">
        <ApartmentThroughBuildingSelector
          setApartmentId={setApartmentId}
          apartmentId={apartmentId}
          buildingId={buildingId}
          setBuildingId={setBuildingId}
          withLabel={false}
        />
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

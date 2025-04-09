import { useState } from "react";
import useGetBuildings from "../../../services-hooks/apartment/useGetBuildings";
import Select from ".";

export default function ApartmentThroughBuildingSelector({
  apartmentId,
  setApartmentId,
  buildingId,
  setBuildingId,
}: {
  apartmentId: string;
  setApartmentId: (val: string) => void;
  buildingId: string;
  setBuildingId: (val: string) => void;
}) {
  const { data } = useGetBuildings({ page: 1 });
  return (
    <div className="w-full flex items-end gap-3 flex-col md:flex-row">
      <Select
        label="Building"
        value={buildingId}
        setValue={setBuildingId}
        id={"building-filter"}
      >
        <option value={""} disabled>
          Buildings
        </option>
        {data?.map((item) => (
          <option key={item?.id} value={`${item?.id}`}>
            {item?.name}
          </option>
        ))}
      </Select>
      {buildingId && (
        <Select
          label="Apartment"
          value={apartmentId}
          setValue={setApartmentId}
          id={"apartment-filter"}
        >
          <option value={""} disabled>
            Apartments
          </option>
          {data
            .find((item) => String(item.id) === buildingId)
            ?.shortlets?.map((item) => (
              <option key={item?.id} value={`${item?.id}`}>
                {item?.name}
              </option>
            ))}
        </Select>
      )}
    </div>
  );
}

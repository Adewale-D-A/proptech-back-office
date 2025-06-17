import useGetBuildings from "../../../services-hooks/apartment/useGetBuildings";
import Select from ".";

export default function ApartmentThroughBuildingSelector({
  apartmentId,
  setApartmentId,
  buildingId,
  setBuildingId,
  withLabel = true,
}: {
  apartmentId: string;
  setApartmentId: (val: string) => void;
  buildingId: string;
  setBuildingId: (val: string) => void;
  withLabel?: boolean;
}) {
  const { data } = useGetBuildings({ page: 1 });

  return (
    <div className="w-full flex items-end gap-3 flex-col md:flex-row">
      <Select
        label={withLabel ? "Building" : undefined}
        value={buildingId}
        setValue={setBuildingId}
        id={"building-filter"}
      >
        <option value={""}>All Buildings</option>
        {data?.map((item) => (
          <option key={item?.id} value={`${item?.id}`}>
            {item?.name}
          </option>
        ))}
      </Select>
      {buildingId && (
        <Select
          label={withLabel ? "Apartment" : undefined}
          value={apartmentId}
          setValue={setApartmentId}
          id={"apartment-filter"}
        >
          <option value={""}>All Apartments</option>
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

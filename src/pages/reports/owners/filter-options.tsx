import { useCallback } from "react";
import Select from "../../../components/inputs/select";
import Filter from "../../../components/filterAndSort/filter";
import useGetExpenseCategories from "../../../services-hooks/useGetExpenseCategories";
import ApartmentThroughBuildingSelector from "../../../components/inputs/select/apartment-through-building-selector";

export default function OwnersReportFilterOptions({
  apartmentId,
  setApartmentId,
  buildingId,
  setBuildingId,
  category,
  setCategory,
  setFilterDates,
}: {
  apartmentId: string;
  setApartmentId: (id: string) => void;
  category: string;
  setCategory: (cat: string) => void;
  setFilterDates: (load: { start_date: string; end_date: string }) => void;
  buildingId: string;
  setBuildingId: (val: string) => void;
}) {
  const { data: expenseCategories } = useGetExpenseCategories({ page: 1 });

  const handleSalesFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );
  return (
    <div className=" w-full flex justify-between gap-4 items-end flex-col md:flex-row">
      <div className="w-full flex items-end gap-3 flex-col md:flex-row">
        <ApartmentThroughBuildingSelector
          setApartmentId={setApartmentId}
          apartmentId={apartmentId}
          buildingId={buildingId}
          setBuildingId={setBuildingId}
        />
        <Select
          label="Category"
          value={category}
          setValue={setCategory}
          id={"category-filter"}
        >
          <option value="">All</option>
          {expenseCategories?.map((item) => (
            <option key={item?.id} value={`${item?.id}`}>
              {item?.name}
            </option>
          ))}
        </Select>
      </div>

      <Filter actionHandler={handleSalesFiltering} />
    </div>
  );
}

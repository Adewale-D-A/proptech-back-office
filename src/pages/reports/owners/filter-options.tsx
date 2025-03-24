import { useCallback, useState } from "react";
import Select from "../../../components/inputs/select";
import Filter from "../../../components/filterAndSort/filter";
import ApartmentSingleSearch from "../../../components/inputs/search/apartment-single-search";
import { apartmentById } from "../../../types/apiData/apartment";
import useGetLocationGroupings from "../../../services-hooks/apartment/useGetLocationGroupings";
import useGetRequestCategories from "../../../services-hooks/useGetRequestCategories";

export default function OwnersReportFilterOptions() {
  const [building, setBuilding] = useState("");
  const [buildingId, setBuildingId] = useState("");
  const [apartment, setApartment] = useState<apartmentById>({} as any);
  const [category, setCategory] = useState("");
  const { data: locationGroupsDataset } = useGetLocationGroupings({ page: 1 });
  const { data: requestCategoryDataset } = useGetRequestCategories({ page: 1 });

  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();

  const handleSalesFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );
  return (
    <div className=" w-full flex justify-between gap-4 items-end flex-col md:flex-row">
      <div className="w-full flex items-end gap-3 flex-col md:flex-row">
        <Select
          label="Building"
          value={buildingId}
          setValue={setBuildingId}
          id={"building-filter"}
        >
          {locationGroupsDataset?.map((item) => (
            <option key={item?.id} value={`${item?.id}`}>
              {item?.name}
            </option>
          ))}
        </Select>
        <ApartmentSingleSearch
          label="Apartment"
          selected={apartment}
          setSelected={setApartment}
          placeholder="Apartment"
        />

        <Select
          label="Category"
          value={category}
          setValue={setCategory}
          id={"category-filter"}
        >
          <option value={``} disabled>
            All
          </option>
          {requestCategoryDataset?.map((item) => (
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

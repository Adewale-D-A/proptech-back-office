import { useCallback, useState } from "react";
import TableSearch from "../inputs/search/table-search";
import Filter from "../filterAndSort/filter";
import useGetRatingsAndReviews from "../../services-hooks/useGetRatingsAndReviews";
import formatDate from "../../utils/isoDateConverter";
import CustomRating from "../rating";
import Select from "../inputs/select";
import ExportToCSV from "../export-to-csv";
import { ratingsExportFormater } from "../../utils/export-formerter-functions";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { ratingsAndReviews } from "../../types/apiData/ratings-and-reviews";

export default function RatingsAndReviewsTable() {
  const [filterOption, setFilterOption] = useState("");
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [{ page, size, sort, search }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
    search: "",
  });
  const { data, isLoading, pagination } = useGetRatingsAndReviews({
    page,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    search,
    sort,
    limit: size,
  });
  const handleFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );

  // const { data: rating } = useGetResourceAccessChecker({
  //   resource: "",
  // });
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex items-center flex-col md:flex-row justify-between gap-3">
        <div className=" max-w-md">
          <TableSearch placeholder="Search..." />
        </div>
        <div className=" flex items-center gap-3 flex-col md:flex-row">
          <Select
            isRequired={true}
            value={filterOption}
            setValue={setFilterOption}
            id="reviews-rating-filter"
          >
            <option value="">All questions</option>
          </Select>
          <Filter actionHandler={handleFiltering} />
        </div>
      </div>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Ratings & Reviews</h2>
          <div className=" w-fit">
            <ExportToCSV
              dataset={data}
              jsonToCSVReformerter={ratingsExportFormater}
              fileName="rating-and-reviews"
            />
          </div>
        </div>

        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "Customer",
              key: "customner",
              render: (row: ratingsAndReviews, index) => (
                <div className=" flex flex-col">
                  <span className=" capitalize font-semibold text-lg">
                    {row?.user?.first_name} {row?.user?.last_name}
                  </span>
                  <span className=" text-gray-600 text-sm">
                    {row?.user?.email}
                  </span>
                </div>
              ),
            },
            {
              header: "Question",
              key: "question",
              showColumnSort: true,
              render: (row: ratingsAndReviews) => <span>{row?.question}</span>,
            },
            {
              header: "Date Added",
              key: "date_added",
              render: (row: ratingsAndReviews) => (
                <span>{formatDate(row?.created_at)}</span>
              ),
            },

            {
              header: "Rating",
              key: "rating",
              render: (row: ratingsAndReviews) => (
                <CustomRating rating={row?.rating} />
              ),
            },
          ]}
          showPaginator={true}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
